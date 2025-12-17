import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Header from '../Header'

describe('Header', () => {
  it('renders navigation links', () => {
    render(<Header />)

    ;['About', 'Skills', 'Projects', 'Resume', 'Contact'].forEach((label) => {
      expect(screen.getByRole('link', { name: label })).toBeInTheDocument()
    })
  })

  it('toggles the mobile menu button state', async () => {
    const user = userEvent.setup()
    render(<Header />)

    const toggleButton = screen.getByLabelText(/navigation menu/i)
    await user.click(toggleButton)
    expect(toggleButton).toHaveAttribute('aria-label', 'Close navigation menu')
    expect(toggleButton).toHaveAttribute('aria-expanded', 'true')

    await user.click(toggleButton)
    expect(toggleButton).toHaveAttribute('aria-label', 'Open navigation menu')
    expect(toggleButton).toHaveAttribute('aria-expanded', 'false')
  })

  it('closes the mobile menu when a nav link is clicked', async () => {
    const user = userEvent.setup()
    render(<Header />)

    const toggleButton = screen.getByLabelText(/navigation menu/i)
    await user.click(toggleButton)
    expect(toggleButton).toHaveAttribute('aria-expanded', 'true')

    const aboutLink = screen.getByRole('link', { name: 'About' })
    await user.click(aboutLink)

    expect(toggleButton).toHaveAttribute('aria-expanded', 'false')
  })

  it('applies scrolled class when the page is offset', () => {
    render(<Header />)

    Object.defineProperty(window, 'scrollY', { value: 120, writable: true })
    fireEvent.scroll(window)

    expect(screen.getByRole('banner')).toHaveClass('header--scrolled')
  })
})


