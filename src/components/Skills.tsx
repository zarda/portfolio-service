import { motion } from 'framer-motion'
import { PortfolioService } from '@/features/portfolio/services/PortfolioService'
import { AnimationPresets } from '@/shared/animations/presets'
import { Skill as SkillModel, SkillCategory as SkillCategoryModel } from '@/features/portfolio/models'

interface SkillProps {
  name: string
  level: number
}

function SkillItem({ name, level }: SkillProps) {
  return (
    <div className="skill">
      <div className="skill__header flex-between mb-sm">
        <span className="skill__name fw-medium">{name}</span>
        <span className="skill__percentage text-sm text-light fw-medium">{level}%</span>
      </div>
      <div className="skill__bar rounded-full">
        <div className="skill__progress rounded-full" style={{ width: `${level}%` }}></div>
      </div>
    </div>
  )
}

interface SkillCategoryProps {
  category: SkillCategoryModel
}

function SkillCategoryCard({ category }: SkillCategoryProps) {
  return (
    <div className="skills__category hover-lift rounded-lg">
      <h3 className="skills__category-title text-gradient fw-semibold text-xl mb-lg">
        {category.category}
      </h3>
      <div className="skills__list flex-col gap-md">
        {category.skills.map((skill: SkillModel) => (
          <SkillItem key={skill.name} name={skill.name} level={skill.level} />
        ))}
      </div>
    </div>
  )
}

function Skills() {
  const service = PortfolioService.getInstance()
  const skillCategories = service.getSkillCategories()

  return (
    <section className="skills section" id="skills">
      <div className="container">
        <motion.h2 className="section-title" {...AnimationPresets.fadeInUp()}>Skills & Technologies</motion.h2>
        <motion.div
          className="skills__grid grid-3 gap-lg"
          {...AnimationPresets.fadeInUp(0.2)}
        >
          {skillCategories.map((category) => (
            <SkillCategoryCard
              key={category.category}
              category={category}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Skills
