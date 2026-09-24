
import { User } from '@/constants/types';
import { create } from 'zustand';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  setLoading: (isLoading: boolean) => void;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  isLoading: false,
  setLoading: (isLoading) => set({ isLoading }),
}));