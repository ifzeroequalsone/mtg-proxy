import { WATERMARK_GROUPS } from '../../constants/watermarks'
import './panels.css'

const WATERMARK_COLORS = [
  { id: 'actual',    label: 'Actual' },
  { id: 'W',         label: 'White' },
  { id: 'U',         label: 'Blue' },
  { id: 'B',         label: 'Black' },
  { id: 'R',         label: 'Red' },
  { id: 'G',         label: 'Green' },
  { id: 'gold',      label: 'Gold' },
  { id: 'colorless', label: 'Colorless' },
  { id: 'land',      label: 'Land' },
]

export default function WatermarkPanel({ card, onChange }) {
  return (
    <div className="panel">
      <section className="panel-section">
        <h3>Watermark</h3>
        {WATERMARK_GROUPS.map(group => (
          <div key={group.label} className="watermark-group">
            <p className="group-label">{group.label}</p>
            <div className="btn-group">
              {group.items.map(item => (
                <button
                  key={item.id}
                  className={`group-btn ${card.watermark === item.id ? 'active' : ''}`}
                  onClick={() => onChange('watermark', item.id)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="panel-section">
        <h3>Watermark Color</h3>
        <div className="btn-group">
          {WATERMARK_COLORS.map(c => (
            <button
              key={c.id}
              className={`group-btn ${card.watermarkColor === c.id ? 'active' : ''}`}
              onClick={() => onChange('watermarkColor', c.id)}
            >
              {c.label}
            </button>
          ))}
        </div>
      </section>

      <section className="panel-section">
        <h3>Opacity</h3>
        <label>
          <input
            type="range"
            min={0.05}
            max={1}
            step={0.05}
            value={card.watermarkOpacity}
            onChange={e => onChange('watermarkOpacity', Number(e.target.value))}
          />
          <span className="value-display">{Math.round(card.watermarkOpacity * 100)}%</span>
        </label>
      </section>

      <section className="panel-section">
        <h3>Upload Custom Watermark</h3>
        <input
          type="file"
          accept="image/*,.svg"
          onChange={e => {
            const file = e.target.files[0]
            if (file) {
              onChange('watermark', 'custom')
              onChange('watermarkCustomUrl', URL.createObjectURL(file))
            }
          }}
        />
      </section>
    </div>
  )
}
