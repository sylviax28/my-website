function BackgroundBubbles() {
  const bubbles = [
    { size: 90, left: '6%', delay: '0s', duration: '18s' },
    { size: 52, left: '18%', delay: '-6s', duration: '14s' },
    { size: 120, left: '32%', delay: '-3s', duration: '20s' },
    { size: 64, left: '47%', delay: '-10s', duration: '16s' },
    { size: 44, left: '58%', delay: '-2s', duration: '13s' },
    { size: 84, left: '70%', delay: '-8s', duration: '19s' },
    { size: 56, left: '82%', delay: '-4s', duration: '15s' },
    { size: 100, left: '92%', delay: '-12s', duration: '22s' },
  ]

  return (
    <div className="background-bubbles" aria-hidden="true">
      {bubbles.map((bubble, index) => (
        <span
          key={`${bubble.left}-${index}`}
          className="background-bubble"
          style={{
            '--bubble-size': `${bubble.size}px`,
            '--bubble-left': bubble.left,
            '--bubble-delay': bubble.delay,
            '--bubble-duration': bubble.duration,
          }}
        />
      ))}
    </div>
  )
}

export default BackgroundBubbles
