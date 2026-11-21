export const WATERMARK_GROUPS = [
  {
    label: 'General',
    items: [
      { id: 'none',          label: 'None' },
      { id: 'planeswalker',  label: 'Planeswalker' },
      { id: 'dci',           label: 'DCI Star' },
    ],
  },
  {
    label: 'Mono Colors',
    items: [
      { id: 'wm-white',     label: 'White',     color: '#f9faf4' },
      { id: 'wm-blue',      label: 'Blue',      color: '#1a6db5' },
      { id: 'wm-black',     label: 'Black',     color: '#1a1208' },
      { id: 'wm-red',       label: 'Red',       color: '#d4341a' },
      { id: 'wm-green',     label: 'Green',     color: '#1a7840' },
      { id: 'wm-colorless', label: 'Colorless', color: '#8898a8' },
    ],
  },
  {
    label: 'Mechanics',
    items: [
      { id: 'foretell',  label: 'Foretell' },
      { id: 'phyrexian', label: 'Phyrexian (New)' },
      { id: 'mirran',    label: 'Mirran' },
    ],
  },
  {
    label: 'Ravnica Guilds',
    items: [
      { id: 'azorius',  label: 'Azorius (WU)' },
      { id: 'dimir',    label: 'Dimir (UB)' },
      { id: 'rakdos',   label: 'Rakdos (BR)' },
      { id: 'gruul',    label: 'Gruul (RG)' },
      { id: 'selesnya', label: 'Selesnya (GW)' },
      { id: 'orzhov',   label: 'Orzhov (WB)' },
      { id: 'izzet',    label: 'Izzet (UR)' },
      { id: 'golgari',  label: 'Golgari (BG)' },
      { id: 'boros',    label: 'Boros (RW)' },
      { id: 'simic',    label: 'Simic (GU)' },
    ],
  },
  {
    label: 'Strixhaven Schools',
    items: [
      { id: 'silverquill',  label: 'Silverquill (WB)' },
      { id: 'prismari',     label: 'Prismari (UR)' },
      { id: 'witherbloom',  label: 'Witherbloom (BG)' },
      { id: 'lorehold',     label: 'Lorehold (RW)' },
      { id: 'quandrix',     label: 'Quandrix (GU)' },
    ],
  },
  {
    label: 'New Capenna Families',
    items: [
      { id: 'brokers',   label: 'Brokers (WUG)' },
      { id: 'obscura',   label: 'Obscura (WUB)' },
      { id: 'maestros',  label: 'Maestros (UBR)' },
      { id: 'riveteers', label: 'Riveteers (BRG)' },
      { id: 'cabaretti', label: 'Cabaretti (RGW)' },
    ],
  },
  {
    label: 'Tarkir Clans',
    items: [
      { id: 'abzan',   label: 'Abzan' },
      { id: 'jeskai',  label: 'Jeskai' },
      { id: 'sultai',  label: 'Sultai' },
      { id: 'mardu',   label: 'Mardu' },
      { id: 'temur',   label: 'Temur' },
    ],
  },
  {
    label: 'Theros Poleis',
    items: [
      { id: 'akros',    label: 'Akros' },
      { id: 'meletis',  label: 'Meletis' },
      { id: 'setessa',  label: 'Setessa' },
    ],
  },
]

// Keyrune CSS class map for guild/faction symbols
export const WATERMARK_KEYRUNE = {
  azorius: 'ss ss-azo', dimir: 'ss ss-dim', rakdos: 'ss ss-rak',
  gruul: 'ss ss-gru', selesnya: 'ss ss-sel', orzhov: 'ss ss-orz',
  izzet: 'ss ss-izz', golgari: 'ss ss-gol', boros: 'ss ss-bor',
  simic: 'ss ss-sim', abzan: 'ss ss-abz', jeskai: 'ss ss-jes',
  sultai: 'ss ss-sul', mardu: 'ss ss-mar', temur: 'ss ss-tem',
  silverquill: 'ss ss-stx', prismari: 'ss ss-stx', witherbloom: 'ss ss-stx',
  lorehold: 'ss ss-stx', quandrix: 'ss ss-stx',
}
