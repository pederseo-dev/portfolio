import { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../app/fireBase'
import './projects.css'

function ProjectCard({ project }) {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)

  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect()
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  return (
    <a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className={`project-card ${project.image ? 'project-card--has-image' : ''}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {project.image && hovered && (
        <div className="project-card__preview" style={{ top: pos.y + 16, left: pos.x + 16 }}>
          <img src={project.image} alt={project.name} />
        </div>
      )}
      <div className="project-card__content">
        <div className="project-card__header">
          <div className="project-card__title">
            {project.logo && <img src={project.logo} alt="" className="project-card__logo" />}
            <h3 className="project-card__name">{project.name}</h3>
          </div>
          <span className={`project-card__status project-card__status--${project.status}`}>
            {project.status}
          </span>
        </div>
        <p className="project-card__description">{project.description}</p>
        <div className="project-card__footer">
          <span className="project-card__client">{project.client}</span>
          <div className="project-card__tags">
            {project.stack.map(tag => (
              <span key={tag} className="project-card__tag">{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </a>
  )
}

function Projects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetch() {
      const snapshot = await getDocs(collection(db, 'portfolio-projects'))
      const data = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(p => p.active)
      setProjects(data)
      setLoading(false)
    }
    fetch()
  }, [])

  return (
    <section className="projects" id="projects">
      <h2 className="projects__title">Proyectos</h2>
      {loading
        ? <p style={{ textAlign: 'center', opacity: 0.5 }}>Cargando...</p>
        : <div className="projects__grid">
            {projects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
      }
    </section>
  )
}

export default Projects