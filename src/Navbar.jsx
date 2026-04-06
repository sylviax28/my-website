import './Navbar.css'

function Navbar() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className="navbar">
      <span className="navbar-logo" onClick={() => scrollTo('home')}>Sylvia Xu</span>
      <ul className="navbar-links">
        <li onClick={() => scrollTo('about')}>About</li>
        <li onClick={() => scrollTo('projects')}>Projects</li>
        <li onClick={() => scrollTo('contact')}>Contact</li>
      </ul>
    </nav>
  )
}

export default Navbar
