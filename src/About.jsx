import { useState, useMemo, useRef, useEffect, useCallback } from 'react'
import './App.css'

const photos = [
  '/images/ttc.JPG',
  '/images/distillery.JPG',
  '/images/birthday.JPG',
  '/images/cafe.JPG',
]

const galleryPhotos = [
  '/images/eataly.jpg',
  '/images/katsu.jpg',
  '/images/lightcafe.jpg',
  '/images/matcha.jpg',
  '/images/bigway.jpg',
  '/images/mollytea.jpg',
  '/images/strawberries.jpg',
  '/images/wooju.jpg',
  '/images/tacos.jpg',
]

function rand01(n) {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453
  return x - Math.floor(x)
}

const SWIPE_THRESHOLD = 72
const STACK_DEPTH = 4

function About() {
  const [photoIndex, setPhotoIndex] = useState(0)
  const [galleryIndex, setGalleryIndex] = useState(0)
  const [dragDeltaX, setDragDeltaX] = useState(0)
  const [dragDeltaY, setDragDeltaY] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const dragStartRef = useRef({ x: 0, y: 0 })
  const dragRef = useRef({ x: 0, y: 0 })
  const dragRafRef = useRef(null)

  const cardLayout = useMemo(
    () =>
      galleryPhotos.map((_, i) => ({
        tx: (rand01(i * 17 + 2) - 0.5) * 32,
        ty: (rand01(i * 17 + 3) - 0.5) * 28,
        rot: (rand01(i * 17 + 4) - 0.5) * 18,
      })),
    [],
  )

  const prev = () => setPhotoIndex((i) => (i - 1 + photos.length) % photos.length)
  const next = () => setPhotoIndex((i) => (i + 1) % photos.length)

  const advanceDeck = useCallback(() => {
    setGalleryIndex((i) => (i + 1) % galleryPhotos.length)
  }, [])

  const startDrag = useCallback((clientX, clientY) => {
    if (dragRafRef.current != null) {
      cancelAnimationFrame(dragRafRef.current)
      dragRafRef.current = null
    }
    setIsDragging(true)
    dragStartRef.current = { x: clientX, y: clientY }
    dragRef.current = { x: 0, y: 0 }
    setDragDeltaX(0)
    setDragDeltaY(0)
  }, [])

  const moveDrag = useCallback((clientX, clientY) => {
    if (!isDragging) return
    const dx = clientX - dragStartRef.current.x
    const dy = clientY - dragStartRef.current.y
    dragRef.current = { x: dx, y: dy }
    if (dragRafRef.current != null) return
    dragRafRef.current = requestAnimationFrame(() => {
      dragRafRef.current = null
      const { x, y } = dragRef.current
      setDragDeltaX(x)
      setDragDeltaY(y)
    })
  }, [isDragging])

  const flushDragFrame = useCallback(() => {
    if (dragRafRef.current != null) {
      cancelAnimationFrame(dragRafRef.current)
      dragRafRef.current = null
    }
    const { x, y } = dragRef.current
    setDragDeltaX(x)
    setDragDeltaY(y)
  }, [])

  const endDrag = useCallback(() => {
    if (!isDragging) return
    flushDragFrame()
    setIsDragging(false)

    const { x: dx, y: dy } = dragRef.current
    const ax = Math.abs(dx)
    const ay = Math.abs(dy)
    if (ax < SWIPE_THRESHOLD && ay < SWIPE_THRESHOLD) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          dragRef.current = { x: 0, y: 0 }
          setDragDeltaX(0)
          setDragDeltaY(0)
        })
      })
      return
    }

    dragRef.current = { x: 0, y: 0 }
    setDragDeltaX(0)
    setDragDeltaY(0)
    advanceDeck()
  }, [isDragging, advanceDeck, flushDragFrame])

  useEffect(() => {
    if (!isDragging) return
    const onMove = (e) => {
      if (e.touches?.length) {
        e.preventDefault()
        moveDrag(e.touches[0].clientX, e.touches[0].clientY)
      } else {
        moveDrag(e.clientX, e.clientY)
      }
    }
    const onUp = () => endDrag()
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    window.addEventListener('touchmove', onMove, { passive: false })
    window.addEventListener('touchend', onUp)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
      window.removeEventListener('touchmove', onMove)
      window.removeEventListener('touchend', onUp)
    }
  }, [isDragging, moveDrag, endDrag])

  useEffect(
    () => () => {
      if (dragRafRef.current != null) cancelAnimationFrame(dragRafRef.current)
    },
    [],
  )

  const handlePointerDown = (e) => {
    if (e.touches?.length) {
      startDrag(e.touches[0].clientX, e.touches[0].clientY)
    } else {
      startDrag(e.clientX, e.clientY)
    }
  }

  return (
    <div id="about" className="about">
      <div className="about-main">
        <div className="about-text">
          <h1>About Me</h1>
          <p>Hi! My name is Sylvia and I'm currently a 2nd year Computer Science student at the University of Toronto, specializing in software engineering with a minor in statistics.
            I'm passionate about building products that have a positive, tangible impact on the people around me. I'm currently interning at Alida Inc as a Software Developer, and am always open to new opportunties to create change!</p>
          <p>I also have 3 dogs named Flash, Whiskey, and Bailey, who are my pride and joy. If I were to ever get another pet, I'd get a sausage dog. and maybe also a ferret.</p>
        </div>
        <div className="digicam-wrapper">
          <p className="digicam-hint">Click on the camera's arrow buttons to see some pics!</p>
          <img className="digicam-body" src="/images/digicam.png" alt="Camera" />
          <div className="digicam-screen">
            <img className="digicam-photo" src={photos[photoIndex]} alt="Gallery" />
          </div>
          <button className="digicam-btn digicam-left" onClick={prev} aria-label="Previous photo">&lsaquo;</button>
          <button className="digicam-btn digicam-right" onClick={next} aria-label="Next photo">&rsaquo;</button>
        </div>
      </div>

      <div className="photo-deck-section">
        <div className="photo-deck-row">
          <div className="photo-deck-column">
            <div className="photo-deck">
              <div className="photo-stack-window">
                <div className="photo-stack">
                  {Array.from({ length: Math.min(STACK_DEPTH, galleryPhotos.length) }, (_, d) => {
                    const idx = (galleryIndex + d) % galleryPhotos.length
                    const src = galleryPhotos[idx]
                    const L = cardLayout[idx]
                    const nudge = d * 11
                    const isTop = d === 0

                    let extraX = 0
                    let extraY = 0
                    let extraRot = 0
                    if (isTop) {
                      const tilt = dragDeltaX * 0.065
                      extraX = dragDeltaX
                      extraY = dragDeltaY
                      extraRot = tilt
                    }

                    const transform = `translate(-50%, -50%) translate(${L.tx + nudge + extraX}px, ${L.ty + nudge * 1.05 + extraY}px) rotate(${L.rot + extraRot + d * 1.4}deg)`

                    return (
                      <div
                        key={`${galleryIndex}-${d}-${src}`}
                        className={`photo-stack-card${isTop ? ' photo-stack-card--front' : ''}${isTop && isDragging ? ' photo-stack-card--dragging' : ''}`}
                        style={{
                          zIndex: 20 - d,
                          transform,
                        }}
                        onMouseDown={isTop ? handlePointerDown : undefined}
                        onTouchStart={isTop ? handlePointerDown : undefined}
                      >
                        <img src={src} alt="" draggable={false} />
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
            <p className="photo-deck-hint">Swipe to see some recent eats!</p>
          </div>
          <div className="photo-deck-aside">
            <p>
              In my free time, I love going downtown to cafes to try new drinks and desserts or go thrifting! I love exploring the city and always am down something new. My eventual goal is be able to navigate downtown without google maps.
              I've also been wanting to get myself a Switch so I can play Persona 5 or Tomadochi Life for a little while now..
            </p>
            <p>
              Each time I go downtown, I love trying a new restaurant or cafe! Sometimes I like to visit popular ones on tiktok but othertimes, I enjoy accidentally stumbling upon a new one. My favourite's though, have to be Bigway and Coco. I also really enjoy matcha and am thinking of buying myself some matcha powder to start making some myself..
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
