import { create } from 'zustand';
import type { CuisineType, UIState } from '@/types';

interface UIStore extends UIState {
  setCartOpen: (isOpen: boolean) => void;
  setMobileMenuOpen: (isOpen: boolean) => void;
  setSearchOpen: (isOpen: boolean) => void;
  setCurrentCuisine: (cuisine: CuisineType) => void;
  setSelectedLocation: (location: string) => void;
  toggleCart: () => void;
  toggleMobileMenu: () => void;
  toggleSearch: () => void;
}

export const useUIStore = create<UIStore>((set) => ({
  isCartOpen: false,
  isMobileMenuOpen: false,
  isSearchOpen: false,
  currentCuisine: 'nigerian',
  selectedLocation: 'lagos',
  
  setCartOpen: (isOpen: boolean) => set({ isCartOpen: isOpen }),
  setMobileMenuOpen: (isOpen: boolean) => set({ isMobileMenuOpen: isOpen }),
  setSearchOpen: (isOpen: boolean) => set({ isSearchOpen: isOpen }),
  setCurrentCuisine: (cuisine: CuisineType) => set({ currentCuisine: cuisine }),
  setSelectedLocation: (location: string) => set({ selectedLocation: location }),
  
  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
  toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  toggleSearch: () => set((state) => ({ isSearchOpen: !state.isSearchOpen })),
}));
