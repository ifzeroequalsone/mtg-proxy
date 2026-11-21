import { useMemo } from 'react'
import './CardPreview.css'
import { parseManaSymbols, getRarityGlyph } from '../utils/cardUtils'

export default function CardPreview({ card }) {
  const manaSymbols = useMemo(() => parseManaSymbols(card.manaCost), [card.manaCost])

  const isCreature = card.typeLine.toLowerCase().includes('creature') ||
    card.typeLine.toLowerCase().includes('vehicle')

  return (
    <div className="preview-wrapper">
      <div className={`card card--${card.frame} card--border-${card.borderStyle}`}>

        {/* Title bar */}
        <div className="card__title-bar">
          <span className="card__name">{card.name || 'Card Name'}</span>
          <span className="card__mana-cost">{manaSymbols}</span>
        </div>

        {/* Art box */}
        <div className="card__art-box">
          {card.artImage
            ? <img src={card.artImage} alt="card art" className="card__art-image" />
            : <div className="card__art-placeholder">
                <span>Art</span>
              </div>
          }
        </div>

        {/* Type line */}
        <div className="card__type-line">
          <span className="card__type">{card.typeLine || 'Type'}</span>
          <span className="card__rarity-symbol" title={card.rarity}>
            {getRarityGlyph(card.rarity)}
          </span>
        </div>

        {/* Text box */}
        <div className="card__text-box">
          {card.rulesText && (
            <p className="card__rules-text">
              {card.rulesText.split('\n').map((line, i) => (
                <span key={i}>{line}<br /></span>
              ))}
            </p>
          )}
          {card.flavorText && (
            <p className="card__flavor-text">{card.flavorText}</p>
          )}
        </div>

        {/* Footer */}
        <div className="card__footer">
          {card.artist && (
            <span className="card__artist">✦ {card.artist}</span>
          )}
          {isCreature && (card.power || card.toughness) && (
            <span className="card__pt">{card.power}/{card.toughness}</span>
          )}
        </div>
      </div>

      <div className="preview-actions">
        <button className="btn-primary" onClick={() => window.print()}>
          Print
        </button>
      </div>
    </div>
  )
}
