import { useCallback } from 'react';
import { useAuthStore } from '@/store/authStore';

export const useAuth = () => {
  const store = useAuthStore();
  
  const login = useCallback(async (email: string, password: string) => {
    return store.login(email, password);
  }, [store]);
  
  const register = useCallback(async (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone: string;
  }) => {
    return store.register(data);
  }, [store]);
  
  const logout = useCallback(() => {
    store.logout();
  }, [store]);
  
  const updateProfile = useCallback(async (data: Record<string, unknown>) => {
    return store.updateProfile(data);
  }, [store]);
  
  return {
    user: store.user,
    isAuthenticated: store.isAuthenticated,
    isLoading: store.isLoading,
    error: store.error,
    login,
    register,
    logout,
    updateProfile,
    clearError: store.clearError,
  };
};
