import { useState } from 'react'
import './App.css'

const projects = [
  {
    id: '1',
    title: 'Roomtastic',
    imageSrc: '/images/roomtastic.png',
    frontDescription:
      'A 3D interior design application where users can turn furniture links into interactive 3D models and place them in a live room.',
    technologies: ['Next.js', 'FastAPI', 'PostgreSQL', 'Three.js', 'LangChain', 'Python'],
  },
  {
    id: '2',
    title: 'Sk8tr',
    imageSrc: '/images/sk8tr.png',
    frontDescription:
      'An AI-powered web app that analyzes real skating footage to detect jumps and instantly generates animated performances for any Olympic skater.',
    technologies: ['Typescript', 'Python', 'React', 'Next.js', 'FastAPI'],
  },
  {
    id: '3',
    title: 'QuickCart',
    imageSrc: '../images/quickcart.png',
    frontDescription:
      'A mobile app that uses computer vision to track grocery items in real time and streamlines checkout with Firebase syncing and Stripe payments.',
    technologies: ['React Native', 'Typescript', 'Python', 'Firebase'],
  },
]

function ProjectCard({ title, imageSrc, frontDescription, technologies = [] }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const maxTilt = 10

  const handlePointerMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    const rotateY = (x - 0.5) * maxTilt * 2
    const rotateX = (0.5 - y) * maxTilt * 2
    setTilt({ x: rotateX, y: rotateY })
  }

  const resetTilt = () => {
    setTilt({ x: 0, y: 0 })
  }

  return (
    <div
      className="project-card-root"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
      onBlur={resetTilt}
    >
      <div
        className="project-card-inner"
        style={{ '--tilt-x': `${tilt.x}deg`, '--tilt-y': `${tilt.y}deg` }}
      >
        <img src={imageSrc} alt={`${title} project preview`} loading="lazy" className="project-card-image" />
        <div className="project-card-content">
          <h2 className="project-card-title">{title}</h2>
          <p className="project-card-text">{frontDescription}</p>
          <div className="project-card-tech">
            <span className="project-card-tech-label">Technologies:</span>
            <span className="project-card-tech-list">{technologies.join(' • ')}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function Projects() {
  return (
    <div id="projects" className="projects">
      <h1>Projects</h1>
      <p>
        These are some of the latest projects I&apos;ve worked on. You can find more on my{' '}
        <a href="https://github.com/sylviax28" target="_blank" rel="noopener noreferrer">Github</a>!
      </p>
      <div className="projects-grid">
        {projects.map((p) => (
          <ProjectCard
            key={p.id}
            title={p.title}
            imageSrc={p.imageSrc}
            frontDescription={p.frontDescription}
            technologies={p.technologies}
          />
        ))}
      </div>
    </div>
  )
}

export default Projects
