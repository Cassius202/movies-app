// hooks/useUser.ts - Sync Zustand with server
import { useEffect } from 'react';
import { useAuthStore } from '@/stores/useAuthStore';
import { getCurrentUser } from '@/lib/auth';

export function useUser() {
  const { user, isLoading, setUser, setLoading } = useAuthStore();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getCurrentUser();
        setUser(userData);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUser();
  }, [setUser, setLoading]);

  return { user, isLoading };
}