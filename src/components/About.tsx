import { motion } from 'framer-motion'
import { PortfolioService } from '@/features/portfolio/services/PortfolioService'
import { AnimationPresets } from '@/shared/animations/presets'

function About() {
  const service = PortfolioService.getInstance()
  const profile = service.getProfile()

  return (
    <section className="about section" id="about">
      <div className="container">
        <motion.h2 className="section-title" {...AnimationPresets.fadeInUp()}>About Me</motion.h2>
        <div className="about__content grid-2 gap-xl items-center">
          <motion.div
            className="about__image"
            {...AnimationPresets.slideInLeft()}
          >
            <div className="about__image-wrapper rounded-lg shadow-lg hover-scale">
              <img
                src={profile.photoUrl}
                alt={profile.name}
                className="about__photo w-full"
              />
            </div>
          </motion.div>
          <motion.div
            className="about__text"
            {...AnimationPresets.slideInRight(0.2)}
          >
            {profile.aboutParagraphs.map((paragraph, index) => (
              <p key={index} className="about__description text-light mb-xl">
                {paragraph}
              </p>
            ))}
            <div className="about__stats flex gap-md justify-center">
              {profile.stats.map((stat) => (
                <div key={stat.label} className="about__stat hover-lift text-center rounded-lg">
                  {stat.link ? (
                    <a
                      href={stat.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="about__stat-link"
                    >
                      <span className="about__stat-number text-gradient fw-bold text-2xl mb-xs">{stat.value}</span>
                      <span className="about__stat-label text-light text-sm fw-medium">{stat.label}</span>
                    </a>
                  ) : (
                    <>
                      <span className="about__stat-number text-gradient fw-bold text-2xl mb-xs">{stat.value}</span>
                      <span className="about__stat-label text-light text-sm fw-medium">{stat.label}</span>
                    </>
                  )}
                </div>
              ))}
            </div>
            <div className="text-center">
              <a href="#contact" className="btn btn-primary mt-lg">
                Let's Talk
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About
