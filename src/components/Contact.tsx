import { useState, ChangeEvent, FormEvent } from 'react'
import { motion } from 'framer-motion'
import { PortfolioService } from '@/features/portfolio/services/PortfolioService'
import { AnimationPresets } from '@/shared/animations/presets'
import { SocialIcon } from '@/shared/components/SocialIcon'

interface FormData {
  name: string
  email: string
  message: string
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
                  <SocialIcon platform={link.platform} customIcon={link.customIcon} size={24} />
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
