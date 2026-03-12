import { Award, Users, Clock, Heart } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen pt-24 pb-12">
      {/* Hero */}
      <div className="bg-gradient-to-r from-nigerian-orange to-nigerian-brown py-16">
        <div className="container-content text-white text-center">
          <h1 className="text-4xl font-display font-bold mb-4">About NaijaKitchen</h1>
          <p className="text-xl max-w-2xl mx-auto opacity-90">
            Bringing the authentic taste of Nigeria to your doorstep since 2020
          </p>
        </div>
      </div>

      <div className="container-content py-16">
        {/* Story */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-2xl font-bold mb-4">Our Story</h2>
            <p className="text-text-secondary mb-4">
              NaijaKitchen started with a simple mission: to make authentic Nigerian cuisine 
              accessible to everyone, anywhere in Lagos. What began as a small kitchen in 
              Victoria Island has grown into one of the most beloved food delivery brands 
              in the city.
            </p>
            <p className="text-text-secondary">
              We believe that great food brings people together. Every dish we prepare is 
              made with love, using only the freshest ingredients and time-honored recipes 
              passed down through generations.
            </p>
          </div>
          <div className="h-80 bg-gray-200 rounded-2xl flex items-center justify-center">
            <span className="text-text-muted">Restaurant Image</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {[
            { icon: Users, value: '50K+', label: 'Happy Customers' },
            { icon: Clock, value: '4+', label: 'Years Experience' },
            { icon: Award, value: '15+', label: 'Awards Won' },
            { icon: Heart, value: '4.8', label: 'Average Rating' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-8 h-8 text-primary" />
              </div>
              <p className="text-3xl font-bold">{stat.value}</p>
              <p className="text-text-secondary">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Values */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-8">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Quality First', description: 'We never compromise on the quality of our ingredients' },
              { title: 'Customer Focus', description: 'Your satisfaction is our top priority' },
              { title: 'Innovation', description: 'Constantly improving our service and menu' },
            ].map((value) => (
              <div key={value.title} className="card p-6">
                <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                <p className="text-text-secondary">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
