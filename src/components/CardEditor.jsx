import { useState, useRef, useEffect, useCallback } from 'react'
import FramePanel from './panels/FramePanel'
import TextPanel from './panels/TextPanel'
import ArtPanel from './panels/ArtPanel'
import SetSymbolPanel from './panels/SetSymbolPanel'
import WatermarkPanel from './panels/WatermarkPanel'
import CollectorPanel from './panels/CollectorPanel'
import { autocompleteCardName, searchCardArt, getSetSymbolUrl } from '../utils/scryfallApi'
import './CardEditor.css'

const TABS = [
  { id: 'frame',     label: 'Frame' },
  { id: 'text',      label: 'Text' },
  { id: 'art',       label: 'Art' },
  { id: 'set',       label: 'Set Symbol' },
  { id: 'watermark', label: 'Watermark' },
  { id: 'collector', label: 'Collector' },
]

function CardImport({ onChangeMany }) {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const debounceRef = useRef(null)
  const wrapperRef = useRef(null)

  // Autocomplete as user types
  const handleInput = useCallback((e) => {
    const val = e.target.value
    setQuery(val)
    clearTimeout(debounceRef.current)
    if (val.length < 2) { setSuggestions([]); setOpen(false); return }
    debounceRef.current = setTimeout(async () => {
      const names = await autocompleteCardName(val)
      setSuggestions(names.slice(0, 8))
      setOpen(names.length > 0)
    }, 220)
  }, [])

  // Import a card by exact name
  const importCard = useCallback(async (name) => {
    setQuery(name)
    setSuggestions([])
    setOpen(false)
    setLoading(true)
    try {
      const card = await searchCardArt(name)
      const setSymbolUrl = await getSetSymbolUrl(card.setCode)
      onChangeMany({
        name: card.name,
        manaCost: card.manaCost,
        typeLine: card.typeLine,
        rulesText: card.oracleText,
        flavorText: card.flavorText,
        power: card.power,
        toughness: card.toughness,
        loyalty: card.loyalty,
        artist: card.artist,
        setCode: card.setCode?.toUpperCase() ?? '',
        rarity: card.rarity,
        setSymbolUrl,
        artImage: card.artCrop,
      })
    } catch {
      // silently fail
    } finally {
      setLoading(false)
    }
  }, [onChangeMany])

  // Close dropdown when clicking outside
  useEffect(() => {
    function onClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  return (
    <div className="card-import" ref={wrapperRef}>
      <div className="card-import__row">
        <input
          className="card-import__input"
          type="text"
          placeholder="Import card from Scryfall…"
          value={query}
          onChange={handleInput}
          onKeyDown={e => { if (e.key === 'Enter' && query) importCard(query) }}
        />
        {loading && <span className="card-import__spinner">⟳</span>}
      </div>
      {open && (
        <ul className="card-import__suggestions">
          {suggestions.map(name => (
            <li key={name} onMouseDown={() => importCard(name)}>{name}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default function CardEditor({ card, onChange, onChangeMany }) {
  const [activeTab, setActiveTab] = useState('frame')

  return (
    <aside className="card-editor">
      <CardImport onChangeMany={onChangeMany} />

      <nav className="editor-tabs">
        {TABS.map(t => (
          <button
            key={t.id}
            className={`tab-btn ${activeTab === t.id ? 'active' : ''}`}
            onClick={() => setActiveTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </nav>

      <div className="editor-panel">
        {activeTab === 'frame'     && <FramePanel     card={card} onChange={onChange} />}
        {activeTab === 'text'      && <TextPanel      card={card} onChange={onChange} />}
        {activeTab === 'art'       && <ArtPanel       card={card} onChange={onChange} onChangeMany={onChangeMany} />}
        {activeTab === 'set'       && <SetSymbolPanel card={card} onChange={onChange} />}
        {activeTab === 'watermark' && <WatermarkPanel card={card} onChange={onChange} />}
        {activeTab === 'collector' && <CollectorPanel card={card} onChange={onChange} />}
      </div>
    </aside>
  )
}
