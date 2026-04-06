import './App.css'
import { useState } from 'react'

export default function ContactForm() {
  const [email, setEmail] = useState({ subject: '', body: '' })
  const [status, setStatus] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e) => {
    setEmail({ ...email, [e.target.name]: e.target.value })
    setStatus(null)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const mailto = `mailto:sylviay.xu@mail.utoronto.ca?subject=${encodeURIComponent(email.subject)}&body=${encodeURIComponent(email.body)}`
    window.location.href = mailto
    setEmail({ subject: '', body: '' })
    setStatus('success')
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="contact-form-to">
        <span className="contact-form-label">To</span>
        <span>sylviay.xu@mail.utoronto.ca</span>
      </div>
      <input
        type="text"
        name="subject"
        placeholder="Subject"
        value={email.subject}
        onChange={handleChange}
      />
      <textarea
        name="body"
        placeholder="Message"
        value={email.body}
        onChange={handleChange}
      />
      <button type="submit">Send</button>
    </form>
  )
}
