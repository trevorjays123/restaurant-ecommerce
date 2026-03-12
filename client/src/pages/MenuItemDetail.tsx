import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Plus, Minus, Star, Clock, Heart, Share2 } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import type { MenuItem } from '@/types';

// Sample item data
const sampleItem: MenuItem = {
  id: '1',
  name: 'Party Jollof Rice',
  description: 'Authentic Nigerian party jollof made with premium long-grain rice, fresh tomatoes, and spices. Served with grilled chicken, plantain, and salad.',
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
  spiceLevel: 2,
  calories: 650,
  ingredients: ['Long grain rice', 'Tomatoes', 'Onions', 'Grilled chicken', 'Plantain', 'Spices'],
  allergens: [],
};

export default function MenuItemDetail() {
  const { cuisine, id } = useParams<{ cuisine: string; id: string }>();
  const { addItem } = useCartStore();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addItem(sampleItem, quantity);
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container-content">
        <Link to={`/menu/${cuisine}`} className="text-primary hover:underline mb-4 inline-block">
          ← Back to Menu
        </Link>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Image */}
          <div className="relative h-96 md:h-auto bg-gray-200 rounded-2xl overflow-hidden">
            <img
              src={sampleItem.thumbnail}
              alt={sampleItem.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details */}
          <div>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">{sampleItem.name}</h1>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 text-warning fill-warning" />
                    <span className="font-medium">{sampleItem.rating}</span>
                    <span className="text-text-secondary">({sampleItem.reviewCount} reviews)</span>
                  </div>
                  <div className="flex items-center gap-1 text-text-secondary">
                    <Clock className="w-5 h-5" />
                    <span>{sampleItem.preparationTime} min</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <Heart className="w-6 h-6" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <Share2 className="w-6 h-6" />
                </button>
              </div>
            </div>

            <p className="text-text-secondary mb-6">{sampleItem.description}</p>

            {sampleItem.ingredients && (
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Ingredients</h3>
                <div className="flex flex-wrap gap-2">
                  {sampleItem.ingredients.map((ingredient) => (
                    <span key={ingredient} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                      {ingredient}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {sampleItem.calories && (
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-text-secondary">
                  <span className="font-medium">{sampleItem.calories}</span> calories per serving
                </p>
              </div>
            )}

            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <span className="text-text-secondary">Quantity:</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-10 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <p className="text-2xl font-bold text-primary">
                ₦{(sampleItem.price * quantity).toLocaleString()}
              </p>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={!sampleItem.available}
              className="btn-primary w-full"
            >
              {sampleItem.available ? 'Add to Cart' : 'Out of Stock'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
