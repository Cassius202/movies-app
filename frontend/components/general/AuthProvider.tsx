"use client";

import { getCurrentUser } from "@/lib/auth";
import { useAuthStore } from "@/stores/useAuthStore";
import { useEffect } from "react";

export function AuthProvider() : null {
  const { setUser, setLoading } = useAuthStore();
  
  useEffect(() => {
    const getUser = async () => {
      setLoading(true);
      const currentUser = await getCurrentUser();
      setUser(currentUser);
      setLoading(false);
    };

    getUser();
  }, []); // Added dependencies
  
  return null;
}