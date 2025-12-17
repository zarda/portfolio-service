import { render, screen } from '@testing-library/react'
import About from '../About'

describe('About', () => {
  it('renders summary content and stats', () => {
    render(<About />)

    expect(screen.getByRole('heading', { name: /about me/i })).toBeInTheDocument()
    expect(screen.getByText(/software engineer with a phd/i)).toBeInTheDocument()
    expect(screen.getByText('8+')).toBeInTheDocument()
    expect(screen.getByText(/physics, nsysu/i)).toBeInTheDocument()
  })

  it('links to contact section and external profile', () => {
    render(<About />)

    expect(screen.getByRole('link', { name: /let's talk/i })).toHaveAttribute('href', '#contact')
    const leetCodeLink = screen.getByRole('link', { name: /leetcode solved/i })
    expect(leetCodeLink).toHaveAttribute('href', 'https://leetcode.com/u/hengtai/')
    expect(leetCodeLink).toHaveAttribute('target', '_blank')
  })
})


