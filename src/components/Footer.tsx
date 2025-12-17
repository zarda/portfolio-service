

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__content flex-between flex-wrap gap-lg">
          <a href="#" className="footer__logo text-gradient fw-bold text-2xl">
            Portfolio
          </a>
          <nav className="footer__nav flex flex-wrap gap-lg">
            <a href="#about">About</a>
            <a href="#skills">Skills</a>
            <a href="#projects">Projects</a>
            <a href="#resume">Resume</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
        <div className="footer__bottom flex-between flex-wrap gap-sm">
          <p className="text-sm text-muted">
            &copy; {currentYear} Hengtai Jan. All rights reserved.
          </p>
          <p className="footer__credit text-sm text-muted">
            Built with React & Vite
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
