import { useState } from 'react'
import FramePanel from './panels/FramePanel'
import TextPanel from './panels/TextPanel'
import ArtPanel from './panels/ArtPanel'
import SetSymbolPanel from './panels/SetSymbolPanel'
import WatermarkPanel from './panels/WatermarkPanel'
import CollectorPanel from './panels/CollectorPanel'
import './CardEditor.css'

const TABS = [
  { id: 'frame',     label: 'Frame' },
  { id: 'text',      label: 'Text' },
  { id: 'art',       label: 'Art' },
  { id: 'set',       label: 'Set Symbol' },
  { id: 'watermark', label: 'Watermark' },
  { id: 'collector', label: 'Collector' },
]

export default function CardEditor({ card, onChange, onChangeMany }) {
  const [activeTab, setActiveTab] = useState('frame')

  return (
    <aside className="card-editor">
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
