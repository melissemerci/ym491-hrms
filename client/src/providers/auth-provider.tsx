"use client";

import { createContext, useContext, ReactNode } from 'react';
import { useUser } from '@/features/auth/hooks/use-auth';
import { User } from '@/features/auth/schemas';
import Cookies from 'js-cookie';

interface AuthContextType {
  user: User | null | undefined;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: Error | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: user, isLoading, error } = useUser();
  const token = Cookies.get('token');
  
  const isAuthenticated = !!token && !!user;

  return (
    <AuthContext.Provider
      value={{
        user: user || null,
        isLoading,
        isAuthenticated,
        error: error as Error | null,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

