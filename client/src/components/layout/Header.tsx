import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Menu, Search, User, MapPin } from 'lucide-react';
import { useUIStore } from '@/store/uiStore';
import { useCartStore } from '@/store/cartStore';
import { useState, useEffect } from 'react';
import type { CuisineType } from '@/types';

const cuisineNavItems: { label: string; value: CuisineType }[] = [
  { label: 'Nigerian', value: 'nigerian' },
  { label: 'Continental', value: 'continental' },
  { label: 'Fast Food', value: 'fastfood' },
];

export default function Header() {
  const location = useLocation();
  const { toggleCart, toggleMobileMenu, currentCuisine, setCurrentCuisine } = useUIStore();
  const { getItemCount } = useCartStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  
  const cartCount = getItemCount();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getCuisineColors = (cuisine: CuisineType) => {
    switch (cuisine) {
      case 'nigerian':
        return 'bg-nigerian-orange text-white';
      case 'continental':
        return 'bg-continental-navy text-white';
      case 'fastfood':
        return 'bg-fastfood-red text-white';
      default:
        return 'bg-primary text-white';
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-md py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container-content">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className={`w-10 h-10 rounded-full flex items-center justify-center ${getCuisineColors(currentCuisine)}`}
            >
              <span className="text-xl font-bold">N</span>
            </motion.div>
            <span className="text-xl font-display font-bold text-text-primary">
              Naija<span className="text-primary">Kitchen</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            <Link 
              to="/" 
              className={`font-medium transition-colors ${
                location.pathname === '/' ? 'text-primary' : 'text-text-secondary hover:text-primary'
              }`}
            >
              Home
            </Link>
            
            {/* Cuisine Dropdowns */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('cuisine')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1 font-medium text-text-secondary hover:text-primary transition-colors">
                Menu
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <AnimatePresence>
                {activeDropdown === 'cuisine' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2"
                  >
                    {cuisineNavItems.map((item) => (
                      <Link
                        key={item.value}
                        to={`/menu/${item.value}`}
                        onClick={() => setCurrentCuisine(item.value)}
                        className="block px-4 py-2 hover:bg-gray-50 transition-colors"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <Link 
              to="/about" 
              className={`font-medium transition-colors ${
                location.pathname === '/about' ? 'text-primary' : 'text-text-secondary hover:text-primary'
              }`}
            >
              About
            </Link>
            
            <Link 
              to="/contact" 
              className={`font-medium transition-colors ${
                location.pathname === '/contact' ? 'text-primary' : 'text-text-secondary hover:text-primary'
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Location Selector */}
            <button className="hidden md:flex items-center gap-1 text-sm text-text-secondary hover:text-primary">
              <MapPin className="w-4 h-4" />
              <span className="hidden lg:inline">Lagos</span>
            </button>
            
            {/* Search Button */}
            <button 
              onClick={() => useUIStore.getState().toggleSearch()}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Search className="w-5 h-5 text-text-secondary" />
            </button>
            
            {/* Account */}
            <Link 
              to="/account" 
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <User className="w-5 h-5 text-text-secondary" />
            </Link>
            
            {/* Cart */}
            <button 
              onClick={toggleCart}
              className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ShoppingCart className="w-5 h-5 text-text-secondary" />
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-xs font-bold rounded-full flex items-center justify-center"
                >
                  {cartCount}
                </motion.span>
              )}
            </button>
            
            {/* Mobile Menu Toggle */}
            <button 
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Menu className="w-5 h-5 text-text-secondary" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
