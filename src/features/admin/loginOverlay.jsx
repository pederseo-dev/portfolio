import { useState } from 'react'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { auth } from '../../app/fireBase'
import './admin.css'

const provider = new GoogleAuthProvider()

export default function LoginOverlay({ onSuccess, onClose }) {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  async function handleLogin() {
    setLoading(true)
    setError(null)
    try {
      await signInWithPopup(auth, provider)
      onSuccess()
    } catch (e) {
      setError('Error al iniciar sesión')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="overlay" onClick={onClose}>
      <div className="overlay__box" onClick={e => e.stopPropagation()}>
        <button className="overlay__close" onClick={onClose}>✕</button>
        <h2>Acceso</h2>
        {error && <p className="overlay__error">{error}</p>}
        <button className="overlay__submit" onClick={handleLogin} disabled={loading}>
          {loading ? 'Entrando...' : 'Continuar con Google'}
        </button>
      </div>
    </div>
  )
}