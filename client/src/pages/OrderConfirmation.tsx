import { useParams, Link } from 'react-router-dom';
import { CheckCircle, MapPin, Clock, Phone, MessageCircle } from 'lucide-react';

export default function OrderConfirmation() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container-content max-w-lg mx-auto text-center">
        <div className="card p-8">
          <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-success" />
          </div>
          
          <h1 className="text-2xl font-bold mb-2">Order Confirmed!</h1>
          <p className="text-text-secondary mb-6">
            Thank you for your order. We're preparing your food now.
          </p>
          
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <p className="text-sm text-text-secondary">Order Number</p>
            <p className="text-xl font-bold text-primary">{id}</p>
          </div>

          <div className="space-y-4 text-left mb-8">
            <div className="flex items-center gap-3 text-text-secondary">
              <Clock className="w-5 h-5" />
              <span>Estimated delivery: 30-45 minutes</span>
            </div>
            <div className="flex items-center gap-3 text-text-secondary">
              <MapPin className="w-5 h-5" />
              <span>Tracking link will be sent to your phone</span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Link to={`/track/${id}`} className="btn-primary">
              Track Order
            </Link>
            <a 
              href="https://wa.me/2348001234567" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-outline inline-flex justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" /> WhatsApp Support
            </a>
            <Link to="/menu" className="text-primary hover:underline">
              Order More Food
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
