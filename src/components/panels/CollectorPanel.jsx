import './panels.css'

const LANGUAGES = [
  { id: 'EN', label: 'English' },
  { id: 'JA', label: 'Japanese' },
  { id: 'DE', label: 'German' },
  { id: 'FR', label: 'French' },
  { id: 'ES', label: 'Spanish' },
  { id: 'IT', label: 'Italian' },
  { id: 'PT', label: 'Portuguese' },
  { id: 'RU', label: 'Russian' },
  { id: 'KO', label: 'Korean' },
  { id: 'ZHS', label: 'Chinese (Simplified)' },
  { id: 'ZHT', label: 'Chinese (Traditional)' },
]

export default function CollectorPanel({ card, onChange }) {
  return (
    <div className="panel">
      <section className="panel-section">
        <h3>Artist</h3>
        <input
          value={card.artist}
          onChange={e => onChange('artist', e.target.value)}
          placeholder="Artist name"
        />
      </section>

      <section className="panel-section">
        <h3>Card Number</h3>
        <div className="inline-row">
          <input
            value={card.cardNumber}
            onChange={e => onChange('cardNumber', e.target.value)}
            placeholder="001"
            style={{ width: 70 }}
          />
          <span style={{ color: '#888', fontSize: '0.8rem', alignSelf: 'center' }}>/ ###</span>
        </div>
      </section>

      <section className="panel-section">
        <h3>Set Code (Collector)</h3>
        <input
          value={card.setCode}
          onChange={e => onChange('setCode', e.target.value.toUpperCase())}
          placeholder="M25"
          style={{ width: 80, textTransform: 'uppercase' }}
        />
      </section>

      <section className="panel-section">
        <h3>Language</h3>
        <select value={card.language} onChange={e => onChange('language', e.target.value)}>
          {LANGUAGES.map(l => (
            <option key={l.id} value={l.id}>{l.id} — {l.label}</option>
          ))}
        </select>
      </section>

      <section className="panel-section">
        <h3>Serial Number (optional)</h3>
        <input
          value={card.serialNumber}
          onChange={e => onChange('serialNumber', e.target.value)}
          placeholder="001/500"
        />
        <p className="hint">Leave blank to hide. Shown in lower right.</p>
      </section>
    </div>
  )
}
