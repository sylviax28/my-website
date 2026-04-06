import ContactForm from './contactform'

function Contact() {
  return (
    <div id="contact" className="contact">
      <h1 className="contact-title">let's connect!</h1>
      <ContactForm />
      <div className="contact-icons">
        <a href="https://www.linkedin.com/in/sylviax28/" target="_blank" rel="noopener noreferrer" className="contact-link" aria-label="LinkedIn">
          <img src="/images/linkedinlogo.webp" alt="LinkedIn" />
        </a>
        <a href="https://github.com/sylviax28" target="_blank" rel="noopener noreferrer" className="contact-link" aria-label="GitHub">
          <img src="/images/githubicon.png" alt="GitHub" />
        </a>
      </div>
    </div>
  )
}

export default Contact
