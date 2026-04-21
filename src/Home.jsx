import { useEffect, useState, useRef } from 'react'

import gsap from 'gsap'
import './App.css'
import SylviaXuSignature from './components/SylviaXuSignature'

const typewriterTexts = [
  'Computer Science student @ UofT',
  'Software Developer Intern @ Alida Inc',
  'Partnerships Director @ GDG',
  'Developer + Event Coordinator @ WiCSM',
]

function Home() {
  const [animateSvg, setAnimateSvg] = useState(false)
  const [displayText, setDisplayText] = useState('')
  const [showCursor, setShowCursor] = useState(false)
  const [poppedBubbles, setPoppedBubbles] = useState({})
  const typewriterStarted = useRef(false)
  const bubbles = [
    { id: 1, className: 'home-bubble-1' },
    { id: 2, className: 'home-bubble-2' },
    { id: 3, className: 'home-bubble-3' },
    { id: 4, className: 'home-bubble-4' },
    { id: 5, className: 'home-bubble-5' },
    { id: 6, className: 'home-bubble-6' },
    { id: 7, className: 'home-bubble-7' },
    { id: 8, className: 'home-bubble-8' },
  ]

  useEffect(() => {
    const tl = gsap.timeline();
    tl.to('.introp1', { opacity: 1, duration: 1.5 })
    tl.to('.introp2', { opacity: 1, x: 0, duration: 0.5 }, '-=0.3')
    tl.add(() => setAnimateSvg(true))
    tl.to('.signature', { opacity: 1, duration: 0.3 })
    tl.add(() => {
      if (!typewriterStarted.current) {
        typewriterStarted.current = true
        setShowCursor(true)
        startTypewriter()
      }
    }, '+=3.5')
    tl.to('.about-me-button', { opacity: 1, duration: 0.8 }, '<')
    tl.to('.scroll-down-indicator', { opacity: 1, duration: 0.8 }, '<')
  }, [])

  function startTypewriter() {
    let textIndex = 0
    let charIndex = 0
    let deleting = false

    function tick() {
      const current = typewriterTexts[textIndex]

      if (!deleting) {
        setDisplayText(current.slice(0, charIndex + 1))
        charIndex++
        if (charIndex === current.length) {
          setTimeout(() => { deleting = true; tick() }, 1500)
          return
        }
        setTimeout(tick, 80)
      } else {
        setDisplayText(current.slice(0, charIndex))
        charIndex--
        if (charIndex < 0) {
          deleting = false
          charIndex = 0
          textIndex = (textIndex + 1) % typewriterTexts.length
          setTimeout(tick, 400)
          return
        }
        setTimeout(tick, 20)
      }
    }

    tick()
  }

  const popBubble = (id) => {
    if (poppedBubbles[id]) return
    setPoppedBubbles((prev) => ({ ...prev, [id]: true }))
    window.setTimeout(() => {
      setPoppedBubbles((prev) => ({ ...prev, [id]: false }))
    }, 700)
  }

  return (
    <div id="home" className="home">
      <div className="home-bubbles" aria-hidden="true">
        {bubbles.map((bubble) => (
          <span
            key={bubble.id}
            className={`home-bubble ${bubble.className}${poppedBubbles[bubble.id] ? ' is-popped' : ''}`}
            onClick={() => popBubble(bubble.id)}
          />
        ))}
      </div>
      <div className="intro-row">
        <p className="introp1">hi,</p>
        <p className="introp2">my name is</p>
      </div>
      <SylviaXuSignature animate={animateSvg} />
      <p className="typewriter-text">{displayText}{showCursor && <span className="cursor">|</span>}</p>
      <button className="about-me-button" onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}>About Me</button>
      <button
        className="scroll-down-indicator"
        onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}
        aria-label="Scroll down to About section"
      >
        <span className="scroll-down-line" />
        <span className="scroll-down-arrow">↓</span>
      </button>
    </div>
  )
}

export default Home
