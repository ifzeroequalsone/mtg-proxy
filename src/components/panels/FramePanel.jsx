import { FRAME_CATEGORIES, FRAME_PACKS, FRAME_COLORS, RARITIES, BORDER_STYLES } from '../../constants/frames'
import './panels.css'

export default function FramePanel({ card, onChange }) {
  const packs = FRAME_PACKS[card.frameCategory] ?? []

  return (
    <div className="panel">
      <section className="panel-section">
        <h3>Frame Category</h3>
        <div className="btn-group">
          {FRAME_CATEGORIES.map(c => (
            <button
              key={c.id}
              className={`group-btn ${card.frameCategory === c.id ? 'active' : ''}`}
              onClick={() => onChange('frameCategory', c.id)}
            >
              {c.label}
            </button>
          ))}
        </div>
      </section>

      <section className="panel-section">
        <h3>Frame Pack</h3>
        <div className="btn-group">
          {packs.map(p => (
            <button
              key={p.id}
              className={`group-btn ${card.framePack === p.id ? 'active' : ''}`}
              onClick={() => onChange('framePack', p.id)}
            >
              {p.label}
            </button>
          ))}
        </div>
      </section>

      <section className="panel-section">
        <h3>Frame Color</h3>
        <div className="color-grid">
          {FRAME_COLORS.map(fc => (
            <button
              key={fc.id}
              className={`color-swatch ${card.frameColor === fc.id ? 'active' : ''}`}
              style={{ background: fc.hex.includes('linear') ? fc.hex : fc.hex, color: fc.textHex }}
              title={fc.label}
              onClick={() => onChange('frameColor', fc.id)}
            >
              {fc.id.length <= 2 ? fc.id : fc.id === 'gold' ? 'M' : fc.id === 'colorless' ? 'C' : fc.id === 'land' ? 'L' : fc.id === 'vehicle' ? 'V' : ''}
            </button>
          ))}
        </div>
      </section>

      <section className="panel-section">
        <h3>Border Style</h3>
        <select value={card.borderStyle} onChange={e => onChange('borderStyle', e.target.value)}>
          {BORDER_STYLES.map(b => (
            <option key={b.id} value={b.id}>{b.label}</option>
          ))}
        </select>
      </section>

      <section className="panel-section">
        <h3>Rarity</h3>
        <div className="rarity-row">
          {RARITIES.map(r => (
            <button
              key={r.id}
              className={`rarity-btn ${card.rarity === r.id ? 'active' : ''}`}
              style={{ '--rarity-color': r.color }}
              title={r.label}
              onClick={() => onChange('rarity', r.id)}
            >
              <span className="rarity-glyph">{r.glyph}</span>
              <span className="rarity-label">{r.label}</span>
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}
