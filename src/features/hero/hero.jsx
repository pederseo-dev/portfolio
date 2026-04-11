// src/features/hero/hero.jsx
import './hero.css'

const dev = {
  name: 'Olaf Pedersen',
  role: 'Software Engineer',
  github: 'https://github.com/pederseo-dev',
  linkedIn: 'https://www.linkedin.com/in/olaf-pedersen-870a2b30b/',
  instagram: 'https://www.instagram.com/olaf.pedersen',
}

export default function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="container">

        {/* --- Fila 1: Presentación + Imagen principal --- */}
        <div className="hero__row">
          <div className="hero__intro">
            <p className="hero__greeting">Hola, soy</p>
            <h1 className="hero__name">{dev.name}</h1>
            <p className="hero__role">{dev.role}</p>
          </div>
          <div className="hero__image">
            <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80" alt="coding" />
          </div>
        </div>

        {/* --- Fila 2: Bio + Avatar --- */}
        <div className="hero__row">
          <div className="hero__bio">
            <p>
              Enfocado en construir aplicaciones escalables y fáciles de usar.
              Disfruto convertir problemas complejos en soluciones simples y significativas.
              Me apasiona el desarrollo tanto en frontend como en backend, siempre buscando
              la mejor experiencia para el usuario final.
            </p>
            <div className="hero__actions">
              <a href={dev.github} target="_blank" rel="noopener noreferrer">
                <button className="hero__btn hero__btn--primary">GitHub</button>
              </a>
              <a href={dev.linkedIn} target="_blank" rel="noopener noreferrer">
                <button className="hero__btn hero__btn--outline">LinkedIn</button>
              </a>
              <a href={dev.instagram} target="_blank" rel="noopener noreferrer">
                <button className="hero__btn hero__btn--outline">Instagram</button>
              </a>
            </div>
          </div>
          <div className="hero__avatar">
            <img src="https://avatars.githubusercontent.com/u/9919?v=4" alt={dev.name} />
          </div>
        </div>

      </div>
    </section>
  )
}