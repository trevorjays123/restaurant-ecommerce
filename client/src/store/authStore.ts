import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { User } from '@/types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setUser: (user: User | null) => void;
  login: (email: string, password: string) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<boolean>;
  clearError: () => void;
}

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      
      setUser: (user: User | null) => set({ 
        user, 
        isAuthenticated: !!user 
      }),
      
      login: async (email: string, password: string): Promise<boolean> => {
        set({ isLoading: true, error: null });
        
        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1000));
          
          // Mock successful login
          const mockUser: User = {
            id: '1',
            email,
            phone: '+2348012345678',
            firstName: 'John',
            lastName: 'Doe',
            loyaltyPoints: 500,
            loyaltyTier: 'silver',
            addresses: [],
            createdAt: new Date(),
          };
          
          set({ user: mockUser, isAuthenticated: true, isLoading: false });
          return true;
        } catch (error) {
          set({ 
            error: 'Invalid email or password', 
            isLoading: false 
          });
          return false;
        }
      },
      
      register: async (data: RegisterData): Promise<boolean> => {
        set({ isLoading: true, error: null });
        
        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1500));
          
          // Mock successful registration
          const mockUser: User = {
            id: '1',
            email: data.email,
            phone: data.phone,
            firstName: data.firstName,
            lastName: data.lastName,
            loyaltyPoints: 100, // Welcome bonus
            loyaltyTier: 'bronze',
            addresses: [],
            createdAt: new Date(),
          };
          
          set({ user: mockUser, isAuthenticated: true, isLoading: false });
          return true;
        } catch (error) {
          set({ 
            error: 'Registration failed. Please try again.', 
            isLoading: false 
          });
          return false;
        }
      },
      
      logout: () => {
        set({ 
          user: null, 
          isAuthenticated: false,
          error: null,
        });
      },
      
      updateProfile: async (data: Partial<User>): Promise<boolean> => {
        set({ isLoading: true, error: null });
        
        try {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          
          const currentUser = get().user;
          if (currentUser) {
            const updatedUser = { ...currentUser, ...data };
            set({ user: updatedUser, isLoading: false });
            return true;
          }
          
          return false;
        } catch (error) {
          set({ 
            error: 'Failed to update profile', 
            isLoading: false 
          });
          return false;
        }
      },
      
      clearError: () => set({ error: null }),
    }),
    {
      name: 'naijakitchen-auth',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
