import { manaSymbolUrl, parseManaCost } from '../../utils/scryfallApi'
import './panels.css'

const MANA_CODES = [
  'W','U','B','R','G','C','X','T','1','2','3','4','5','6','7','8',
  'WU','WB','UB','UR','BR','BG','RG','RW','GU','GW',
  'PW','PU','PB','PR','PG','S','E',
]

export default function TextPanel({ card, onChange }) {
  const manaPips = parseManaCost(card.manaCost)

  const insertCode = (field, code) => {
    const el = document.getElementById(`txt-${field}`)
    if (!el) return
    const start = el.selectionStart ?? el.value.length
    const end = el.selectionEnd ?? el.value.length
    const val = card[field] ?? ''
    const next = val.slice(0, start) + `{${code}}` + val.slice(end)
    onChange(field, next)
    requestAnimationFrame(() => {
      const pos = start + code.length + 2
      el.setSelectionRange(pos, pos)
      el.focus()
    })
  }

  return (
    <div className="panel">
      <section className="panel-section">
        <h3>Card Name</h3>
        <input
          id="txt-name"
          value={card.name}
          onChange={e => onChange('name', e.target.value)}
          placeholder="Card Name"
        />
      </section>

      <section className="panel-section">
        <h3>Mana Cost</h3>
        <input
          id="txt-manaCost"
          value={card.manaCost}
          onChange={e => onChange('manaCost', e.target.value)}
          placeholder="{2}{G}{G}"
        />
        {manaPips.length > 0 && (
          <div className="mana-preview">
            {manaPips.map((pip, i) => (
              <img
                key={i}
                src={manaSymbolUrl(pip)}
                alt={pip}
                className="mana-img"
                title={`{${pip}}`}
              />
            ))}
          </div>
        )}
        <div className="symbol-quick-insert">
          <span className="hint">Quick insert:</span>
          <div className="symbol-grid">
            {['W','U','B','R','G','C','X','T','S','E','WU','WB','UB','UR','BR','BG','RG','RW','GU','GW','PW','PU','PB','PR','PG'].map(code => (
              <button
                key={code}
                className="symbol-btn"
                onClick={() => insertCode('manaCost', code)}
                title={`{${code}}`}
              >
                <img src={manaSymbolUrl(code)} alt={code} />
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="panel-section">
        <h3>Type Line</h3>
        <input
          id="txt-typeLine"
          value={card.typeLine}
          onChange={e => onChange('typeLine', e.target.value)}
          placeholder="Creature — Elf Warrior"
        />
        <label className="inline-label">
          <span>Supertype</span>
          <input
            id="txt-supertype"
            value={card.supertype}
            onChange={e => onChange('supertype', e.target.value)}
            placeholder="Legendary, Basic, Snow…"
            style={{ flex: 1 }}
          />
        </label>
      </section>

      <section className="panel-section">
        <h3>Rules Text</h3>
        <div className="textarea-with-toolbar">
          <div className="text-toolbar">
            {['W','U','B','R','G','C','X','T'].map(code => (
              <button key={code} className="symbol-btn-sm" onClick={() => insertCode('rulesText', code)} title={`{${code}}`}>
                <img src={manaSymbolUrl(code)} alt={code} />
              </button>
            ))}
            <button className="text-code-btn" onClick={() => insertCode('rulesText', 'i')}>i</button>
            <button className="text-code-btn" onClick={() => insertCode('rulesText', 'bold')}>B</button>
            <button className="text-code-btn" onClick={() => insertCode('rulesText', 'flavor')}>✦</button>
          </div>
          <textarea
            id="txt-rulesText"
            value={card.rulesText}
            onChange={e => onChange('rulesText', e.target.value)}
            rows={5}
            placeholder="Rules text…&#10;&#10;{i}Reminder text in italics{/i}"
          />
        </div>
        <details className="code-ref">
          <summary>Text code reference</summary>
          <table>
            <tbody>
              {[
                ['{i} / {/i}', 'Italicize'],
                ['{bold} / {/bold}', 'Bold'],
                ['{flavor}', 'Flavor bar + italics'],
                ['{divider}', 'Flavor bar only'],
                ['{cardname} or ~', 'Card name'],
                ['{-}', 'Em-dash'],
                ['{fontsize12pt}', 'Set font 12pt'],
                ['{fontcolor#f00}', 'Set font color'],
              ].map(([code, desc]) => (
                <tr key={code}><td><code>{code}</code></td><td>{desc}</td></tr>
              ))}
            </tbody>
          </table>
        </details>
      </section>

      <section className="panel-section">
        <h3>Flavor Text</h3>
        <textarea
          id="txt-flavorText"
          value={card.flavorText}
          onChange={e => onChange('flavorText', e.target.value)}
          rows={2}
          placeholder='"The forest remembers every footfall."'
        />
      </section>

      <section className="panel-section">
        <h3>Power / Toughness</h3>
        <div className="pt-row">
          <input
            value={card.power}
            onChange={e => onChange('power', e.target.value)}
            placeholder="*"
            style={{ width: 60, textAlign: 'center' }}
          />
          <span className="pt-slash">/</span>
          <input
            value={card.toughness}
            onChange={e => onChange('toughness', e.target.value)}
            placeholder="*"
            style={{ width: 60, textAlign: 'center' }}
          />
        </div>
      </section>

      <section className="panel-section">
        <h3>Loyalty (Planeswalker)</h3>
        <input
          value={card.loyalty}
          onChange={e => onChange('loyalty', e.target.value)}
          placeholder="4"
          style={{ width: 80, textAlign: 'center' }}
        />
      </section>
    </div>
  )
}
