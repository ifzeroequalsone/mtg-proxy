import { useRef, useState } from 'react'
import { searchCardArt, getCardPrints } from '../../utils/scryfallApi'
import './panels.css'

export default function ArtPanel({ card, onChange, onChangeMany }) {
  const fileRef = useRef()
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [prints, setPrints] = useState([])
  const [showPrints, setShowPrints] = useState(false)

  const handleUpload = (file) => {
    if (!file) return
    onChange('artImage', URL.createObjectURL(file))
  }

  const handleSearch = async () => {
    if (!query.trim()) return
    setLoading(true)
    setError('')
    setPrints([])
    setShowPrints(false)
    try {
      const result = await searchCardArt(query)
      onChangeMany({
        artImage: result.artCrop,
        artist: result.artist,
        name: result.name,
        manaCost: result.manaCost,
        typeLine: result.typeLine,
        rulesText: result.oracleText,
        flavorText: result.flavorText,
        power: result.power,
        toughness: result.toughness,
        loyalty: result.loyalty,
        setCode: result.setCode.toUpperCase(),
        rarity: result.rarity,
        setSymbolUrl: null,
      })
      if (result.prints) {
        const p = await getCardPrints(result.prints)
        setPrints(p)
      }
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="panel">
      <section className="panel-section">
        <h3>Search Scryfall Art</h3>
        <div className="search-row">
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSearch()}
            placeholder="Card name…"
          />
          <button className="btn-primary" onClick={handleSearch} disabled={loading}>
            {loading ? '…' : 'Search'}
          </button>
        </div>
        {error && <p className="error-msg">{error}</p>}
        <p className="hint">Loads art, name, type, rules text, and collector info from Scryfall.</p>
      </section>

      {prints.length > 0 && (
        <section className="panel-section">
          <button className="btn-secondary full-width" onClick={() => setShowPrints(v => !v)}>
            {showPrints ? 'Hide' : 'Show'} all printings ({prints.length})
          </button>
          {showPrints && (
            <div className="prints-grid">
              {prints.map(p => p.artCrop && (
                <button
                  key={p.id}
                  className="print-thumb"
                  title={`${p.set} — ${p.artist}`}
                  onClick={() => onChangeMany({ artImage: p.artCrop, artist: p.artist })}
                >
                  <img src={p.artCrop} alt={p.set} />
                  <span>{p.set}</span>
                </button>
              ))}
            </div>
          )}
        </section>
      )}

      <section className="panel-section">
        <h3>Upload Custom Art</h3>
        <div
          className="art-upload-zone"
          onClick={() => fileRef.current.click()}
          onDragOver={e => e.preventDefault()}
          onDrop={e => { e.preventDefault(); handleUpload(e.dataTransfer.files[0]) }}
        >
          {card.artImage
            ? <img src={card.artImage} alt="Card art" />
            : <span>Click or drag an image here</span>
          }
        </div>
        <input ref={fileRef} type="file" accept="image/*" onChange={e => handleUpload(e.target.files[0])} style={{ display: 'none' }} />
        {card.artImage && (
          <button className="btn-secondary" onClick={() => onChange('artImage', null)}>Remove Art</button>
        )}
      </section>

      <section className="panel-section">
        <h3>Art Position &amp; Scale</h3>
        <label>
          X Offset
          <input type="range" min={-200} max={200} value={card.artX}
            onChange={e => onChange('artX', Number(e.target.value))} />
          <span className="value-display">{card.artX}px</span>
        </label>
        <label>
          Y Offset
          <input type="range" min={-200} max={200} value={card.artY}
            onChange={e => onChange('artY', Number(e.target.value))} />
          <span className="value-display">{card.artY}px</span>
        </label>
        <label>
          Scale
          <input type="range" min={0.5} max={3} step={0.05} value={card.artScale}
            onChange={e => onChange('artScale', Number(e.target.value))} />
          <span className="value-display">{card.artScale.toFixed(2)}×</span>
        </label>
        <button className="btn-secondary" onClick={() => { onChange('artX', 0); onChange('artY', 0); onChange('artScale', 1) }}>
          Reset Position
        </button>
      </section>
    </div>
  )
}
