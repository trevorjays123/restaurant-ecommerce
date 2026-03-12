import { useCallback } from 'react';
import { useCartStore } from '@/store/cartStore';
import type { MenuItem } from '@/types';

export const useCart = () => {
  const store = useCartStore();
  
  const addItem = useCallback((item: MenuItem, quantity = 1) => {
    store.addItem(item, quantity);
  }, [store]);
  
  const removeItem = useCallback((itemId: string) => {
    store.removeItem(itemId);
  }, [store]);
  
  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    store.updateQuantity(itemId, quantity);
  }, [store]);
  
  const clearCart = useCallback(() => {
    store.clearCart();
  }, [store]);
  
  const applyPromoCode = useCallback(async (code: string) => {
    return store.applyPromoCode(code);
  }, [store]);
  
  return {
    items: store.items,
    subtotal: store.subtotal,
    deliveryFee: store.deliveryFee,
    discount: store.discount,
    total: store.total,
    promoCode: store.promoCode,
    itemCount: store.getItemCount(),
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    applyPromoCode,
    removePromoCode: store.removePromoCode,
  };
};
