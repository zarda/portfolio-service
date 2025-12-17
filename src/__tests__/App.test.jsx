import { render, screen } from '@testing-library/react'
import App from '../App'

describe('App', () => {
  it('renders every core section heading', () => {
    render(<App />)

    ;['About Me', 'Skills & Technologies', 'Featured Projects', 'Resume', 'Get In Touch'].forEach(
      (title) => {
        expect(screen.getByRole('heading', { level: 2, name: title })).toBeInTheDocument()
      },
    )
  })
})


