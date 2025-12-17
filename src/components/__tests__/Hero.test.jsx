import { render, screen } from '@testing-library/react'
import Hero from '../Hero'

describe('Hero', () => {
  it('shows primary introduction content', () => {
    render(<Hero />)

    expect(
      screen.getByRole('heading', { level: 1, name: /hengtai jan/i }),
    ).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 2, name: /software engineer/i })).toBeInTheDocument()
    expect(screen.getByText(/exceptional web applications/i)).toBeInTheDocument()
    expect(screen.getByRole('img', { name: /hengtai jan/i })).toBeInTheDocument()
  })

  it('renders call-to-action links', () => {
    render(<Hero />)

    expect(screen.getByRole('link', { name: /view my work/i })).toHaveAttribute('href', '#projects')
    expect(screen.getByRole('link', { name: /get in touch/i })).toHaveAttribute('href', '#contact')
    expect(screen.getByText(/scroll down/i)).toBeInTheDocument()
  })
})


