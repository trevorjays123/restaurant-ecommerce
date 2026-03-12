import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin, CreditCard, Phone, Clock, ArrowLeft } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

export default function Checkout() {
  const navigate = useNavigate();
  const { items, total, subtotal, deliveryFee, discount } = useCartStore();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    // Simulate order placement
    await new Promise(resolve => setTimeout(resolve, 2000));
    const orderId = 'NK' + Math.random().toString(36).substr(2, 9).toUpperCase();
    navigate(`/order/${orderId}`);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-24 pb-12 container-content text-center">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <Link to="/menu" className="text-primary hover:underline">Browse menu</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container-content">
        <Link to="/cart" className="inline-flex items-center gap-2 text-text-secondary hover:text-primary mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to cart
        </Link>
        
        <h1 className="text-2xl font-bold mb-8">Checkout</h1>
        
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Delivery Form */}
          <div className="space-y-6">
            <div className="card p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5" /> Delivery Address
              </h2>
              <div className="space-y-4">
                <input type="text" placeholder="Street address" className="input" />
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="City" className="input" defaultValue="Lagos" />
                  <input type="text" placeholder="State" className="input" defaultValue="Lagos" />
                </div>
                <input type="text" placeholder="Landmark (optional)" className="input" />
              </div>
            </div>

            <div className="card p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5" /> Delivery Time
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {['Now (30-45 min)', 'Schedule for later'].map((time) => (
                  <button
                    key={time}
                    className="p-3 border rounded-lg text-left hover:border-primary hover:bg-primary/5"
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            <div className="card p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5" /> Payment Method
              </h2>
              <div className="space-y-3">
                {[
                  { id: 'card', label: 'Pay with Card (Paystack)', icon: '💳' },
                  { id: 'bank', label: 'Bank Transfer', icon: '🏦' },
                  { id: 'ussd', label: 'USSD (*xxx#)', icon: '📱' },
                ].map((method) => (
                  <label
                    key={method.id}
                    className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer ${
                      paymentMethod === method.id ? 'border-primary bg-primary/5' : ''
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={method.id}
                      checked={paymentMethod === method.id}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4 text-primary"
                    />
                    <span>{method.icon}</span>
                    <span>{method.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="card p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Phone className="w-5 h-5" /> Contact Info
              </h2>
              <div className="space-y-4">
                <input type="email" placeholder="Email address" className="input" />
                <input type="tel" placeholder="Phone number" className="input" defaultValue="+234" />
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="card p-6">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>{item.quantity}x {item.menuItem.name}</span>
                    <span>₦{(item.menuItem.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 border-t pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Subtotal</span>
                  <span>₦{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Delivery</span>
                  <span>{deliveryFee === 0 ? 'Free' : `₦${deliveryFee}`}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm text-success">
                    <span>Discount</span>
                    <span>-₦{discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-lg pt-2 border-t">
                  <span>Total</span>
                  <span>₦{total.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={isProcessing}
                className="btn-primary w-full mt-6"
              >
                {isProcessing ? 'Processing...' : `Place Order - ₦${total.toLocaleString()}`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
