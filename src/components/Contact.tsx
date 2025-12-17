import { useState, ChangeEvent, FormEvent } from 'react'
import { motion } from 'framer-motion'
import { PortfolioService } from '@/features/portfolio/services/PortfolioService'
import { AnimationPresets } from '@/shared/animations/presets'
import { SocialPlatform } from '@/features/portfolio/models'

interface FormData {
  name: string
  email: string
  message: string
}

const socialIcons: Record<SocialPlatform, JSX.Element> = {
  github: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  ),
  whatsapp: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2.003c-5.51 0-9.98 4.468-9.98 9.98 0 1.76.46 3.46 1.34 4.97L2 22l5.2-1.37c1.45.79 3.08 1.21 4.84 1.21h.01c5.51 0 9.98-4.47 9.98-9.98 0-2.67-1.04-5.18-2.93-7.06-1.9-1.89-4.41-2.93-7.06-2.93zm0 1.8c2.1 0 4.07.82 5.56 2.3 1.49 1.49 2.31 3.46 2.31 5.56 0 4.34-3.54 7.88-7.9 7.88-1.52 0-2.99-.43-4.27-1.25l-.31-.19-3.08.81.82-3.01-.2-.31c-.84-1.32-1.28-2.86-1.28-4.45 0-4.34 3.53-7.88 7.85-7.88zm-3.17 3.3c-.14 0-.36.05-.55.24-.18.19-.72.7-.72 1.7 0 1 .74 1.96.84 2.09.1.14 1.45 2.3 3.53 3.22 1.74.77 2.09.7 2.47.66.38-.04 1.21-.49 1.38-.96.17-.47.17-.87.12-.96-.05-.09-.19-.14-.4-.24-.21-.1-1.21-.6-1.4-.66-.19-.07-.33-.1-.47.1-.14.19-.54.66-.66.8-.12.14-.24.16-.45.07-.21-.09-.88-.32-1.68-1.02-.62-.55-1.03-1.24-1.15-1.45-.12-.21-.01-.32.08-.41.08-.08.21-.24.31-.36.1-.12.14-.19.21-.33.07-.14.04-.26-.02-.36-.07-.1-.61-1.44-.84-1.97-.22-.53-.44-.46-.6-.47z" />
    </svg>
  ),
  linkedin: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  ),
  scholar: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 24a7 7 0 1 1 0-14 7 7 0 0 1 0 14zm0-24C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
    </svg>
  ),
  email: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  ),
}

function Contact() {
  const service = PortfolioService.getInstance()
  const contactInfo = service.getContactInfo()

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  })
  const [status, setStatus] = useState('')

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    const subject = encodeURIComponent(`New message from ${formData.name}`)
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`,
    )

    window.location.href = `mailto:${contactInfo.email}?subject=${subject}&body=${body}`

    setStatus('Opening your email client to send the message...')
    setFormData({ name: '', email: '', message: '' })
    setTimeout(() => setStatus(''), 5000)
  }

  return (
    <section className="contact section" id="contact">
      <div className="container">
        <motion.h2 className="section-title" {...AnimationPresets.fadeInUp()}>Get In Touch</motion.h2>
        <div className="contact__content grid-2 gap-xl">
          <div className="contact__info">
            <h3 className="text-xl fw-semibold mb-md">Let's talk about your project</h3>
            <p className="text-muted mb-xl" style={{ lineHeight: 1.8 }}>
              I'm always open to discussing new projects, creative ideas, or
              opportunities to be part of your visions.
            </p>
            <div className="flex-col gap-lg mb-xl">
              <div className="info-card">
                <div className="icon-box" aria-hidden="true">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div>
                  <span className="text-sm text-muted mb-xs" style={{ display: 'block' }}>Email</span>
                  <a href={`mailto:${contactInfo.email}`} className="fw-medium hover:text-primary">
                    {contactInfo.email}
                  </a>
                </div>
              </div>
              <div className="info-card">
                <div className="icon-box" aria-hidden="true">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <span className="text-sm text-muted mb-xs" style={{ display: 'block' }}>Location</span>
                  <span className="fw-medium">{contactInfo.location}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-md">
              {contactInfo.socialLinks.map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  className="social-icon hover-glow"
                  aria-label={link.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {socialIcons[link.platform]}
                </a>
              ))}
            </div>
          </div>
          <form className="card rounded-lg shadow-md" style={{ padding: 'var(--space-xl)' }} onSubmit={handleSubmit}>
            <h4 className="text-lg fw-semibold mb-lg text-gradient">Send a Message</h4>
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-input"
                placeholder="Your name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                placeholder="your.email@example.com"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message" className="form-label">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="form-input form-textarea"
                placeholder="Tell me about your project, ideas, or just say hello..."
                rows={6}
                required
              ></textarea>
              <span className="text-sm text-muted" style={{ display: 'block', marginTop: 'var(--space-xs)' }}>
                {formData.message.length > 0 ? `${formData.message.length} characters` : 'Share your thoughts'}
              </span>
            </div>
            {status && (
              <div className="flex gap-sm items-center mb-md text-success fw-medium">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                {status}
              </div>
            )}
            <button type="submit" className="btn btn-primary w-full">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact
