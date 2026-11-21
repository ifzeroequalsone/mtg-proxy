// Maps (framePack, frameColor) → PNG path under /frames/
// Frame PNGs are 1500×2100 RGBA overlays from the CardConjurer repo

// Color ID → file suffix used by each frame pack
const COLOR_SUFFIX = {
  W: 'W', U: 'U', B: 'B', R: 'R', G: 'G',
  gold: 'M', WUBRG: 'M',
  colorless: 'A',  // Artifact frame for colorless
  land: 'L',
  vehicle: 'V',
  // Guilds fall back to gold/M
  WU: 'M', UB: 'M', BR: 'M', RG: 'M', GW: 'M',
  WB: 'M', UR: 'M', BG: 'M', RW: 'M', GU: 'M',
}

// PT box suffix (no V or L variant — fall back to M/A)
const PT_SUFFIX = {
  W: 'W', U: 'U', B: 'B', R: 'R', G: 'G',
  gold: 'M', WUBRG: 'M',
  colorless: 'A',
  land: 'M', vehicle: 'A',
  WU: 'M', UB: 'M', BR: 'M', RG: 'M', GW: 'M',
  WB: 'M', UR: 'M', BG: 'M', RW: 'M', GU: 'M',
}

export function getFrameUrl(framePack, frameColor, variant = '') {
  const c = COLOR_SUFFIX[frameColor] ?? 'W'

  switch (framePack) {
    case 'regular':
    case 'adventure':
    case 'mdfc':
    case 'transform':
      return variant === 'nyx'
        ? `/frames/m15/m15Frame${c}Nyx.png`
        : `/frames/m15/m15Frame${c}.png`

    case 'token':
      // tokens have W U B R G M A C L but no V
      if (c === 'V') return `/frames/token/tokenFrameA.png`
      return `/frames/token/tokenFrame${c}.png`

    case 'saga':
      // sagas have W U B R G M (no A/L/V)
      if (!['W','U','B','R','G','M'].includes(c)) return `/frames/m15/m15Frame${c}.png`
      return `/frames/saga/sagaFrame${c}.png`

    case 'planeswalker':
      if (!['W','U','B','R','G','M','A'].includes(c)) return `/frames/planeswalker/planeswalkerFrameM.png`
      return `/frames/planeswalker/planeswalkerFrame${c}.png`

    default:
      return `/frames/m15/m15Frame${c}.png`
  }
}

export function getPtUrl(frameColor) {
  const c = PT_SUFFIX[frameColor] ?? 'W'
  return `/frames/m15/m15PT${c}.png`
}

export function getCrownUrl(frameColor) {
  const c = COLOR_SUFFIX[frameColor] ?? 'W'
  if (!['W','U','B','R','G','M','A','L'].includes(c)) return `/frames/m15/m15CrownM.png`
  return `/frames/m15/m15Crown${c}.png`
}

// Keyrune CSS class map for guild/faction watermarks
export const WATERMARK_KEYRUNE_CLASS = {
  // guilds
  azorius:   'ss-azo',  dimir:    'ss-dim',  rakdos:  'ss-rak',
  gruul:     'ss-gru',  selesnya: 'ss-sel',  orzhov:  'ss-orz',
  izzet:     'ss-izz',  golgari:  'ss-gol',  boros:   'ss-bor',
  simic:     'ss-sim',
  // strixhaven
  silverquill: 'ss-stx', prismari: 'ss-stx', witherbloom: 'ss-stx',
  lorehold:    'ss-stx', quandrix:  'ss-stx',
  // tarkir
  abzan: 'ss-abz', jeskai: 'ss-jes', sultai: 'ss-sul', mardu: 'ss-mar', temur: 'ss-tem',
  // new capenna
  brokers: 'ss-snc', obscura: 'ss-snc', maestros: 'ss-snc', riveteers: 'ss-snc', cabaretti: 'ss-snc',
  // theros
  akros: 'ss-ths', meletis: 'ss-ths', setessa: 'ss-ths',
  // mechanics
  phyrexian: 'ss-phyrexia', mirran: 'ss-mir', foretell: 'ss-khm',
  // mono
  'wm-white': 'ss-lea', 'wm-blue': 'ss-lea', 'wm-black': 'ss-lea',
  'wm-red': 'ss-lea', 'wm-green': 'ss-lea', 'wm-colorless': 'ss-lea',
  // planeswalker
  planeswalker: 'ss-pw',
  dci: 'ss-dci',
}
