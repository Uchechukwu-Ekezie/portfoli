import { Mail, MapPin, Phone, Github, Twitter, Linkedin } from "lucide-react"

export default function Contact() {
  return (
    <div className="min-h-screen bg-black text-white pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-yellow-400 mb-4">Contact Me</h1>
          <p className="text-gray-300 text-lg">
            Let's discuss computational biology, research collaborations, or potential opportunities.
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
                  <a href="mailto:jacob@example.com" className="text-gray-300 hover:text-yellow-400 transition-colors">
                    jacob.westroberts@example.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <MapPin className="text-yellow-400" size={24} />
                <div>
                  <p className="font-semibold">Location</p>
                  <p className="text-gray-300">San Francisco Bay Area, CA</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Phone className="text-yellow-400" size={24} />
                <div>
                  <p className="font-semibold">Phone</p>
                  <a href="tel:+1234567890" className="text-gray-300 hover:text-yellow-400 transition-colors">
                    +1 (555) 123-4567
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-bold text-yellow-400 mb-4">Connect with Me</h3>
              <div className="flex gap-4">
                <a href="#" className="text-yellow-400 hover:text-yellow-500 transition-colors">
                  <Github size={28} />
                </a>
                <a href="#" className="text-yellow-400 hover:text-yellow-500 transition-colors">
                  <Twitter size={28} />
                </a>
                <a href="#" className="text-yellow-400 hover:text-yellow-500 transition-colors">
                  <Linkedin size={28} />
                </a>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-yellow-400 mb-6">Send a Message</h2>

            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:border-yellow-400 transition-colors"
                  placeholder="Your Name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:border-yellow-400 transition-colors"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:border-yellow-400 transition-colors"
                  placeholder="Research Collaboration"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={6}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:border-yellow-400 transition-colors resize-none"
                  placeholder="Tell me about your project or research interests..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-yellow-400 text-black py-3 px-6 rounded-md font-medium hover:bg-yellow-500 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
