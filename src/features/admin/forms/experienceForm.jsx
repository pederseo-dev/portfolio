// src/features/admin/forms/experienceForm.jsx
import { useState } from 'react'
import { addExperience } from '../../../db/experience'
import '../admin.css'

const INITIAL = {
  company: '',
  role: '',
  type: 'job',
  start: '',
  end: '',
  current: false,
  description: '',
  logo: '',
}

export default function ExperienceForm({ onClose, onAdded }) {
  const [form, setForm] = useState(INITIAL)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  function handleChange(e) {
    const { name, value, type, checked } = e.target
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  async function handleSubmit() {
    setLoading(true)
    setError(null)
    try {
      await addExperience({ ...form, end: form.current ? null : form.end })
      onAdded()
    } catch (e) {
      setError('Error al guardar')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="overlay" onClick={onClose}>
      <div className="overlay__box overlay__box--wide" onClick={e => e.stopPropagation()}>
        <button className="overlay__close" onClick={onClose}>✕</button>
        <h2>Nueva experiencia</h2>

        <input name="company" placeholder="Empresa" value={form.company} onChange={handleChange} />
        <input name="role" placeholder="Rol" value={form.role} onChange={handleChange} />

        <select name="type" value={form.type} onChange={handleChange}>
          <option value="job">Job</option>
          <option value="freelance">Freelance</option>
          <option value="course">Course</option>
          <option value="workshop">Workshop</option>
        </select>

        <input type="month" name="start" value={form.start} onChange={handleChange} />
        {!form.current && (
          <input type="month" name="end" value={form.end} onChange={handleChange} />
        )}

        <label className="overlay__checkbox">
          <input type="checkbox" name="current" checked={form.current} onChange={handleChange} />
          Presente
        </label>

        <input name="description" placeholder="Descripción" value={form.description} onChange={handleChange} />
        <input name="logo" placeholder="Logo URL" value={form.logo} onChange={handleChange} />

        {error && <p className="overlay__error">{error}</p>}

        <button className="overlay__submit" onClick={handleSubmit} disabled={loading}>
          {loading ? 'Guardando...' : 'Guardar'}
        </button>
      </div>
    </div>
  )
}