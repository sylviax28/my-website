import 'dotenv/config'
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import nodemailer from 'nodemailer'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = process.env.PORT || 3001

app.use(express.json())

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

app.get('/api/health', (req, res) => {
  res.json({ ok: true })
})

app.post('/api/send-email', async (req, res) => {
  const { from: senderEmail, subject, body } = req.body || {}
  const to = process.env.CONTACT_EMAIL || process.env.EMAIL_USER

  if (!senderEmail?.trim() || !subject?.trim() || !body?.trim()) {
    console.error('[send-email] Validation failed: email, subject, and message are required')
    return res.status(400).json({ ok: false, error: 'Something went wrong. Please try again.' })
  }
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error('[send-email] Email not configured. Add EMAIL_USER and EMAIL_PASS to .env (use a Gmail App Password for Gmail).')
    return res.status(500).json({ ok: false, error: 'Something went wrong. Please try again.' })
  }
  if (!to) {
    console.error('[send-email] CONTACT_EMAIL or EMAIL_USER not set in .env')
    return res.status(500).json({ ok: false, error: 'Something went wrong. Please try again.' })
  }

  try {
    const text = `Contact form submission — reply to this email to respond to the sender.\n\nFrom: ${senderEmail}\nSubject: ${subject}\n\n--- Message ---\n\n${body}`
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject: `[Portfolio] ${subject}`,
      text,
      replyTo: senderEmail,
    })
    res.json({ ok: true })
  } catch (err) {
    console.error('Send email error:', err)
    res.status(500).json({ ok: false, error: 'Something went wrong. Please try again.' })
  }
})

// In production, serve the built React app
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../dist')))
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'))
  })
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
