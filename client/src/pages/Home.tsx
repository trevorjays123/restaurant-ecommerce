import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Star, MapPin, Phone, Utensils, ShoppingBag, Bike, Award } from 'lucide-react';
import { useUIStore } from '@/store/uiStore';
import { useCartStore } from '@/store/cartStore';
import type { MenuItem, CuisineType } from '@/types';

// Sample featured items
const featuredItems: MenuItem[] = [
  {
    id: '1',
    name: 'Party Jollof Rice',
    description: 'Authentic Nigerian party jollof with grilled chicken',
    price: 3500,
    category: 'Mains',
    cuisine: 'nigerian',
    images: ['/images/nigerian/jollof.jpg'],
    thumbnail: '/images/nigerian/jollof.jpg',
    dietary: [],
    available: true,
    preparationTime: 30,
    popular: true,
    rating: 4.8,
    reviewCount: 245,
  },
  {
    id: '2',
    name: 'Grilled Salmon',
    description: 'Fresh Atlantic salmon with seasonal vegetables',
    price: 8500,
    category: 'Mains',
    cuisine: 'continental',
    images: ['/images/continental/salmon.jpg'],
    thumbnail: '/images/continental/salmon.jpg',
    dietary: ['gluten-free'],
    available: true,
    preparationTime: 25,
    popular: true,
    rating: 4.9,
    reviewCount: 128,
  },
  {
    id: '3',
    name: 'Suya Burger',
    description: 'Premium beef patty with Nigerian spices',
    price: 4200,
    category: 'Burgers',
    cuisine: 'fastfood',
    images: ['/images/fastfood/suya-burger.jpg'],
    thumbnail: '/images/fastfood/suya-burger.jpg',
    dietary: [],
    available: true,
    preparationTime: 15,
    popular: true,
    rating: 4.7,
    reviewCount: 312,
  },
];

const cuisineData: { type: CuisineType; label: string; color: string; bgGradient: string }[] = [
  { type: 'nigerian', label: 'Nigerian', color: 'text-nigerian-orange', bgGradient: 'from-nigerian-orange to-nigerian-brown' },
  { type: 'continental', label: 'Continental', color: 'text-continental-navy', bgGradient: 'from-continental-navy to-continental-charcoal' },
  { type: 'fastfood', label: 'Fast Food', color: 'text-fastfood-red', bgGradient: 'from-fastfood-red to-fastfood-orange' },
];

const howItWorks = [
  { icon: Utensils, title: 'Choose Your Food', description: 'Browse our menu and select your favorite dishes' },
  { icon: ShoppingBag, title: 'Place Order', description: 'Add items to cart and checkout securely' },
  { icon: Clock, title: 'We Prepare', description: 'Our chefs prepare your food with care' },
  { icon: Bike, title: 'Fast Delivery', description: 'Get your food delivered to your doorstep' },
];

export default function Home() {
  const { setCurrentCuisine, toggleCart } = useUIStore();
  const { addItem } = useCartStore();

  const handleAddToCart = (item: MenuItem) => {
    addItem(item);
    toggleCart();
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-nigerian-orange via-nigerian-brown to-nigerian-green">
          <div className="absolute inset-0 bg-black/30" />
          {/* Pattern overlay */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        
        {/* Content */}
        <div className="relative z-10 container-content text-center text-white px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-4">
              Three Cuisines.<br />
              <span className="text-nigerian-cream">One Kitchen.</span>
            </h1>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Experience the finest Nigerian, Continental, and Fast Food crafted with passion 
              and delivered fresh to your doorstep.
            </p>
            
            {/* Cuisine Selector Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {cuisineData.map((cuisine, index) => (
                <motion.div
                  key={cuisine.type}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <Link
                    to={`/menu/${cuisine.type}`}
                    onClick={() => setCurrentCuisine(cuisine.type)}
                    className={`px-6 py-3 rounded-full font-semibold bg-gradient-to-r ${cuisine.bgGradient} text-white hover:opacity-90 transition-all hover:scale-105 inline-block`}
                  >
                    {cuisine.label}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Link
                to="/menu"
                className="px-8 py-3 bg-white text-nigerian-brown font-semibold rounded-full hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
              >
                Order Now <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/contact"
                className="px-8 py-3 border-2 border-white text-white font-semibold rounded-full hover:bg-white/10 transition-colors inline-flex items-center gap-2"
              >
                <Phone className="w-5 h-5" /> Call Us
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2" />
          </div>
        </motion.div>
      </section>

      {/* Live Order Counter */}
      <section className="bg-nigerian-brown py-4">
        <div className="container-content">
          <div className="flex items-center justify-center gap-2 text-white">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-3 h-3 bg-green-400 rounded-full"
            />
            <span className="font-medium">
              <span className="font-bold text-nigerian-cream">1,247</span> orders being prepared right now
            </span>
          </div>
        </div>
      </section>

      {/* Featured Dishes */}
      <section className="section bg-background">
        <div className="container-content">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-h2 font-display font-bold mb-4">Featured Dishes</h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Discover our most popular dishes from each cuisine, crafted to perfection
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card group"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-gray-200 animate-pulse" />
                  <img
                    src={item.thumbnail}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  {item.popular && (
                    <span className="absolute top-3 left-3 px-3 py-1 bg-warning text-white text-xs font-bold rounded-full flex items-center gap-1">
                      <Award className="w-3 h-3" /> Popular
                    </span>
                  )}
                </div>
                
                {/* Content */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-warning fill-warning" />
                      <span className="text-sm font-medium">{item.rating}</span>
                    </div>
                  </div>
                  <p className="text-text-secondary text-sm mb-3 line-clamp-2">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-primary">₦{item.price.toLocaleString()}</span>
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
            >
              View Full Menu <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section bg-white">
        <div className="container-content">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-h2 font-display font-bold mb-4">How It Works</h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Getting your favorite food is easy. Follow these simple steps
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {howItWorks.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{step.title}</h3>
                <p className="text-text-secondary text-sm">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Location & Hours */}
      <section className="section bg-continental-navy text-white">
        <div className="container-content">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-h2 font-display font-bold mb-6">Visit Us</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-6 h-6 text-continental-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold mb-1">Main Location</h4>
                    <p className="text-gray-300">123 Victoria Island, Lagos, Nigeria</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-6 h-6 text-continental-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold mb-1">Opening Hours</h4>
                    <p className="text-gray-300">Mon - Sun: 8:00 AM - 11:00 PM</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-6 h-6 text-continental-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold mb-1">Contact</h4>
                    <p className="text-gray-300">+234 800 123 4567</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="h-64 md:h-80 bg-gray-800 rounded-2xl overflow-hidden"
            >
              {/* Map placeholder */}
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                <MapPin className="w-12 h-12" />
                <span className="ml-2">Map Integration</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
