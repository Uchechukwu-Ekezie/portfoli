'use client'

import { useState } from 'react'
import { Mail, MapPin, Phone, Github, Twitter, Linkedin, CheckCircle, AlertCircle } from "lucide-react"

export default function Contact() {
  const [formData, setFormData] = useState({
    from_name: '',
    from_email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [statusMessage, setStatusMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault()
    
    // Basic validation
    if (!formData.from_name || !formData.from_email || !formData.subject || !formData.message) {
      setSubmitStatus('error')
      setStatusMessage('Please fill in all required fields.')
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok && result.success) {
        setSubmitStatus('success')
        setStatusMessage('Thank you! Your message has been sent successfully.')
        setFormData({ from_name: '', from_email: '', subject: '', message: '' }) // Reset form
      } else {
        setSubmitStatus('error')
        setStatusMessage(result.message || 'Failed to send message. Please try again or email directly.')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
      setStatusMessage('Failed to send message. Please try again or email directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen pt-24 text-white bg-black">
      <div className="max-w-4xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-yellow-400">Contact Me</h1>
          <p className="text-lg text-gray-300">
            Let&apos;s discuss computational biology, research collaborations, or potential opportunities.
          </p>
          <div className="w-24 h-1 mx-auto mt-6 bg-yellow-400"></div>
        </div>

        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="mb-6 text-2xl font-bold text-yellow-400">Get in Touch</h2>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Mail className="text-yellow-400" size={24} />
                <div>
                  <p className="font-semibold">Email</p>
                  <a href="mailto:Oshiomah.oyageshio@gmail.com" className="text-gray-300 transition-colors hover:text-yellow-400">
                  Oshiomah.oyageshio@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <MapPin className="text-yellow-400" size={24} />
                <div>
                  <p className="font-semibold">Location</p>
                  <p className="text-gray-300">University of California Davis</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Phone className="text-yellow-400" size={24} />
                <div>
                  <p className="font-semibold">Phone</p>
                  <a href="tel:+14132739254" className="text-gray-300 transition-colors hover:text-yellow-400">
                    +1 (413) 273-9254
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="mb-4 text-xl font-bold text-yellow-400">Connect with Me</h3>
              <div className="flex gap-4">
                <a href="https://github.com/oshiomah1" className="text-yellow-400 transition-colors hover:text-white">
                  <Github size={28} />
                </a>
                <a href="#" className="text-yellow-400 transition-colors hover:text-white">
                  <Twitter size={28} />
                </a>
                <a href="https://www.linkedin.com/in/oshiomah/" className="text-yellow-400 transition-colors hover:text-white">
                  <Linkedin size={28} />
                </a>
              </div>
            </div>
          </div>

          <div>
            <h2 className="mb-6 text-2xl font-bold text-yellow-400">Send a Message</h2>

            {/* Status Messages */}
            {submitStatus === 'success' && (
              <div className="flex items-center gap-3 p-4 mb-6 bg-green-900 border border-green-600 rounded-md">
                <CheckCircle className="text-green-400" size={20} />
                <p className="text-green-300">{statusMessage}</p>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="flex items-center gap-3 p-4 mb-6 bg-red-900 border border-red-600 rounded-md">
                <AlertCircle className="text-red-400" size={20} />
                <p className="text-red-300">{statusMessage}</p>
              </div>
            )}

            <div className="space-y-6">
              <div>
                <label htmlFor="from_name" className="block mb-2 text-sm font-medium">
                  Name *
                </label>
                <input
                  type="text"
                  id="from_name"
                  value={formData.from_name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 transition-colors bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:border-yellow-400"
                  placeholder="Your Name"
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label htmlFor="from_email" className="block mb-2 text-sm font-medium">
                  Email *
                </label>
                <input
                  type="email"
                  id="from_email"
                  value={formData.from_email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 transition-colors bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:border-yellow-400"
                  placeholder="your.email@example.com"
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label htmlFor="subject" className="block mb-2 text-sm font-medium">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 transition-colors bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:border-yellow-400"
                  placeholder="Research Collaboration"
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label htmlFor="message" className="block mb-2 text-sm font-medium">
                  Message *
                </label>
                <textarea
                  id="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 transition-colors bg-gray-900 border border-gray-700 rounded-md resize-none focus:outline-none focus:border-yellow-400"
                  placeholder="Tell me about your project or research interests..."
                  disabled={isSubmitting}
                ></textarea>
              </div>

              <button
                onClick={(e) => handleSubmit(e)}
                disabled={isSubmitting}
                className="w-full px-6 py-3 font-medium text-black transition-colors bg-yellow-400 rounded-md hover:bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </div>

            {/* Fallback contact info */}
            <div className="p-4 mt-6 bg-gray-800 rounded-md">
              <p className="text-sm text-gray-400">
                Having trouble with the form? Email directly at{' '}
                <a href="mailto:oyageshio@ucdavis.edu" className="text-yellow-400 hover:text-yellow-300">
                Oshiomah.oyageshio@gmail.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}