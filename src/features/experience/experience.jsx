// src/features/experience/experience.jsx
import { useEffect, useState } from 'react'
import { getExperience, deleteExperience } from '../../db/experience'
import { useAuth } from '../../app/auth'
import ExperienceForm from '../admin/forms/experienceForm'
import './experience.css'

const WINDOW_MONTHS = 12
const STEP_MONTHS = 6

function addMonths(date, months) {
  const d = new Date(date)
  d.setMonth(d.getMonth() + months)
  return d
}

function parseDate(str) {
  return new Date(str + '-01')
}

function formatLabel(date) {
  return date.toLocaleDateString('es', { month: 'short', year: 'numeric' })
}

function Experience() {
  const { user } = useAuth()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)
  const [windowEnd, setWindowEnd] = useState(new Date())
  const [showForm, setShowForm] = useState(false)

  const windowStart = addMonths(windowEnd, -WINDOW_MONTHS)

  useEffect(() => {
    getExperience()
      .then(data => setItems(data))
      .finally(() => setLoading(false))
  }, [])

  async function handleDelete(id) {
    await deleteExperience(id)
    setItems(prev => prev.filter(i => i.id !== id))
    if (selected?.id === id) setSelected(null)
  }

  function handleAdded() {
    setShowForm(false)
    getExperience().then(data => setItems(data))
  }

  function getBlock(item) {
    const start = parseDate(item.start)
    const end = item.current ? new Date() : parseDate(item.end)
    const windowMs = windowEnd - windowStart

    const left = Math.max(0, (start - windowStart) / windowMs) * 100
    const right = Math.min(1, (end - windowStart) / windowMs) * 100
    const width = right - left

    if (width <= 0) return null
    return { left, width }
  }

  const typeConfig = {
    job:       { height: 40, color: 'var(--color-accent)' },
    freelance: { height: 40, color: '#00ff96' },
    course:    { height: 24, color: '#ffc800' },
    workshop:  { height: 24, color: '#ff6b6b' },
  }

  return (
    <section className="experience" id="experience">
      <div className="container">
        <div className="section__header">
          <h2 className="experience__title">Experiencia</h2>
          {user && <button className="section__add" onClick={() => setShowForm(true)}>+</button>}
        </div>

        {loading
          ? <p style={{ textAlign: 'center', opacity: 0.5 }}>Cargando...</p>
          : <>
              <div className="timeline-controls">
                <button onClick={() => setWindowEnd(addMonths(windowEnd, -STEP_MONTHS))}>←</button>
                <span>{formatLabel(windowStart)} — {formatLabel(windowEnd)}</span>
                <button
                  onClick={() => setWindowEnd(addMonths(windowEnd, STEP_MONTHS))}
                  disabled={windowEnd >= new Date()}
                >→</button>
              </div>

              <div className="timeline">
                <div className="timeline__labels">
                  {[0, 3, 6, 9, 12].map(m => (
                    <span key={m} style={{ left: `${(m / WINDOW_MONTHS) * 100}%` }}>
                      {formatLabel(addMonths(windowStart, m))}
                    </span>
                  ))}
                </div>

                <div className="timeline__tracks">
                  {items.map(item => {
                    const block = getBlock(item)
                    if (!block) return null
                    const config = typeConfig[item.type] || typeConfig.job
                    return (
                      <div key={item.id} className="timeline__track">
                        <div
                          className={`timeline__block ${selected?.id === item.id ? 'timeline__block--active' : ''}`}
                          style={{
                            left: `${block.left}%`,
                            width: `${block.width}%`,
                            height: config.height,
                            background: config.color,
                          }}
                          onClick={() => setSelected(item)}
                        >
                          <span className="timeline__block-label">{item.company}</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {selected && (
                <div className="timeline__detail">
                  {user && (
                    <button className="card__delete" onClick={() => handleDelete(selected.id)}>✕</button>
                  )}
                  <div className="timeline__detail-header">
                    {selected.logo && <img src={selected.logo} alt="" className="timeline__logo" />}
                    <div>
                      <h3 className="timeline__role">{selected.role}</h3>
                      <p className="timeline__company">{selected.company}</p>
                    </div>
                  </div>
                  <p className="timeline__period">
                    {selected.start} — {selected.current ? 'Presente' : selected.end}
                  </p>
                  <p className="timeline__description">{selected.description}</p>
                </div>
              )}
            </>
        }

        {showForm && <ExperienceForm onClose={() => setShowForm(false)} onAdded={handleAdded} />}
      </div>
    </section>
  )
}

export default Experience