import { useState } from 'react'
import { getSetSymbolUrl } from '../../utils/scryfallApi'
import './panels.css'

const COMMON_SETS = [
  'BRO','DMU','SNC','NEO','VOW','MID','AFR','STX','KHM','ZNR',
  'ELD','WAR','RNA','GRN','DOM','RIX','XLN','HOU','AKH','KLD',
  'SOI','OGW','BFZ','ORI','DTK','FRF','KTK','M15','JOU','BNG',
  'THS','M14','DGM','GTC','RTR','M13','AVR','DKA','ISD','M12',
  '10E','LRW','RAV','MRD','8ED','ONS','INV','MAS','USG','TMP',
  'M25','A25','MH1','MH2','2XM','CMR','C21',
]

export default function SetSymbolPanel({ card, onChange }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [inputCode, setInputCode] = useState(card.setCode || '')

  const loadSymbol = async (code) => {
    if (!code.trim()) return
    setLoading(true)
    setError('')
    try {
      const url = await getSetSymbolUrl(code)
      if (url) {
        onChange('setCode', code.toUpperCase())
        onChange('setSymbolUrl', url)
      } else {
        setError(`No symbol found for set "${code.toUpperCase()}"`)
      }
    } catch {
      setError('Failed to load set symbol')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="panel">
      <section className="panel-section">
        <h3>Set Code</h3>
        <div className="search-row">
          <input
            value={inputCode}
            onChange={e => setInputCode(e.target.value.toUpperCase())}
            onKeyDown={e => e.key === 'Enter' && loadSymbol(inputCode)}
            placeholder="M25, MH2, BRO…"
            maxLength={8}
          />
          <button className="btn-primary" onClick={() => loadSymbol(inputCode)} disabled={loading}>
            {loading ? '…' : 'Load'}
          </button>
        </div>
        {error && <p className="error-msg">{error}</p>}
        {card.setSymbolUrl && (
          <div className="set-symbol-preview">
            <img src={card.setSymbolUrl} alt={card.setCode} />
            <span>{card.setCode}</span>
          </div>
        )}
        <button className="btn-secondary" onClick={() => { onChange('setSymbolUrl', null); onChange('setCode', '') }}>
          Clear Symbol
        </button>
      </section>

      <section className="panel-section">
        <h3>Quick Pick</h3>
        <div className="set-quick-grid">
          {COMMON_SETS.map(code => (
            <button
              key={code}
              className={`set-quick-btn ${card.setCode === code ? 'active' : ''}`}
              onClick={() => { setInputCode(code); loadSymbol(code) }}
            >
              {code}
            </button>
          ))}
        </div>
      </section>

      <section className="panel-section">
        <h3>Upload Custom Symbol</h3>
        <input
          type="file"
          accept="image/*,.svg"
          onChange={e => {
            const file = e.target.files[0]
            if (file) onChange('setSymbolUrl', URL.createObjectURL(file))
          }}
        />
      </section>
    </div>
  )
}
