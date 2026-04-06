import { useState } from 'react'
import { useAuth } from '../../app/auth'
import LoginOverlay from '../admin/loginOverlay'
import ProjectForm from '../admin/forms/projectsForm'
import ExperienceForm from '../admin/forms/experienceForm'
import './navbar.css'

export default function Navbar() {
  const { user, logout } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)
  const [overlay, setOverlay] = useState(null) // 'login' | 'project' | 'experience'
  const [pendingAction, setPendingAction] = useState(null)

  function handleAction(action) {
    console.log('handleAction', action, 'user:', user)
    setMenuOpen(false)
    if (!user) {
      setPendingAction(action)
      setOverlay('login')
    } else {
      setOverlay(action)
    }
  }

  function onLoginSuccess() {
    setOverlay(pendingAction)
    setPendingAction(null)
  }

  return (
    <>
      <nav className="navbar">
        <a href="#hero" className="navbar__logo">Olaf</a>
        <ul className="navbar__links">
          <li><a href="#about">Sobre mí</a></li>
          <li><a href="#experience">Experiencia</a></li>
          <li><a href="#projects">Proyectos</a></li>
          <li><a href="#contact">Contacto</a></li>
        </ul>
        <button className="navbar__hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? '✕' : '☰'}
        </button>
      </nav>

      {menuOpen && (
        <div className="navbar__menu">
          <button onClick={() => handleAction('project')}>+ Proyecto</button>
          <button onClick={() => handleAction('experience')}>+ Experiencia</button>
          {user && <button onClick={logout}>Cerrar sesión</button>}
        </div>
      )}

      {overlay === 'login' && (
        <LoginOverlay onSuccess={onLoginSuccess} onClose={() => setOverlay(null)} />
      )}
      {overlay === 'project' && (
        <ProjectForm onClose={() => setOverlay(null)} />
      )}
      {overlay === 'experience' && (
        <ExperienceForm onClose={() => setOverlay(null)} />
      )}
    </>
  )
}