import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-text-primary text-white pt-16 pb-8">
      <div className="container-content">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <span className="text-xl font-bold">N</span>
              </div>
              <span className="text-xl font-display font-bold">
                Naija<span className="text-primary">Kitchen</span>
              </span>
            </div>
            <p className="text-gray-400 mb-4">
              Authentic Nigerian, Continental & Fast Food delivered to your doorstep. 
              Experience the taste of Nigeria's finest cuisines.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-primary transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/menu" className="text-gray-400 hover:text-primary transition-colors">Menu</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-primary transition-colors">Contact</Link></li>
              <li><Link to="/account" className="text-gray-400 hover:text-primary transition-colors">My Account</Link></li>
            </ul>
          </div>

          {/* Menu Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Our Menu</h4>
            <ul className="space-y-2">
              <li><Link to="/menu/nigerian" className="text-gray-400 hover:text-primary transition-colors">Nigerian Dishes</Link></li>
              <li><Link to="/menu/continental" className="text-gray-400 hover:text-primary transition-colors">Continental</Link></li>
              <li><Link to="/menu/fastfood" className="text-gray-400 hover:text-primary transition-colors">Fast Food</Link></li>
              <li><Link to="/menu" className="text-gray-400 hover:text-primary transition-colors">Drinks & Desserts</Link></li>
              <li><Link to="/menu" className="text-gray-400 hover:text-primary transition-colors">Special Deals</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-gray-400">
                  123 Victoria Island<br />
                  Lagos, Nigeria
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <a href="tel:+2348012345678" className="text-gray-400 hover:text-primary transition-colors">
                  +234 800 123 4567
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <a href="mailto:hello@naijakitchen.com" className="text-gray-400 hover:text-primary transition-colors">
                  hello@naijakitchen.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2026 NaijaKitchen. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
