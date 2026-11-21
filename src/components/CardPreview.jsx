import { useRef } from 'react'
import { parseManaCost, manaSymbolUrl } from '../utils/scryfallApi'
import { FRAME_COLORS, RARITIES } from '../constants/frames'
import { exportCardAsPng } from '../utils/cardExport'
import './CardPreview.css'

function ManaSymbols({ cost }) {
  const pips = parseManaCost(cost)
  return (
    <span className="mana-pips">
      {pips.map((pip, i) => (
        <img key={i} src={manaSymbolUrl(pip)} alt={pip} className="mana-pip-img" />
      ))}
    </span>
  )
}

function RulesText({ text }) {
  if (!text) return null
  // Basic inline mana symbol rendering within rules text
  const parts = text.split(/(\{[^}]+\})/g)
  return (
    <p className="card__rules-text">
      {parts.map((part, i) => {
        const match = part.match(/^\{([^}]+)\}$/)
        if (match) {
          const code = match[1].replace(/\//g, '').toUpperCase()
          // Known mana symbols
          const manaLike = /^[0-9WUBRGCXSTEP]{1,3}$|^(WU|WB|UB|UR|BR|BG|RG|RW|GU|GW)$/.test(code)
          if (manaLike) {
            return <img key={i} src={manaSymbolUrl(code)} alt={code} className="mana-inline" />
          }
        }
        // Handle {i}/{/i} and {bold}/{/bold} naively — just strip them for preview
        const stripped = part.replace(/\{\/?(i|bold|flavor|divider|lns)\}/g, '')
        return <span key={i}>{stripped}</span>
      })}
    </p>
  )
}

export default function CardPreview({ card }) {
  const cardRef = useRef()
  const frameColor = FRAME_COLORS.find(f => f.id === card.frameColor) ?? FRAME_COLORS[4]
  const rarity = RARITIES.find(r => r.id === card.rarity) ?? RARITIES[0]

  const isCreature = /creature|vehicle/i.test(card.typeLine)
  const isPlaneswalker = /planeswalker/i.test(card.typeLine)

  const handleExport = () => {
    if (cardRef.current) {
      exportCardAsPng(cardRef.current, `${card.name || 'proxy'}.png`)
    }
  }

  // Build CSS gradient for the frame
  const frameStyle = {
    '--frame-bg': frameColor.hex,
    '--frame-text': frameColor.textHex,
  }

  return (
    <div className="preview-wrapper">
      <div
        ref={cardRef}
        className={`card card--border-${card.borderStyle}`}
        style={frameStyle}
      >
        {/* Title bar */}
        <div className="card__title-bar">
          <span className="card__name">{card.name || 'Card Name'}</span>
          <ManaSymbols cost={card.manaCost} />
        </div>

        {/* Art box */}
        <div className="card__art-box">
          {card.artImage ? (
            <img
              src={card.artImage}
              alt="card art"
              className="card__art-image"
              style={{
                transform: `translate(${card.artX}px, ${card.artY}px) scale(${card.artScale})`,
                transformOrigin: 'center center',
              }}
            />
          ) : (
            <div className="card__art-placeholder"><span>Art</span></div>
          )}
        </div>

        {/* Type line */}
        <div className="card__type-line">
          <span className="card__type">{card.typeLine || 'Type'}</span>
          {card.setSymbolUrl ? (
            <img
              src={card.setSymbolUrl}
              alt={card.setCode}
              className="card__set-symbol"
              style={{ filter: `drop-shadow(0 0 1px ${rarity.color})` }}
            />
          ) : (
            <span className="card__rarity-symbol" style={{ color: rarity.color }} title={rarity.label}>
              {rarity.glyph}
            </span>
          )}
        </div>

        {/* Text box */}
        <div className="card__text-box">
          {card.watermark && card.watermark !== 'none' && (
            <div
              className="card__watermark"
              style={{ opacity: card.watermarkOpacity }}
            >
              {card.watermark}
            </div>
          )}
          <RulesText text={card.rulesText} />
          {card.flavorText && (
            <p className="card__flavor-text">{card.flavorText}</p>
          )}
          {isPlaneswalker && card.loyalty && (
            <div className="card__loyalty">{card.loyalty}</div>
          )}
        </div>

        {/* Footer */}
        <div className="card__footer">
          <div className="card__collector">
            {card.artist && <span>✦ {card.artist}</span>}
            {card.cardNumber && card.setCode && (
              <span>{card.cardNumber} {card.setCode} {card.language}</span>
            )}
            {card.serialNumber && <span className="card__serial">{card.serialNumber}</span>}
          </div>
          {isCreature && (card.power || card.toughness) && (
            <span className="card__pt">{card.power}/{card.toughness}</span>
          )}
        </div>
      </div>

      <div className="preview-actions">
        <button className="btn-primary" onClick={handleExport}>
          Download PNG
        </button>
        <button className="btn-secondary" onClick={() => window.print()}>
          Print
        </button>
      </div>
    </div>
  )
}
