import { render, screen } from '@testing-library/react'
import Skills from '../Skills'
import { PortfolioService } from '@/features/portfolio/services/PortfolioService'

describe('Skills', () => {
  it('renders every skill category and item', () => {
    render(<Skills />)

    const skillCategories = PortfolioService.getInstance().getSkillCategories()
    skillCategories.forEach((category) => {
      expect(screen.getByRole('heading', { level: 3, name: category.category })).toBeInTheDocument()
      category.skills.forEach((skill) => {
        expect(screen.getByText(skill.name)).toBeInTheDocument()
      })
    })
  })

  it('applies inline width based on skill level', () => {
    render(<Skills />)

    const angularElement = screen.getByText('Angular').closest('.skill')
    expect(angularElement).not.toBeNull()
    const progressBar = angularElement.querySelector('.skill__progress')
    expect(progressBar).toHaveStyle({ width: '90%' })
  })
})


