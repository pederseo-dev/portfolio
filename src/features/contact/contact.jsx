// src/features/contact/contact.jsx
import { useState } from 'react'
import './contact.css'

const ENDPOINT = 'https://script.google.com/macros/s/AKfycbwSfCpGAy8T-YAMhv3FCHlDFxYA6XVCcY4j5tJj551RILfIl62F2koXUJeqMmUBrhzc/exec'



const SOCIAL = [
  { label: 'GitHub',    href: 'https://github.com/pederseo-dev' },
  { label: 'LinkedIn',  href: 'https://www.linkedin.com/in/olaf-pedersen-870a2b30b/' },
  { label: 'Instagram', href: 'https://www.instagram.com/olaf.pedersen' },
  { label: 'Mail',      href: 'pederseo.dev@mail.com' },
  { label: 'Teléfono',  href: 'tel:+595 984538959' },
]

const INITIAL = { name: '', email: '', message: '' }

export default function Contact() {
  const [form, setForm]     = useState(INITIAL)
  const [loading, setLoading] = useState(false)
  const [sent, setSent]     = useState(false)
  const [error, setError]   = useState(null)

  function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

    async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
        await fetch(ENDPOINT, {
        method: 'POST',
        body: JSON.stringify(form),
        })
        setSent(true)
        setForm(INITIAL)
    } catch {
        setError('Error al enviar, intentá de nuevo.')
    } finally {
        setLoading(false)
    }
    }

  return (
    <section className="contact" id="contact">
      <div className="container">
        <div className="section__header">
          <h2 className="contact__title">Contacto</h2>
        </div>

        <div className="contact__layout">
          <form className="contact__form" onSubmit={handleSubmit}>
            <input
              name="name"
              placeholder="Nombre"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder="Mensaje"
              rows={5}
              value={form.message}
              onChange={handleChange}
              required
            />
            {error && <p className="contact__error">{error}</p>}
            {sent  && <p className="contact__success">¡Mensaje enviado!</p>}
            <button type="submit" disabled={loading}>
              {loading ? 'Enviando...' : 'Enviar'}
            </button>
          </form>

          <div className="contact__social">
            {SOCIAL.map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="contact__social-link">
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}