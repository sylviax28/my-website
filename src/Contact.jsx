import { useEffect, useRef, useState } from 'react'
import ContactForm from './contactform'

function Contact() {
  const eyesRef = useRef(null)
  const [pupilOffset, setPupilOffset] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!eyesRef.current) return
      const rect = eyesRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const dx = e.clientX - centerX
      const dy = e.clientY - centerY
      const distance = Math.hypot(dx, dy) || 1
      const maxMove = 7
      const scale = Math.min(maxMove / distance, 1)
      setPupilOffset({ x: dx * scale, y: dy * scale })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div id="contact" className="contact">
      <h1 className="contact-title">let's connect!</h1>
      <div className="contact-eyes" ref={eyesRef} aria-hidden="true">
        <div className="contact-eye">
          <span
            className="contact-pupil"
            style={{ transform: `translate(${pupilOffset.x}px, ${pupilOffset.y}px)` }}
          />
        </div>
        <div className="contact-eye">
          <span
            className="contact-pupil"
            style={{ transform: `translate(${pupilOffset.x}px, ${pupilOffset.y}px)` }}
          />
        </div>
      </div>
      <ContactForm />
      <div className="contact-icons">
        <a href="https://www.linkedin.com/in/sylviax28/" target="_blank" rel="noopener noreferrer" className="contact-link" aria-label="LinkedIn">
          <img src="/images/linkedinlogo.webp" alt="LinkedIn" className="social-icon social-icon-linkedin" />
        </a>
        <a href="https://github.com/sylviax28" target="_blank" rel="noopener noreferrer" className="contact-link" aria-label="GitHub">
          <img src="/images/githubicon.png" alt="GitHub" className="social-icon social-icon-github" />
        </a>
      </div>
    </div>
  )
}

export default Contact
