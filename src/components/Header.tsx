import { useState, useEffect } from 'react'


interface HeaderProps {
  theme: string
  toggleTheme: () => void
}

function Header({ theme, toggleTheme }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' },
    { href: '#resume', label: 'Resume' },
    { href: '#contact', label: 'Contact' },
  ]

  const handleNavClick = () => {
    setIsMenuOpen(false)
  }

  return (
    <header className={`header glass ${isScrolled ? 'header--scrolled' : ''}`} role="banner">
      <div className="container flex-between h-full">
        <a href="#" className="header__logo text-gradient fw-bold text-2xl">
          Portfolio
        </a>

        <nav
          className={`header__nav ${isMenuOpen ? 'header__nav--open' : ''}`}
          aria-label="Primary"
        >
          <ul className="header__nav-list flex gap-xl">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="header__nav-link fw-medium"
                  onClick={handleNavClick}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header__actions flex gap-md items-center">
          <button
            className="theme-toggle rounded-full flex-center"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>

          <button
            type="button"
            className={`header__menu-btn ${isMenuOpen ? 'header__menu-btn--open' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMenuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
