import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import Footer from '../Footer'

describe('Footer', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it('shows the current year and navigation links', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2025-02-01T00:00:00Z'))

    render(<Footer />)

    expect(screen.getByText(/2025 hengtai jan/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /portfolio/i })).toHaveAttribute('href', '#')
    ;['About', 'Skills', 'Projects', 'Resume', 'Contact'].forEach((label) => {
      expect(screen.getByRole('link', { name: label })).toBeInTheDocument()
    })
  })
})


