import { useState } from 'react'
import CardEditor from './components/CardEditor'
import CardPreview from './components/CardPreview'
import './App.css'

export const defaultCard = {
  // Frame
  frameCategory: 'standard',
  framePack: 'regular',
  frameColor: 'G',
  borderStyle: 'modern',

  // Identity
  name: 'Forest Guardian',
  manaCost: '{2}{G}{G}',
  typeLine: 'Creature — Elf Warrior',
  supertype: '',

  // Text
  rulesText: 'Reach\n\nWhen this creature enters, you may search your library for a basic Forest card, reveal it, put it into your hand, then shuffle.',
  flavorText: '"The forest remembers every footfall."',

  // Art
  artImage: null,
  artX: 0,
  artY: 0,
  artScale: 1,

  // Stats
  power: '3',
  toughness: '4',
  loyalty: '',

  // Set symbol
  setCode: 'M25',
  rarity: 'R',
  setSymbolUrl: null,

  // Watermark
  watermark: 'none',
  watermarkOpacity: 0.4,

  // Collector info
  artist: 'John Avon',
  cardNumber: '001',
  language: 'EN',
  serialNumber: '',
}

export default function App() {
  const [card, setCard] = useState(defaultCard)

  const updateCard = (field, value) => setCard(prev => ({ ...prev, [field]: value }))
  const updateCardMany = (fields) => setCard(prev => ({ ...prev, ...fields }))

  return (
    <div className="app">
      <header className="app-header">
        <h1>MTG Proxy Maker</h1>
        <p>Design custom proxy cards for tabletop play</p>
      </header>
      <main className="app-main">
        <CardEditor card={card} onChange={updateCard} onChangeMany={updateCardMany} />
        <CardPreview card={card} />
      </main>
    </div>
  )
}
