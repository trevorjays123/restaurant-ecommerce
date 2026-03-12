import { Link, useLocation } from 'react-router-dom';
import { Home, Menu as MenuIcon, User, ShoppingCart } from 'lucide-react';
import { useUIStore } from '@/store/uiStore';
import { useCartStore } from '@/store/cartStore';

export default function MobileNavigation() {
  const location = useLocation();
  const { toggleCart } = useUIStore();
  const { getItemCount } = useCartStore();
  
  const cartCount = getItemCount();

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: MenuIcon, label: 'Menu', path: '/menu' },
    { icon: User, label: 'Account', path: '/account' },
    { icon: ShoppingCart, label: 'Cart', action: toggleCart },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t lg:hidden z-40 safe-area-bottom">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const isActive = item.path ? location.pathname === item.path : false;
          const Icon = item.icon;

          return (
            <div key={item.label} className="relative">
              {item.action ? (
                <button
                  onClick={item.action}
                  className="flex flex-col items-center gap-1 px-4 py-2"
                >
                  <div className="relative">
                    <Icon className={`w-6 h-6 ${isActive ? 'text-primary' : 'text-text-secondary'}`} />
                    {item.label === 'Cart' && cartCount > 0 && (
                      <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-white text-xs rounded-full flex items-center justify-center">
                        {cartCount}
                      </span>
                    )}
                  </div>
                  <span className={`text-xs ${isActive ? 'text-primary font-medium' : 'text-text-secondary'}`}>
                    {item.label}
                  </span>
                </button>
              ) : (
                <Link
                  to={item.path!}
                  className="flex flex-col items-center gap-1 px-4 py-2"
                >
                  <Icon className={`w-6 h-6 ${isActive ? 'text-primary' : 'text-text-secondary'}`} />
                  <span className={`text-xs ${isActive ? 'text-primary font-medium' : 'text-text-secondary'}`}>
                    {item.label}
                  </span>
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
}
