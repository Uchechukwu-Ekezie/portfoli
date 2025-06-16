'use client'

import { useState } from 'react'
import { Mail, MapPin, Phone, Github, Twitter, Linkedin, CheckCircle, AlertCircle } from "lucide-react"
import emailjs from 'emailjs-com'


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

  // EmailJS Configuration - Replace with your actual values after setup
  const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
  const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID  // Replace with your Template ID
  const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY    // Replace with your Public Key


  console.log("firstname", EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PUBLIC_KEY)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    // Check if EmailJS configuration is available
    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      console.error('Missing EmailJS configuration')
      setSubmitStatus('error')
      setStatusMessage('Contact form is not properly configured. Please try again later or contact directly.')
      setIsSubmitting(false)
      return
    }

    try {
      // Send email using EmailJS
      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.from_name,
          from_email: formData.from_email,
          subject: formData.subject,
          message: formData.message,
          to_email: 'uchennahanson@gmail.com', // Your client's email
        },
        EMAILJS_PUBLIC_KEY
      )

      console.log('Email sent successfully:', result.text)
      setSubmitStatus('success')
      setStatusMessage('Thank you! Your message has been sent successfully.')
      setFormData({ from_name: '', from_email: '', subject: '', message: '' }) // Reset form

    } catch (error) {
      console.error('Email sending failed:', error)
      setSubmitStatus('error')
      setStatusMessage('Failed to send message. Please try again or email directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-yellow-400 mb-4">Contact Me</h1>
          <p className="text-gray-300 text-lg">
            Let&apos;s discuss computational biology, research collaborations, or potential opportunities.
          </p>
          <div className="w-24 h-1 bg-yellow-400 mx-auto mt-6"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-yellow-400 mb-6">Get in Touch</h2>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Mail className="text-yellow-400" size={24} />
                <div>
                  <p className="font-semibold">Email</p>
                  <a href="mailto:oyageshio@ucdavis.edu" className="text-gray-300 hover:text-yellow-400 transition-colors">
                    oyageshio@ucdavis.edu
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
                  <a href="tel:+14132739254" className="text-gray-300 hover:text-yellow-400 transition-colors">
                    +1 (413) 273-9254
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-bold text-yellow-400 mb-4">Connect with Me</h3>
              <div className="flex gap-4">
                <a href="https://github.com/oshiomah1" className="text-yellow-400 hover:text-white transition-colors">
                  <Github size={28} />
                </a>
                <a href="#" className="text-yellow-400 hover:text-white transition-colors">
                  <Twitter size={28} />
                </a>
                <a href="https://www.linkedin.com/in/oshiomah/" className="text-yellow-400 hover:text-white transition-colors">
                  <Linkedin size={28} />
                </a>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-yellow-400 mb-6">Send a Message</h2>

            {/* Status Messages */}
            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-900 border border-green-600 rounded-md flex items-center gap-3">
                <CheckCircle className="text-green-400" size={20} />
                <p className="text-green-300">{statusMessage}</p>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-900 border border-red-600 rounded-md flex items-center gap-3">
                <AlertCircle className="text-red-400" size={20} />
                <p className="text-red-300">{statusMessage}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="from_name" className="block text-sm font-medium mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="from_name"
                  value={formData.from_name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:border-yellow-400 transition-colors"
                  placeholder="Your Name"
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label htmlFor="from_email" className="block text-sm font-medium mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="from_email"
                  value={formData.from_email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:border-yellow-400 transition-colors"
                  placeholder="your.email@example.com"
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:border-yellow-400 transition-colors"
                  placeholder="Research Collaboration"
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:border-yellow-400 transition-colors resize-none"
                  placeholder="Tell me about your project or research interests..."
                  disabled={isSubmitting}
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-yellow-400 text-black py-3 px-6 rounded-md font-medium hover:bg-yellow-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>

            {/* Fallback contact info */}
            <div className="mt-6 p-4 bg-gray-800 rounded-md">
              <p className="text-sm text-gray-400">
                Having trouble with the form? Email directly at{' '}
                <a href="mailto:oyageshio@ucdavis.edu" className="text-yellow-400 hover:text-yellow-300">
                  oyageshio@ucdavis.edu
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}