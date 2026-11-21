// Maps mana symbol notation to colored pip spans
const MANA_COLORS = {
  W: { bg: '#f9faf4', border: '#c8b89a', text: '#000' },
  U: { bg: '#0e68ab', border: '#1a4f8a', text: '#fff' },
  B: { bg: '#150b00', border: '#3c3c3c', text: '#fff' },
  R: { bg: '#d3202a', border: '#a01010', text: '#fff' },
  G: { bg: '#00733e', border: '#005020', text: '#fff' },
  C: { bg: '#ccc', border: '#999', text: '#000' },
  X: { bg: '#888', border: '#555', text: '#fff' },
}

export function parseManaSymbols(manaCost = '') {
  const tokens = manaCost.match(/\{[^}]+\}/g) || []
  if (tokens.length === 0) return manaCost

  return tokens.map((token, i) => {
    const inner = token.slice(1, -1).toUpperCase()
    const style = MANA_COLORS[inner]
    if (style) {
      return (
        <span
          key={i}
          className="mana-pip"
          style={{
            background: style.bg,
            border: `1px solid ${style.border}`,
            color: style.text,
          }}
          title={inner}
        >
          {inner}
        </span>
      )
    }
    // Generic number pip
    return (
      <span key={i} className="mana-pip mana-pip--generic" title={inner}>
        {inner}
      </span>
    )
  })
}

export function getRarityGlyph(rarity) {
  const glyphs = {
    common: '●',
    uncommon: '◆',
    rare: '★',
    mythic: '✦',
    special: '✿',
  }
  return glyphs[rarity] ?? '●'
}
