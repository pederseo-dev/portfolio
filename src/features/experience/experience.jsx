import { useEffect, useState } from 'react'
import { getExperience, deleteExperience } from '../../db/experience'
import { useAuth } from '../../app/auth'
import ExperienceForm from '../admin/forms/experienceForm'
import './experience.css'

function ExperienceCard({ item, isAdmin, onDelete }) {
  return (
    <div className="exp-card">
      {isAdmin && (
        <button className="card__delete" onClick={() => onDelete(item.id)}>✕</button>
      )}
      <div className="exp-card__header">
        {item.logo && <img src={item.logo} alt="" className="exp-card__logo" />}
        <div>
          <h3 className="exp-card__company">{item.company}</h3>
          <p className="exp-card__role">{item.role}</p>
        </div>
        <span className={`exp-card__badge exp-card__badge--${item.type}`}>{item.type}</span>
      </div>
      <p className="exp-card__period">
        {item.start} — {item.current ? 'Presente' : item.end}
      </p>
      {item.description && (
        <p className="exp-card__description">{item.description}</p>
      )}
    </div>
  )
}

function Experience() {
  const { user } = useAuth()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    getExperience()
      .then(data => setItems([...data].sort((a, b) => {
        const dateA = a.current ? '9999-99' : (a.end ?? a.start)
        const dateB = b.current ? '9999-99' : (b.end ?? b.start)
        return dateB.localeCompare(dateA)
      })))
      .finally(() => setLoading(false))
  }, [])

  async function handleDelete(id) {
    await deleteExperience(id)
    setItems(prev => prev.filter(i => i.id !== id))
  }

  function handleAdded() {
    setShowForm(false)
    getExperience().then(data => setItems(data))
  }

    return (
      <section className="experience" id="experience">
        <div className="container">
          <div className="section__header">
            <h2 className="experience__title">Experiencia</h2>
            {user && <button className="section__add" onClick={() => setShowForm(true)}>+</button>}
          </div>

          <div className="exp-layout">
            <div className="exp-layout__list">
              {loading
                ? <p style={{ textAlign: 'center', opacity: 0.5 }}>Cargando...</p>
                : <div className="exp-timeline">
                    {items.map((item, i) => (
                      <div key={item.id} className="exp-timeline__item">
                        <div className="exp-timeline__line">
                          <div className="exp-timeline__dot" />
                          {i < items.length - 1 && <div className="exp-timeline__connector" />}
                        </div>
                        <ExperienceCard item={item} isAdmin={!!user} onDelete={handleDelete} />
                      </div>
                    ))}
                  </div>
              }
            </div>

            <div className="exp-layout__media">
              <img src="https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3OThzbWFnaHNrbWl5dGlwOGo5ZXhkYTU3dnJ2dmRndmhhMTdpb3hiYyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/ITRemFlr5tS39AzQUL/giphy.gif" alt="" />
            </div>
          </div>

        </div>
        {showForm && <ExperienceForm onClose={() => setShowForm(false)} onAdded={handleAdded} />}
      </section>
    )
}

export default Experience