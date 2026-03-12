import { useParams, Link } from 'react-router-dom';
import { MapPin, Clock, Phone, MessageCircle, Check } from 'lucide-react';

const orderSteps = [
  { id: 'confirmed', label: 'Order Confirmed', description: 'We received your order' },
  { id: 'preparing', label: 'Preparing', description: 'Chef is cooking your food' },
  { id: 'ready', label: 'Ready', description: 'Food is ready for pickup' },
  { id: 'on_the_way', label: 'On the Way', description: 'Rider is delivering your order' },
  { id: 'delivered', label: 'Delivered', description: 'Order delivered successfully' },
];

export default function TrackOrder() {
  const { id } = useParams<{ id: string }>();
  const currentStep = 2; // Simulating "Preparing" status

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container-content max-w-2xl mx-auto">
        <Link to="/" className="text-primary hover:underline mb-6 inline-block">
          ← Back to Home
        </Link>
        
        <div className="card p-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold">Track Order</h1>
              <p className="text-text-secondary">Order #{id}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-text-secondary">Estimated arrival</p>
              <p className="text-xl font-bold text-primary">25-30 min</p>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="space-y-4 mb-8">
            {orderSteps.map((step, index) => (
              <div key={step.id} className="flex items-start gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  index <= currentStep ? 'bg-primary text-white' : 'bg-gray-200 text-gray-400'
                }`}>
                  {index < currentStep ? <Check className="w-5 h-5" /> : <span className="text-sm">{index + 1}</span>}
                </div>
                <div className="flex-1">
                  <p className={`font-medium ${index <= currentStep ? 'text-text-primary' : 'text-gray-400'}`}>
                    {step.label}
                  </p>
                  <p className="text-sm text-text-secondary">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Map placeholder */}
          <div className="h-48 bg-gray-100 rounded-lg mb-6 flex items-center justify-center">
            <div className="text-center text-text-secondary">
              <MapPin className="w-8 h-8 mx-auto mb-2" />
              <p>Live map tracking</p>
            </div>
          </div>

          {/* Rider Info */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                <span className="font-bold text-primary">RK</span>
              </div>
              <div>
                <p className="font-medium">Rider Name</p>
                <p className="text-sm text-text-secondary">Arriving in 15 min</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="p-3 bg-primary text-white rounded-full">
                <Phone className="w-5 h-5" />
              </button>
              <a href="https://wa.me/2348001234567" className="p-3 bg-green-500 text-white rounded-full">
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
