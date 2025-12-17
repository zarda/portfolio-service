import { render, screen } from '@testing-library/react'
import Resume from '../Resume'

describe('Resume', () => {
  it('renders resume actions with expected destinations', () => {
    render(<Resume />)

    expect(screen.getByRole('heading', { name: /resume/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /download resume/i })).toHaveAttribute(
      'href',
      '/Hengtai-Jan-Resume.pdf',
    )
    expect(screen.getByRole('link', { name: /view linkedin profile/i })).toHaveAttribute(
      'href',
      'https://linkedin.com/in/hengtai-jan-188793b8/',
    )
    expect(screen.getByRole('link', { name: /google docs version/i })).toHaveAttribute(
      'href',
      'https://docs.google.com/document/d/1Uv5L5WsZnbN6Yvo0dMRxeLxhBkDI-HlQw441QdN0Bgs/edit?usp=sharing',
    )
  })
})


