import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

export default function Cart() {
  const { items, updateQuantity, removeItem, subtotal, deliveryFee, discount, total, promoCode, applyPromoCode, removePromoCode } = useCartStore();
  const [promoInput, setPromoInput] = useState('');

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-24 pb-12 container-content">
        <div className="text-center py-16">
          <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
          <p className="text-text-secondary mb-8">Looks like you haven't added any items yet.</p>
          <Link to="/menu" className="btn-primary inline-flex items-center gap-2">
            Browse Menu <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container-content">
        <h1 className="text-2xl font-bold mb-8">Your Cart</h1>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="card p-4 flex gap-4">
                <img
                  src={item.menuItem.thumbnail}
                  alt={item.menuItem.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{item.menuItem.name}</h3>
                  <p className="text-primary font-bold">₦{item.menuItem.price.toLocaleString()}</p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 bg-gray-100 rounded">
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 bg-gray-100 rounded">
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <button onClick={() => removeItem(item.id)} className="p-2 text-error">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-24">
              <h2 className="text-lg font-bold mb-4">Order Summary</h2>
              
              {/* Promo Code */}
              <div className="mb-4">
                {promoCode ? (
                  <div className="flex items-center justify-between bg-success/10 p-3 rounded-lg">
                    <span className="font-medium text-success">{promoCode}</span>
                    <button onClick={removePromoCode} className="text-sm text-success hover:underline">
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo code"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className="input flex-1"
                    />
                    <button
                      onClick={() => applyPromoCode(promoInput)}
                      className="px-4 py-2 bg-primary text-white rounded-lg"
                    >
                      Apply
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-2 border-t pt-4">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Subtotal</span>
                  <span>₦{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Delivery</span>
                  <span>{deliveryFee === 0 ? 'Free' : `₦${deliveryFee.toLocaleString()}`}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-success">
                    <span>Discount</span>
                    <span>-₦{discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-lg pt-2 border-t">
                  <span>Total</span>
                  <span>₦{total.toLocaleString()}</span>
                </div>
              </div>

              {deliveryFee > 0 && (
                <p className="text-sm text-text-muted mt-4">
                  Add ₦{(5000 - subtotal).toLocaleString()} more for free delivery
                </p>
              )}

              <Link to="/checkout" className="btn-primary w-full mt-6 inline-flex justify-center">
                Proceed to Checkout <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
