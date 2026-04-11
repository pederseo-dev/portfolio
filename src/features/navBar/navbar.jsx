// src/features/navbar/navbar.jsx
import { useState } from 'react'
import { useAuth } from '../../app/auth'
import LoginOverlay from '../admin/loginOverlay'
import './navbar.css'

export default function Navbar() {
  const { user, logout } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)
  const [showLogin, setShowLogin] = useState(false)

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
          {user
            ? <button onClick={() => { logout(); setMenuOpen(false) }}>Cerrar sesión</button>
            : <button onClick={() => { setShowLogin(true); setMenuOpen(false) }}>Iniciar sesión</button>
          }
        </div>
      )}

      {showLogin && (
        <LoginOverlay onSuccess={() => setShowLogin(false)} onClose={() => setShowLogin(false)} />
      )}
    </>
  )
}