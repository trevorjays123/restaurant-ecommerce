import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { CartItem, MenuItem, Cart } from '@/types';

// Safe add item with debouncing to prevent event loop blocking
let isProcessingAdd = false;

interface CartState extends Cart {
  addItem: (menuItem: MenuItem, quantity?: number, customizations?: CartItem['customizations']) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  updateCustomizations: (itemId: string, customizations: CartItem['customizations']) => void;
  setSpecialInstructions: (itemId: string, instructions: string) => void;
  applyPromoCode: (code: string) => Promise<boolean>;
  removePromoCode: () => void;
  clearCart: () => void;
  getItemCount: () => number;
}

const calculateTotals = (items: CartItem[], promoCode?: string): Omit<Cart, 'items'> => {
  const subtotal = items.reduce<number>((sum, item) => {
    const customizationsTotal = item.customizations?.reduce<number>((acc, curr) => acc + curr.price, 0) || 0;
    return sum + (item.menuItem.price + customizationsTotal) * item.quantity;
  }, 0);
  
  // Delivery fee - free for orders above ₦5000
  const deliveryFee = subtotal >= 5000 ? 0 : 500;
  
  // Calculate discount based on promo code
  let discount = 0;
  if (promoCode === 'WELCOME50' && subtotal > 0) {
    discount = subtotal * 0.5; // 50% off for first order
    if (discount > 2000) discount = 2000; // Max ₦2000 discount
  }
  
  const total = subtotal + deliveryFee - discount;
  
  return {
    subtotal,
    deliveryFee,
    discount,
    total,
  };
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get): CartState => ({
      items: [],
      subtotal: 0,
      deliveryFee: 0,
      discount: 0,
      total: 0,
      promoCode: undefined,
      
      addItem: (menuItem: MenuItem, quantity = 1, customizations) => {
        // Prevent rapid consecutive calls from blocking event loop
        if (isProcessingAdd) return;
        isProcessingAdd = true;
        
        // Use setTimeout to yield to event loop
        setTimeout(() => {
          try {
            const items = get().items;
            const existingItemIndex = items.findIndex(
              (item: CartItem) => 
                item.menuItem.id === menuItem.id &&
                JSON.stringify(item.customizations) === JSON.stringify(customizations)
            );
            
            let newItems: CartItem[];
            
            if (existingItemIndex > -1) {
              newItems = items.map((item: CartItem, index: number) =>
                index === existingItemIndex
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              );
            } else {
              const newItem: CartItem = {
                id: `${menuItem.id}-${Date.now()}`,
                menuItem,
                quantity,
                customizations,
              };
              newItems = [...items, newItem];
            }
            
            const totals = calculateTotals(newItems);
            set({ items: newItems, ...totals });
          } finally {
            isProcessingAdd = false;
          }
        }, 10); // Small delay to prevent blocking
      },
      
      removeItem: (itemId: string) => {
        const newItems = get().items.filter((item: CartItem) => item.id !== itemId);
        const totals = calculateTotals(newItems, get().promoCode);
        set({ items: newItems, ...totals });
      },
      
      updateQuantity: (itemId: string, quantity: number) => {
        if (quantity < 1) {
          get().removeItem(itemId);
          return;
        }
        
        const newItems = get().items.map((item: CartItem) =>
          item.id === itemId ? { ...item, quantity } : item
        );
        const totals = calculateTotals(newItems, get().promoCode);
        set({ items: newItems, ...totals });
      },
      
      updateCustomizations: (itemId: string, customizations: CartItem['customizations']) => {
        const newItems = get().items.map((item: CartItem) =>
          item.id === itemId ? { ...item, customizations } : item
        );
        const totals = calculateTotals(newItems, get().promoCode);
        set({ items: newItems, ...totals });
      },
      
      setSpecialInstructions: (itemId: string, instructions: string) => {
        const newItems = get().items.map((item: CartItem) =>
          item.id === itemId ? { ...item, specialInstructions: instructions } : item
        );
        set({ items: newItems });
      },
      
      applyPromoCode: async (code: string): Promise<boolean> => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        
        const validCodes: Record<string, boolean> = {
          'WELCOME50': true,
          'NAIJA500': true,
          'FIRSTORDER': true,
        };
        
        if (validCodes[code.toUpperCase()]) {
          const items = get().items;
          const totals = calculateTotals(items, code.toUpperCase());
          set({ promoCode: code.toUpperCase(), ...totals });
          return true;
        }
        
        return false;
      },
      
      removePromoCode: () => {
        const items = get().items;
        const totals = calculateTotals(items);
        set({ promoCode: undefined, ...totals });
      },
      
      clearCart: () => {
        set({
          items: [],
          ...calculateTotals([]),
          promoCode: undefined,
        });
      },
      
      getItemCount: () => {
        return get().items.reduce<number>((sum, item: CartItem) => sum + item.quantity, 0);
      },
    }),
    {
      name: 'naijakitchen-cart',
      storage: createJSONStorage(() => localStorage),
      partialize: (state: CartState) => ({
        items: state.items,
        promoCode: state.promoCode,
      }),
    }
  )
);
