import React, { createContext, useContext, useEffect, useState } from 'react';
import { AdminUser } from '@/lib/supabase';

interface AuthContextType {
  user: AdminUser | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedToken = localStorage.getItem('aureum_admin_token');
    const savedUser = localStorage.getItem('aureum_admin_user');

    if (savedToken && savedUser) {
      try {
        const decoded = JSON.parse(atob(savedToken));
        if (decoded.exp > Date.now()) {
          setToken(savedToken);
          setUser(JSON.parse(savedUser));
        } else {
          localStorage.removeItem('aureum_admin_token');
          localStorage.removeItem('aureum_admin_user');
        }
      } catch (error) {
        localStorage.removeItem('aureum_admin_token');
        localStorage.removeItem('aureum_admin_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch('https://kyejpmmlxhpzxzwadnlq.supabase.co/functions/v1/auth-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error?.message || 'Login failed');
      }

      const { user, token } = result.data;
      
      setUser(user);
      setToken(token);
      localStorage.setItem('aureum_admin_token', token);
      localStorage.setItem('aureum_admin_user', JSON.stringify(user));
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('aureum_admin_token');
    localStorage.removeItem('aureum_admin_user');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
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