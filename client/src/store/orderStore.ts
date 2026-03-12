import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Order } from '@/types';

interface OrderState {
  currentOrder: Order | null;
  orders: Order[];
  isLoading: boolean;
  error: string | null;
  
  setCurrentOrder: (order: Order | null) => void;
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  setOrders: (orders: Order[]) => void;
  clearOrders: () => void;
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      currentOrder: null,
      orders: [],
      isLoading: false,
      error: null,
      
      setCurrentOrder: (order: Order | null) => {
        set({ currentOrder: order });
      },
      
      addOrder: (order: Order) => {
        set((state) => ({
          orders: [order, ...state.orders],
          currentOrder: order,
        }));
      },
      
      updateOrderStatus: (orderId: string, status: Order['status']) => {
        set((state) => {
          const updatedOrders = state.orders.map((order) =>
            order.id === orderId ? { ...order, status } : order
          );
          
          const currentOrder = state.currentOrder?.id === orderId
            ? { ...state.currentOrder, status }
            : state.currentOrder;
          
          return {
            orders: updatedOrders,
            currentOrder,
          };
        });
      },
      
      setOrders: (orders: Order[]) => {
        set({ orders });
      },
      
      clearOrders: () => {
        set({ orders: [], currentOrder: null });
      },
    }),
    {
      name: 'naijakitchen-orders',
      storage: typeof window !== 'undefined' 
        ? require('zustand/middleware').createJSONStorage(() => localStorage)
        : undefined,
      partialize: (state) => ({
        orders: state.orders.slice(0, 10), // Keep last 10 orders
      }),
    }
  )
);
