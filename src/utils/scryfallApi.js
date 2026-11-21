const BASE = 'https://api.scryfall.com'

export async function searchCardArt(query) {
  const res = await fetch(`${BASE}/cards/named?fuzzy=${encodeURIComponent(query)}`)
  if (!res.ok) {
    const err = await res.json()
    throw new Error(err.details || 'Card not found')
  }
  const card = await res.json()
  return {
    name: card.name,
    artCrop: card.image_uris?.art_crop ?? null,
    normal: card.image_uris?.normal ?? null,
    artist: card.artist ?? '',
    manaCost: card.mana_cost ?? '',
    typeLine: card.type_line ?? '',
    oracleText: card.oracle_text ?? '',
    flavorText: card.flavor_text ?? '',
    power: card.power ?? '',
    toughness: card.toughness ?? '',
    loyalty: card.loyalty ?? '',
    setCode: card.set ?? '',
    rarity: rarityId(card.rarity),
    prints: card.prints_search_uri ?? null,
  }
}

export async function getCardPrints(printsUri) {
  const res = await fetch(printsUri)
  if (!res.ok) return []
  const data = await res.json()
  return (data.data || []).map(c => ({
    id: c.id,
    set: c.set.toUpperCase(),
    setName: c.set_name,
    artCrop: c.image_uris?.art_crop ?? null,
    artist: c.artist ?? '',
  }))
}

export async function getSetSymbolUrl(setCode) {
  if (!setCode) return null
  const res = await fetch(`${BASE}/sets/${setCode.toLowerCase()}`)
  if (!res.ok) return null
  const data = await res.json()
  return data.icon_svg_uri ?? null
}

// Scryfall rarity strings → our IDs
function rarityId(r) {
  return { common: 'C', uncommon: 'U', rare: 'R', mythic: 'M', special: 'S', bonus: 'S' }[r] ?? 'C'
}

// Mana symbol SVG URL from Scryfall
export function manaSymbolUrl(code) {
  // Scryfall uses uppercase codes like W, U, B, R, G, C, X, T, etc.
  // Hybrid: WU, UB, etc. → {W/U} maps to WU.svg
  return `https://svgs.scryfall.io/card-symbols/${code.toUpperCase()}.svg`
}

// Parse mana cost string like "{2}{G}{G}" into array of codes
export function parseManaCost(cost = '') {
  const tokens = cost.match(/\{[^}]+\}/g) || []
  return tokens.map(t => {
    const inner = t.slice(1, -1)
    // Normalize: {W/U} → WU, {2/W} → 2W, etc.
    return inner.replace(/\//g, '').toUpperCase()
  })
}
