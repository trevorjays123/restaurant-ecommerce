import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, Grid, List, Star, Clock, Plus } from 'lucide-react';
import { useUIStore } from '@/store/uiStore';
import { useCartStore } from '@/store/cartStore';
import type { MenuItem, CuisineType } from '@/types';

// Sample menu data - Using reliable Unsplash images
const sampleMenuItems: MenuItem[] = [
  // Nigerian Cuisine
  {
    id: '1',
    name: 'Party Jollof Rice',
    description: 'Authentic Nigerian party jollof with grilled chicken and plantain',
    price: 3500,
    category: 'Mains',
    cuisine: 'nigerian',
    images: ['https://images.unsplash.com/photo-1626844131082-256783844137?w=800'],
    thumbnail: 'https://images.unsplash.com/photo-1626844131082-256783844137?w=800',
    dietary: [],
    available: true,
    preparationTime: 30,
    popular: true,
    rating: 4.8,
    reviewCount: 245,
    spiceLevel: 2,
  },
  {
    id: '2',
    name: 'Beef Suya',
    description: 'Spicy grilled beef skewers with onions and pepper',
    price: 2500,
    category: 'Starters',
    cuisine: 'nigerian',
    images: ['https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800'],
    thumbnail: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800',
    dietary: [],
    available: true,
    preparationTime: 15,
    popular: true,
    rating: 4.9,
    reviewCount: 312,
    spiceLevel: 3,
  },
  {
    id: '3',
    name: 'Pounded Yam with Egusi',
    description: 'Smooth pounded yam with rich melon soup and assorted meat',
    price: 2800,
    category: 'Mains',
    cuisine: 'nigerian',
    images: ['https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800'],
    thumbnail: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800',
    dietary: [],
    available: true,
    preparationTime: 25,
    rating: 4.7,
    reviewCount: 189,
    spiceLevel: 2,
  },
  // Continental Cuisine
  {
    id: '4',
    name: 'Grilled Salmon',
    description: 'Fresh Atlantic salmon with seasonal vegetables and lemon butter sauce',
    price: 8500,
    category: 'Mains',
    cuisine: 'continental',
    images: ['https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800'],
    thumbnail: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800',
    dietary: ['gluten-free'],
    available: true,
    preparationTime: 25,
    popular: true,
    rating: 4.9,
    reviewCount: 128,
  },
  {
    id: '5',
    name: 'Beef Steak',
    description: 'Premium beef steak with mashed potatoes and asparagus',
    price: 9500,
    category: 'Mains',
    cuisine: 'continental',
    images: ['https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800'],
    thumbnail: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800',
    dietary: ['gluten-free'],
    available: true,
    preparationTime: 30,
    rating: 4.8,
    reviewCount: 95,
  },
  {
    id: '6',
    name: 'Caesar Salad',
    description: 'Fresh romaine lettuce with parmesan and croutons',
    price: 3200,
    category: 'Starters',
    cuisine: 'continental',
    images: ['https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=800'],
    thumbnail: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=800',
    dietary: ['vegetarian'],
    available: true,
    preparationTime: 10,
    rating: 4.5,
    reviewCount: 76,
  },
  // Fast Food
  {
    id: '7',
    name: 'Suya Burger',
    description: 'Premium beef patty with Nigerian spices, lettuce, and tomato',
    price: 4200,
    category: 'Burgers',
    cuisine: 'fastfood',
    images: ['https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800'],
    thumbnail: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800',
    dietary: [],
    available: true,
    preparationTime: 15,
    popular: true,
    rating: 4.7,
    reviewCount: 312,
    spiceLevel: 2,
  },
  {
    id: '8',
    name: 'Pepperoni Pizza',
    description: 'Classic pepperoni pizza with mozzarella cheese',
    price: 5500,
    category: 'Pizza',
    cuisine: 'fastfood',
    images: ['https://images.unsplash.com/photo-1628840042765-356cda07504e?w=800'],
    thumbnail: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=800',
    dietary: [],
    available: true,
    preparationTime: 20,
    popular: true,
    rating: 4.6,
    reviewCount: 245,
  },
  {
    id: '9',
    name: 'Chicken Wings',
    description: 'Crispy fried wings with your choice of sauce',
    price: 3800,
    category: 'Wings',
    cuisine: 'fastfood',
    images: ['https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=800'],
    thumbnail: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=800',
    dietary: [],
    available: true,
    preparationTime: 15,
    rating: 4.5,
    reviewCount: 178,
    spiceLevel: 1,
  },
  {
    id: '10',
    name: 'Chicken Nuggets',
    description: 'Crispy golden chicken nuggets with honey mustard dipping sauce',
    price: 2800,
    category: 'Chicken',
    cuisine: 'fastfood',
    images: ['https://images.unsplash.com/photo-1562967914-608f82629710?w=800'],
    thumbnail: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=800',
    dietary: [],
    available: true,
    preparationTime: 12,
    popular: true,
    rating: 4.6,
    reviewCount: 198,
  },
  {
    id: '11',
    name: 'French Fries',
    description: 'Crispy golden fries seasoned with salt',
    price: 1500,
    category: 'Sides',
    cuisine: 'fastfood',
    images: ['https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=800'],
    thumbnail: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=800',
    dietary: ['vegetarian'],
    available: true,
    preparationTime: 8,
    rating: 4.4,
    reviewCount: 156,
  },
  {
    id: '12',
    name: 'Grilled Chicken',
    description: 'Tender grilled chicken with herbs and spices',
    price: 4500,
    category: 'Mains',
    cuisine: 'continental',
    images: ['https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=800'],
    thumbnail: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=800',
    dietary: ['gluten-free'],
    available: true,
    preparationTime: 25,
    popular: true,
    rating: 4.8,
    reviewCount: 167,
  },
];

const categories = [
  { id: 'all', name: 'All' },
  { id: 'starters', name: 'Starters' },
  { id: 'mains', name: 'Mains' },
  { id: 'chicken', name: 'Chicken' },
  { id: 'burgers', name: 'Burgers' },
  { id: 'pizza', name: 'Pizza' },
  { id: 'wings', name: 'Wings' },
  { id: 'sides', name: 'Sides' },
  { id: 'desserts', name: 'Desserts' },
  { id: 'drinks', name: 'Drinks' },
];

export default function Menu() {
  const { cuisine = 'nigerian' } = useParams<{ cuisine?: CuisineType }>();
  const { setCurrentCuisine, currentCuisine } = useUIStore();
  const { addItem } = useCartStore();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Set cuisine from URL
  if (cuisine && cuisine !== currentCuisine) {
    setCurrentCuisine(cuisine);
  }

  const filteredItems = sampleMenuItems.filter((item) => {
    const matchesCuisine = item.cuisine === currentCuisine;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
      item.category.toLowerCase() === selectedCategory;
    return matchesCuisine && matchesSearch && matchesCategory;
  });

  const handleAddToCart = (item: MenuItem) => {
    addItem(item);
  };

  const getCuisineTitle = () => {
    switch (currentCuisine) {
      case 'nigerian': return 'Nigerian';
      case 'continental': return 'Continental';
      case 'fastfood': return 'Fast Food';
      default: return 'Menu';
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-24 lg:pb-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-nigerian-orange to-nigerian-brown py-12">
        <div className="container-content">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
            {getCuisineTitle()} Menu
          </h1>
          <p className="text-white/80 max-w-xl">
            Discover our delicious {getCuisineTitle().toLowerCase()} dishes, 
            prepared fresh with the finest ingredients.
          </p>
        </div>
      </div>

      <div className="container-content py-8">
        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
            <input
              type="text"
              placeholder="Search dishes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input pl-10"
            />
          </div>
          
          {/* Category Filter (Mobile) */}
          <div className="md:hidden flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-text-secondary'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
          
          {/* View Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-primary text-white' : 'bg-gray-100'}`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-primary text-white' : 'bg-gray-100'}`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Categories (Desktop) */}
          <aside className="hidden md:block w-48 flex-shrink-0">
            <h3 className="font-semibold mb-4">Categories</h3>
            <div className="space-y-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    selectedCategory === cat.id
                      ? 'bg-primary/10 text-primary font-medium'
                      : 'text-text-secondary hover:bg-gray-50'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </aside>

          {/* Menu Grid */}
          <div className="flex-1">
            {filteredItems.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-text-secondary">No dishes found. Try a different search or category.</p>
              </div>
            ) : (
              <div className={`grid gap-6 ${
                viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'
              }`}>
                {filteredItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`card group ${viewMode === 'list' ? 'flex' : ''}`}
                  >
                    {/* Image */}
                    <div className={`relative overflow-hidden ${viewMode === 'list' ? 'w-48 h-48' : 'h-48'}`}>
                      <img
                        src={item.thumbnail}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                      {item.popular && (
                        <span className="absolute top-2 left-2 px-2 py-1 bg-warning text-white text-xs font-bold rounded">
                          Popular
                        </span>
                      )}
                      {item.spiceLevel && (
                        <div className="absolute top-2 right-2 flex gap-0.5">
                          {[...Array(item.spiceLevel)].map((_, i) => (
                            <span key={i} className="text-red-500">🌶️</span>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    {/* Content */}
                    <div className="p-4 flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold">{item.name}</h3>
                        {item.rating && (
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-warning fill-warning" />
                            <span className="text-sm">{item.rating}</span>
                          </div>
                        )}
                      </div>
                      <p className="text-text-secondary text-sm mb-3 line-clamp-2">{item.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-lg font-bold text-primary">₦{item.price.toLocaleString()}</span>
                          <div className="flex items-center gap-1 text-xs text-text-muted mt-1">
                            <Clock className="w-3 h-3" />
                            <span>{item.preparationTime} min</span>
                          </div>
                        </div>
                        <button
                          onClick={() => handleAddToCart(item)}
                          disabled={!item.available}
                          className={`p-2 rounded-full transition-colors ${
                            item.available
                              ? 'bg-primary text-white hover:bg-primary/90'
                              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          }`}
                        >
                          <Plus className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
