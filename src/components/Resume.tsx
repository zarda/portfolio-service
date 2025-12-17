import { motion } from 'framer-motion'


const RESUME_URL = '/Hengtai-Jan-Resume.pdf'
const RESUME_DOC_URL =
  'https://docs.google.com/document/d/1Uv5L5WsZnbN6Yvo0dMRxeLxhBkDI-HlQw441QdN0Bgs/edit?usp=sharing'
const LINKEDIN_URL = 'https://linkedin.com/in/hengtai-jan-188793b8/'

function ResumeActions() {
  return (
    <div className="flex flex-wrap gap-md justify-center mb-md">
      <a href={RESUME_URL} className="btn btn-primary" download>
        Download Resume (PDF)
      </a>
      <a href={LINKEDIN_URL} className="btn btn-outline" target="_blank" rel="noopener noreferrer">
        View LinkedIn Profile
      </a>
      <a
        href={RESUME_DOC_URL}
        className="btn btn-outline"
        target="_blank"
        rel="noopener noreferrer"
      >
        View Live Google Docs Version
      </a>
    </div>
  )
}

function Resume() {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.6 }
  }

  return (
    <section className="resume section" id="resume">
      <div className="container">
        <motion.h2 className="section-title" {...fadeInUp}>Resume</motion.h2>
        <motion.div
          className="resume__content text-center mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="resume__summary flex-col gap-md text-light mb-xl">
            <p>
              Download my full resume for a detailed view of my experience at Google Nest, Academia
              Sinica, and other roles, including work on smart home tools, astronomical
              visualization, and large-scale control systems.
            </p>
            <p>
              The PDF includes project highlights, tech stack details, and a concise overview of my
              academic background and publications.
            </p>
          </div>
          <ResumeActions />
        </motion.div>
      </div>
    </section>
  )
}

export default Resume


