import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';

export default function Contact() {
  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="bg-gradient-to-r from-nigerian-orange to-nigerian-brown py-16">
        <div className="container-content text-white text-center">
          <h1 className="text-4xl font-display font-bold mb-4">Contact Us</h1>
          <p className="text-xl opacity-90">We'd love to hear from you</p>
        </div>
      </div>

      <div className="container-content py-16">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="card p-8">
            <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="First name" className="input" />
                <input type="text" placeholder="Last name" className="input" />
              </div>
              <input type="email" placeholder="Email address" className="input" />
              <input type="tel" placeholder="Phone number" className="input" />
              <select className="input">
                <option value="">Select inquiry type</option>
                <option value="general">General Inquiry</option>
                <option value="order">Order Issue</option>
                <option value="feedback">Feedback</option>
                <option value="complaint">Complaint</option>
              </select>
              <textarea placeholder="Your message" rows={5} className="input" />
              <button type="submit" className="btn-primary w-full">Send Message</button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <div className="card p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Address</h3>
                  <p className="text-text-secondary">123 Victoria Island, Lagos, Nigeria</p>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Phone</h3>
                  <p className="text-text-secondary">+234 800 123 4567</p>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Email</h3>
                  <p className="text-text-secondary">hello@naijakitchen.com</p>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Opening Hours</h3>
                  <p className="text-text-secondary">Mon - Sun: 8:00 AM - 11:00 PM</p>
                </div>
              </div>
            </div>

            <a href="https://wa.me/2348001234567" className="card p-6 flex items-center gap-4 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold">WhatsApp</h3>
                <p className="text-text-secondary">Chat with us</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
