import { useState } from 'react'
import CardEditor from './components/CardEditor'
import CardPreview from './components/CardPreview'
import './App.css'

const defaultCard = {
  name: 'Forest Guardian',
  manaCost: '{2}{G}{G}',
  typeLine: 'Creature — Elf Warrior',
  frame: 'green',
  rarity: 'rare',
  artImage: null,
  flavorText: '"The forest remembers every footfall."',
  rulesText: 'Reach\n\nWhen this creature enters, you may search your library for a basic Forest card, reveal it, put it into your hand, then shuffle.',
  power: '3',
  toughness: '4',
  artist: '',
  borderStyle: 'modern',
}

export default function App() {
  const [card, setCard] = useState(defaultCard)

  const updateCard = (field, value) => setCard(prev => ({ ...prev, [field]: value }))

  return (
    <div className="app">
      <header className="app-header">
        <h1>MTG Proxy Maker</h1>
        <p>Design custom proxy cards for tabletop play</p>
      </header>
      <main className="app-main">
        <CardEditor card={card} onChange={updateCard} />
        <CardPreview card={card} />
      </main>
    </div>
  )
}
