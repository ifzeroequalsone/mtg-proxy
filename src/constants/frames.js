export const FRAME_CATEGORIES = [
  { id: 'standard',  label: 'Standard' },
  { id: 'special',   label: 'Special' },
  { id: 'showcase',  label: 'Showcase' },
  { id: 'promo',     label: 'Promo / Tall Art' },
  { id: 'textless',  label: 'Textless / Full Art' },
  { id: 'other',     label: 'Other / Custom' },
]

export const FRAME_PACKS = {
  standard: [
    { id: 'regular',      label: 'Regular' },
    { id: 'token',        label: 'Token' },
    { id: 'saga',         label: 'Saga' },
    { id: 'planeswalker', label: 'Planeswalker' },
    { id: 'mdfc',         label: 'Modal DFC' },
    { id: 'transform',    label: 'Transform' },
    { id: 'adventure',    label: 'Adventure' },
    { id: 'split',        label: 'Split' },
    { id: 'fuse',         label: 'Fuse' },
  ],
  special: [
    { id: 'miracle',    label: 'Miracle' },
    { id: 'nyx',        label: 'Nyx (Enchantment)' },
    { id: 'vehicle',    label: 'Vehicle' },
    { id: 'leveler',    label: 'Leveler' },
    { id: 'class',      label: 'Class' },
    { id: 'case',       label: 'Case' },
    { id: 'battle',     label: 'Battle' },
  ],
  showcase: [
    { id: 'showcase-universal', label: 'Universal' },
    { id: 'showcase-etched',    label: 'Etched Foil' },
    { id: 'showcase-anime',     label: 'Anime' },
    { id: 'showcase-retro',     label: 'Retro (1993)' },
    { id: 'showcase-storybook', label: 'Storybook' },
    { id: 'showcase-concept',   label: 'Concept Praetor' },
  ],
  promo: [
    { id: 'promo-tall',     label: 'Tall Art Promo' },
    { id: 'promo-stamped',  label: 'Stamped Promo' },
  ],
  textless: [
    { id: 'textless',  label: 'Textless' },
    { id: 'fullart',   label: 'Full Art' },
    { id: 'panoramic', label: 'Panoramic' },
  ],
  other: [
    { id: 'custom',   label: 'Custom Upload' },
    { id: 'oldframe', label: 'Old Frame (pre-8th)' },
    { id: 'm15',      label: 'M15 Core Set' },
    { id: 'future',   label: 'Futureshifted' },
  ],
}

export const FRAME_COLORS = [
  { id: 'W',         label: 'White',      hex: '#f9faf4', textHex: '#1a1208' },
  { id: 'U',         label: 'Blue',       hex: '#1a6db5', textHex: '#fff' },
  { id: 'B',         label: 'Black',      hex: '#28201a', textHex: '#d4c8b8' },
  { id: 'R',         label: 'Red',        hex: '#d4341a', textHex: '#fff' },
  { id: 'G',         label: 'Green',      hex: '#1a7840', textHex: '#fff' },
  { id: 'WU',        label: 'White/Blue (Azorius)',  hex: '#6090c8', textHex: '#fff' },
  { id: 'UB',        label: 'Blue/Black (Dimir)',    hex: '#2a3850', textHex: '#d4c8b8' },
  { id: 'BR',        label: 'Black/Red (Rakdos)',    hex: '#6a1818', textHex: '#ffd4c8' },
  { id: 'RG',        label: 'Red/Green (Gruul)',     hex: '#8b4a10', textHex: '#fff' },
  { id: 'GW',        label: 'Green/White (Selesnya)',hex: '#5a7840', textHex: '#fff' },
  { id: 'WB',        label: 'White/Black (Orzhov)',  hex: '#888078', textHex: '#fff' },
  { id: 'UR',        label: 'Blue/Red (Izzet)',      hex: '#3858a8', textHex: '#ffe8c8' },
  { id: 'BG',        label: 'Black/Green (Golgari)', hex: '#384828', textHex: '#d4e8c8' },
  { id: 'RW',        label: 'Red/White (Boros)',     hex: '#c86028', textHex: '#fff' },
  { id: 'GU',        label: 'Green/Blue (Simic)',    hex: '#187858', textHex: '#fff' },
  { id: 'WUBRG',     label: 'Five Color',            hex: '#c8a830', textHex: '#1a1208' },
  { id: 'gold',      label: 'Gold (Multicolor)',     hex: '#c8a830', textHex: '#1a1208' },
  { id: 'colorless', label: 'Colorless / Artifact',  hex: '#8898a8', textHex: '#fff' },
  { id: 'land',      label: 'Land',                  hex: '#a08858', textHex: '#fff' },
  { id: 'vehicle',   label: 'Vehicle',               hex: '#8b4f1a', textHex: '#fff' },
]

export const RARITIES = [
  { id: 'C', label: 'Common',   glyph: '●', color: '#c0bfbe' },
  { id: 'U', label: 'Uncommon', glyph: '◆', color: '#b5c4d4' },
  { id: 'R', label: 'Rare',     glyph: '★', color: '#c8a040' },
  { id: 'M', label: 'Mythic',   glyph: '✦', color: '#e06020' },
  { id: 'S', label: 'Special',  glyph: '✿', color: '#c060c0' },
  { id: 'T', label: 'Timeshifted', glyph: '◈', color: '#9060c0' },
]

export const BORDER_STYLES = [
  { id: 'modern',      label: 'Modern (2003+)' },
  { id: 'classic',     label: 'Classic (pre-2003)' },
  { id: 'borderless',  label: 'Borderless' },
  { id: 'showcase',    label: 'Showcase' },
  { id: 'extended',    label: 'Extended Art' },
]
