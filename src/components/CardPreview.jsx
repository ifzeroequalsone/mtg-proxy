import { useRef } from 'react'
import { parseManaCost, manaSymbolUrl } from '../utils/scryfallApi'
import { RARITIES } from '../constants/frames'
import { getFrameUrl, getPtUrl, GUILD_SPLIT, WATERMARK_KEYRUNE_CLASS } from '../constants/frameAssets'
import { exportCardAsPng } from '../utils/cardExport'
import 'keyrune/css/keyrune.css'
import './CardPreview.css'

function ManaSymbols({ cost }) {
  const pips = parseManaCost(cost)
  if (!pips.length) return null
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
  const parts = text.split(/(\{[^}]+\})/g)
  return (
    <p className="card__rules-text">
      {parts.map((part, i) => {
        const match = part.match(/^\{([^}]+)\}$/)
        if (match) {
          const code = match[1].replace(/\//g, '').toUpperCase()
          if (/^([0-9]{1,2}|[WUBRGCXSTEP]{1,3})$/.test(code)) {
            return <img key={i} src={manaSymbolUrl(code)} alt={code} className="mana-inline" />
          }
        }
        const stripped = part.replace(/\{\/?(i|bold|flavor|divider|lns)\}/g, '')
        if (!stripped) return null
        return <span key={i}>{stripped}</span>
      })}
    </p>
  )
}

function WatermarkOverlay({ watermark, opacity, customUrl }) {
  if (!watermark || watermark === 'none') return null

  if (watermark === 'custom' && customUrl) {
    return (
      <div className="card__watermark" style={{ opacity }}>
        <img src={customUrl} alt="watermark" />
      </div>
    )
  }

  const ssClass = WATERMARK_KEYRUNE_CLASS[watermark]
  if (ssClass) {
    return (
      <div className="card__watermark" style={{ opacity }}>
        <i className={`ss ${ssClass} ss-2x`} />
      </div>
    )
  }

  // Fallback: text
  return (
    <div className="card__watermark" style={{ opacity }}>
      <span>{watermark}</span>
    </div>
  )
}

export default function CardPreview({ card }) {
  const cardRef = useRef()
  const rarity = RARITIES.find(r => r.id === card.rarity) ?? RARITIES[0]

  const isCreature = /creature|vehicle/i.test(card.typeLine)
  const isPlaneswalker = /planeswalker/i.test(card.typeLine)

  const guildSplit = GUILD_SPLIT[card.frameColor]
  const frameUrl = getFrameUrl(card.framePack, card.frameColor)
  const frameUrlLeft = guildSplit ? getFrameUrl(card.framePack, guildSplit[0]) : null
  const frameUrlRight = guildSplit ? getFrameUrl(card.framePack, guildSplit[1]) : null
  const ptUrl = getPtUrl(card.frameColor)

  const handleExport = () => {
    if (cardRef.current) {
      exportCardAsPng(cardRef.current, `${card.name || 'proxy'}.png`)
    }
  }

  return (
    <div className="preview-wrapper">
      <div
        ref={cardRef}
        className={`card card--border-${card.borderStyle}`}
      >
        {/* Art layer — behind everything */}
        <div className="card__art-layer">
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

        {/* Frame overlay — sits above art; guild colors use two half-frame overlays */}
        {guildSplit ? (
          <>
            <img className="card__frame-overlay card__frame-left"  src={frameUrlLeft}  alt="" crossOrigin="anonymous" />
            <img className="card__frame-overlay card__frame-right" src={frameUrlRight} alt="" crossOrigin="anonymous" />
          </>
        ) : (
          <img className="card__frame-overlay" src={frameUrl} alt="" crossOrigin="anonymous" />
        )}

        {/* Text layer — above frame */}
        <div className="card__text-layer">

          {/* Title bar */}
          <div className="card__title-bar">
            <span className="card__name">{card.name || 'Card Name'}</span>
            <ManaSymbols cost={card.manaCost} />
          </div>

          {/* Type line */}
          <div className="card__type-line">
            <span className="card__type">{card.typeLine || 'Type'}</span>
            {card.setSymbolUrl ? (
              <img
                src={card.setSymbolUrl}
                alt={card.setCode}
                className="card__set-symbol"
                style={{ filter: `drop-shadow(0 0 2px ${rarity.color}) brightness(0) saturate(100%) invert(1)` }}
              />
            ) : (
              <span className="card__rarity-symbol" style={{ color: rarity.color }}>
                {rarity.glyph}
              </span>
            )}
          </div>

          {/* Text box */}
          <div className="card__text-box">
            <WatermarkOverlay
              watermark={card.watermark}
              opacity={card.watermarkOpacity}
              customUrl={card.watermarkCustomUrl}
            />
            <RulesText text={card.rulesText} />
            {card.flavorText && (
              <p className="card__flavor-text">{card.flavorText}</p>
            )}
            {isPlaneswalker && card.loyalty && (
              <div className="card__loyalty">{card.loyalty}</div>
            )}
          </div>

          {/* Footer / collector info */}
          <div className="card__footer">
            <div className="card__collector">
              {card.artist && <span>✦ {card.artist}</span>}
              {card.cardNumber && card.setCode && (
                <span>{card.cardNumber} {card.setCode} {card.language}</span>
              )}
              {card.serialNumber && <span className="card__serial">{card.serialNumber}</span>}
            </div>
            {isCreature && (card.power || card.toughness) && (
              <div className="card__pt-wrapper">
                <img src={ptUrl} alt="" className="card__pt-img" crossOrigin="anonymous" />
                <span className="card__pt-text">{card.power}/{card.toughness}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="preview-actions">
        <button className="btn-primary" onClick={handleExport}>Download PNG</button>
        <button className="btn-secondary" onClick={() => window.print()}>Print</button>
      </div>
    </div>
  )
}
