import { useRef } from 'react'
import './CardEditor.css'

const FRAME_COLORS = [
  { value: 'white', label: 'White', symbol: 'W' },
  { value: 'blue', label: 'Blue', symbol: 'U' },
  { value: 'black', label: 'Black', symbol: 'B' },
  { value: 'red', label: 'Red', symbol: 'R' },
  { value: 'green', label: 'Green', symbol: 'G' },
  { value: 'gold', label: 'Gold (Multi)', symbol: 'M' },
  { value: 'colorless', label: 'Colorless', symbol: 'C' },
  { value: 'land', label: 'Land', symbol: 'L' },
  { value: 'vehicle', label: 'Vehicle', symbol: 'V' },
]

const RARITIES = ['common', 'uncommon', 'rare', 'mythic', 'special']

const BORDER_STYLES = [
  { value: 'modern', label: 'Modern (2003+)' },
  { value: 'classic', label: 'Classic (pre-2003)' },
  { value: 'borderless', label: 'Borderless' },
  { value: 'showcase', label: 'Showcase' },
  { value: 'extended', label: 'Extended Art' },
]

export default function CardEditor({ card, onChange }) {
  const fileRef = useRef()

  const handleArtUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    onChange('artImage', url)
  }

  return (
    <aside className="card-editor">
      <h2>Card Options</h2>

      <section className="editor-section">
        <h3>Identity</h3>
        <label>
          Card Name
          <input value={card.name} onChange={e => onChange('name', e.target.value)} />
        </label>
        <label>
          Mana Cost
          <input
            value={card.manaCost}
            onChange={e => onChange('manaCost', e.target.value)}
            placeholder="{2}{G}{G}"
          />
          <span className="hint">Use {`{W} {U} {B} {R} {G} {C} {X}`} notation</span>
        </label>
        <label>
          Type Line
          <input value={card.typeLine} onChange={e => onChange('typeLine', e.target.value)} />
        </label>
      </section>

      <section className="editor-section">
        <h3>Frame &amp; Style</h3>
        <label>Frame Color</label>
        <div className="frame-color-grid">
          {FRAME_COLORS.map(fc => (
            <button
              key={fc.value}
              className={`frame-btn frame-btn--${fc.value} ${card.frame === fc.value ? 'active' : ''}`}
              onClick={() => onChange('frame', fc.value)}
              title={fc.label}
            >
              {fc.symbol}
            </button>
          ))}
        </div>

        <label>
          Border Style
          <select value={card.borderStyle} onChange={e => onChange('borderStyle', e.target.value)}>
            {BORDER_STYLES.map(b => (
              <option key={b.value} value={b.value}>{b.label}</option>
            ))}
          </select>
        </label>

        <label>
          Rarity
          <select value={card.rarity} onChange={e => onChange('rarity', e.target.value)}>
            {RARITIES.map(r => (
              <option key={r} value={r}>{r.charAt(0).toUpperCase() + r.slice(1)}</option>
            ))}
          </select>
        </label>
      </section>

      <section className="editor-section">
        <h3>Artwork</h3>
        <div
          className="art-upload-zone"
          onClick={() => fileRef.current.click()}
          onDragOver={e => e.preventDefault()}
          onDrop={e => {
            e.preventDefault()
            const file = e.dataTransfer.files[0]
            if (file) onChange('artImage', URL.createObjectURL(file))
          }}
        >
          {card.artImage
            ? <img src={card.artImage} alt="Card art" />
            : <span>Click or drag an image here</span>
          }
        </div>
        <input ref={fileRef} type="file" accept="image/*" onChange={handleArtUpload} style={{ display: 'none' }} />
        {card.artImage && (
          <button className="btn-secondary" onClick={() => onChange('artImage', null)}>Remove Art</button>
        )}
        <label>
          Artist
          <input value={card.artist} onChange={e => onChange('artist', e.target.value)} placeholder="Artist name" />
        </label>
      </section>

      <section className="editor-section">
        <h3>Text</h3>
        <label>
          Rules Text
          <textarea
            value={card.rulesText}
            onChange={e => onChange('rulesText', e.target.value)}
            rows={4}
          />
        </label>
        <label>
          Flavor Text
          <textarea
            value={card.flavorText}
            onChange={e => onChange('flavorText', e.target.value)}
            rows={2}
            placeholder="Optional flavor text..."
          />
        </label>
      </section>

      <section className="editor-section">
        <h3>P/T (Creatures)</h3>
        <div className="pt-row">
          <label>
            Power
            <input value={card.power} onChange={e => onChange('power', e.target.value)} style={{ width: 60 }} />
          </label>
          <span className="pt-slash">/</span>
          <label>
            Toughness
            <input value={card.toughness} onChange={e => onChange('toughness', e.target.value)} style={{ width: 60 }} />
          </label>
        </div>
      </section>
    </aside>
  )
}
