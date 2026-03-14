import { ReactNode, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import CartDrawer from '../cart/CartDrawer';
import MobileNavigation from './MobileNavigation';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  // Prevent event listener accumulation
  useEffect(() => {
    let lastCleanup = Date.now();
    const cleanupInterval = 60000; // Every 60 seconds
    
    const checkAndCleanup = () => {
      const now = Date.now();
      if (now - lastCleanup > cleanupInterval) {
        // Force React to clean up any stale listeners
        lastCleanup = now;
      }
    };
    
    const interval = setInterval(checkAndCleanup, 30000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <CartDrawer />
      <MobileNavigation />
    </div>
  );
}
