import { useState } from 'react'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../../../app/fireBase'
import '../admin.css'

const INITIAL = {
  name: '',
  description: '',
  stack: '',
  link: '',
  logo: '',
  image: '',
  client: '',
  status: 'live',
  active: true,
}

export default function ProjectForm({ onClose }) {
  const [form, setForm] = useState(INITIAL)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  function handleChange(e) {
    const { name, value, type, checked } = e.target
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  async function handleSubmit() {
    console.log('submitting', form)
    setLoading(true)
    setError(null)
    try {
      const docRef = await addDoc(collection(db, 'portfolio-projects'), {
        ...form,
        stack: form.stack.split(',').map(s => s.trim()).filter(Boolean),
      })
      console.log('guardado', docRef.id)
      onClose()
    } catch (e) {
      console.log('error', e)
      setError('Error al guardar')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="overlay" onClick={onClose}>
      <div className="overlay__box overlay__box--wide" onClick={e => e.stopPropagation()}>
        <button className="overlay__close" onClick={onClose}>✕</button>
        <h2>Nuevo proyecto</h2>

        <input name="name" placeholder="Nombre" value={form.name} onChange={handleChange} />
        <input name="description" placeholder="Descripción" value={form.description} onChange={handleChange} />
        <input name="stack" placeholder="Stack (React, Vite, CSS)" value={form.stack} onChange={handleChange} />
        <input name="link" placeholder="Link" value={form.link} onChange={handleChange} />
        <input name="logo" placeholder="Logo URL" value={form.logo} onChange={handleChange} />
        <input name="image" placeholder="Imagen URL" value={form.image} onChange={handleChange} />
        <input name="client" placeholder="Cliente" value={form.client} onChange={handleChange} />

        <select name="status" value={form.status} onChange={handleChange}>
          <option value="live">Live</option>
          <option value="wip">WIP</option>
          <option value="in-progress">In Progress</option>
        </select>

        <label className="overlay__checkbox">
          <input type="checkbox" name="active" checked={form.active} onChange={handleChange} />
          Activo
        </label>

        {error && <p className="overlay__error">{error}</p>}

        <button className="overlay__submit" onClick={handleSubmit} disabled={loading}>
          {loading ? 'Guardando...' : 'Guardar'}
        </button>
      </div>
    </div>
  )
}