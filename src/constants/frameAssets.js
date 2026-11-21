// Frame PNG asset map — all paths are under /frames/ in public/
// All frames are 1500×2100 RGBA overlays from the fiahdrgn473/CardConjurer repo

// Single-color suffix used by most frame packs
const C = {
  W: 'W', U: 'U', B: 'B', R: 'R', G: 'G',
  gold: 'M', WUBRG: 'M', colorless: 'A', land: 'L', vehicle: 'V',
  WU: 'M', UB: 'M', BR: 'M', RG: 'M', GW: 'M',
  WB: 'M', UR: 'M', BG: 'M', RW: 'M', GU: 'M',
}

// Guild two-color → [leftSuffix, rightSuffix] for split frame rendering
export const GUILD_SPLIT = {
  WU: ['W', 'U'], UB: ['U', 'B'], BR: ['B', 'R'], RG: ['R', 'G'], GW: ['G', 'W'],
  WB: ['W', 'B'], UR: ['U', 'R'], BG: ['B', 'G'], RW: ['R', 'W'], GU: ['G', 'U'],
}

// Which colors each pack supports; fall back to 'M' if color not in list
const PACK_COLORS = {
  token:        ['W','U','B','R','G','M','A','L'],
  saga:         ['W','U','B','R','G','M'],
  planeswalker: ['W','U','B','R','G','M','A'],
  mdfc:         ['W','U','B','R','G','M','A','L','V'],
  future:       ['W','U','B','R','G','M','A','C','L'],
  oldframe:     ['W','U','B','R','G','M','A'],
  unstable:     ['W','U','B','R','G','M','C'],
  storybook:    ['W','U','B','R','G','C'],
  ixalan:       ['W','U','B','R','G','M','L'],
  promo:        ['W','U','B','R','G','M','A','L'],
  textless:     ['W','U','B','R','G','M','L'],
}

function clamp(color, pack, fallback = 'M') {
  const allowed = PACK_COLORS[pack]
  if (!allowed) return color
  return allowed.includes(color) ? color : fallback
}

export function getFrameUrl(framePack, frameColor, variant = '') {
  const c = C[frameColor] ?? 'W'

  switch (framePack) {
    case 'regular':
    case 'nyx':
      return variant === 'nyx' || framePack === 'nyx'
        ? `/frames/m15/m15Frame${c}Nyx.png`
        : `/frames/m15/m15Frame${c}.png`

    case 'vehicle':
      return `/frames/m15/m15FrameV.png`

    case 'token': {
      const tc = clamp(c, 'token')
      return `/frames/token/tokenFrame${tc}.png`
    }

    case 'saga': {
      const sc = clamp(c, 'saga')
      return `/frames/saga/sagaFrame${sc}.png`
    }

    case 'planeswalker': {
      const pc = clamp(c, 'planeswalker')
      return `/frames/planeswalker/planeswalkerFrame${pc}.png`
    }

    case 'mdfc': {
      const mc = clamp(c, 'mdfc', 'M')
      return `/frames/modal/modalFrame${mc}.png`
    }

    case 'future': {
      const fc = clamp(c, 'future', 'A')
      return `/frames/future/futureFrame${fc}.png`
    }

    case 'oldframe': {
      const oc = clamp(c, 'oldframe')
      return `/frames/seventh/seventhFrame${oc}.png`
    }

    case 'unstable': {
      const uc = clamp(c, 'unstable', 'C')
      return `/frames/unstable/unstableFrame${uc}.png`
    }

    case 'invention':
      return `/frames/invention/inventionFrame.png`

    case 'promo': {
      const prc = clamp(c, 'promo')
      return `/frames/m15promo/m15PromoFrame${prc}.png`
    }

    case 'storybook': {
      const sb = clamp(c, 'storybook', 'C')
      return `/frames/storybook/storybookFrame${sb}.png`
    }

    case 'ixalan': {
      const ix = clamp(c, 'ixalan', 'M')
      return `/frames/ixalan/ixalanFrame${ix}.png`
    }

    case 'textless': {
      const tx = clamp(c, 'textless', 'M')
      return `/frames/m15textless/m15TextlessFrame${tx}.png`
    }

    default:
      return `/frames/m15/m15Frame${c}.png`
  }
}

// PT box — only m15, future, storybook have per-color PT boxes; rest fall back to m15
const PT_SUFFIX = {
  W: 'W', U: 'U', B: 'B', R: 'R', G: 'G',
  gold: 'M', WUBRG: 'M', colorless: 'A', land: 'M', vehicle: 'A',
  WU: 'M', UB: 'M', BR: 'M', RG: 'M', GW: 'M',
  WB: 'M', UR: 'M', BG: 'M', RW: 'M', GU: 'M',
}

export function getPtUrl(frameColor, framePack = 'regular') {
  const c = PT_SUFFIX[frameColor] ?? 'M'
  if (framePack === 'future') {
    const fc = ['W','U','B','R','G','M','A','C','L'].includes(c) ? c : 'M'
    return `/frames/future/futurePT${fc}.png`
  }
  if (framePack === 'storybook') {
    const sb = ['W','U','B','R','G','C'].includes(c) ? c : 'C'
    return `/frames/storybook/storybookPT${sb}.png`
  }
  if (framePack === 'invention') {
    return `/frames/invention/inventionPT.png`
  }
  return `/frames/m15/m15PT${c}.png`
}

export function getCrownUrl(frameColor) {
  const c = C[frameColor] ?? 'W'
  if (!['W','U','B','R','G','M','A','L'].includes(c)) return `/frames/m15/m15CrownM.png`
  return `/frames/m15/m15Crown${c}.png`
}

// Keyrune CSS class map for guild/faction watermarks
export const WATERMARK_KEYRUNE_CLASS = {
  azorius:   'ss-azo',  dimir:    'ss-dim',  rakdos:  'ss-rak',
  gruul:     'ss-gru',  selesnya: 'ss-sel',  orzhov:  'ss-orz',
  izzet:     'ss-izz',  golgari:  'ss-gol',  boros:   'ss-bor',
  simic:     'ss-sim',
  silverquill: 'ss-stx', prismari: 'ss-stx', witherbloom: 'ss-stx',
  lorehold:    'ss-stx', quandrix:  'ss-stx',
  abzan: 'ss-abz', jeskai: 'ss-jes', sultai: 'ss-sul', mardu: 'ss-mar', temur: 'ss-tem',
  brokers: 'ss-snc', obscura: 'ss-snc', maestros: 'ss-snc', riveteers: 'ss-snc', cabaretti: 'ss-snc',
  akros: 'ss-ths', meletis: 'ss-ths', setessa: 'ss-ths',
  phyrexian: 'ss-phyrexia', mirran: 'ss-mir', foretell: 'ss-khm',
  'wm-white': 'ss-lea', 'wm-blue': 'ss-lea', 'wm-black': 'ss-lea',
  'wm-red': 'ss-lea', 'wm-green': 'ss-lea', 'wm-colorless': 'ss-lea',
  planeswalker: 'ss-pw',
  dci: 'ss-dci',
}
