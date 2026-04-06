import { useState } from 'react'
import './App.css'

const projects = [
  {
    id: '1',
    title: 'sk8tr',
    imageSrc: 'https://picsum.photos/seed/portfolio1/640/480',
    frontDescription:
      'Short description of what you built, the stack you used, and what you learned. Swap this text and image for your real project.',
    backDescription:
      'Short description of what you built, the stack you used, and what you learned. Swap this text and image for your real project.',
  },
  {
    id: '2',
    title: 'Smart Air',
    imageSrc: 'https://picsum.photos/seed/portfolio2/640/480',
    frontDescription:
      'Short description of what you built, the stack you used, and what you learned. Swap this text and image for your real project.',
    backDescription:
      'Short description of what you built, the stack you used, and what you learned. Swap this text and image for your real project.',
  },
  {
    id: '3',
    title: 'Quick Cart',
    imageSrc: 'https://picsum.photos/seed/portfolio3/640/480',
    frontDescription:
      'Short description of what you built, the stack you used, and what you learned. Swap this text and image for your real project.',
    backDescription:
      'Short description of what you built, the stack you used, and what you learned. Swap this text and image for your real project.',
  },
]

function ProjectCard({ title, imageSrc, frontDescription, backDescription }) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div
      className="project-flip-root"
      role="button"
      tabIndex={0}
      aria-pressed={flipped}
      aria-label={`${title}. ${flipped ? 'Click to show cover image' : 'Click to read description'}`}
      onClick={() => setFlipped((f) => !f)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          setFlipped((f) => !f)
        }
      }}
    >
      <div className={`project-flip-inner ${flipped ? 'is-flipped' : ''}`}>
        <div className="project-face project-face-front">
          <p className="project-front-text">{frontDescription}</p>
          <img src={imageSrc} alt="" loading="lazy" />
          <span className="project-face-title">{title}</span>
        </div>
        <div className="project-face project-face-back">
          <h2 className="project-back-title">{title}</h2>
          <p className="project-back-text">{backDescription}</p>
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
        These are some of the latest projects I&apos;ve worked on. You can find more on my Github
      </p>
      <div className="projects-grid">
        {projects.map((p) => (
          <ProjectCard
            key={p.id}
            title={p.title}
            imageSrc={p.imageSrc}
            frontDescription={p.frontDescription}
            backDescription={p.backDescription}
          />
        ))}
      </div>
    </div>
  )
}

export default Projects
