import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { api } from '../api/client';

export interface AuthUser {
  id: string;
  username: string;
  displayName: string;
  email?: string;
  campus?: string;
  city?: string;
}

export interface RegisterPayload {
  username: string;
  displayName: string;
  email?: string;
  campus?: string;
  city?: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  isSignedIn: boolean;
  loading: boolean;
  signIn: (username: string) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  signOut: () => void;
  deleteAccount: () => Promise<void>;
  updateUser: (patch: Partial<AuthUser>) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(false);

  const signIn = useCallback(async (_username: string) => {
    setLoading(true);
    try {
      const data = (await api.session('demo')) as { user: AuthUser };
      setUser(data.user);
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (payload: RegisterPayload) => {
    setLoading(true);
    try {
      const data = (await api.register(payload as unknown as Record<string, string>)) as { user: AuthUser };
      setUser(data.user);
    } finally {
      setLoading(false);
    }
  }, []);

  const signOut = useCallback(() => {
    setUser(null);
  }, []);

  const deleteAccount = useCallback(async () => {
    await api.deleteAccount();
    setUser(null);
  }, []);

  const updateUser = useCallback((patch: Partial<AuthUser>) => {
    setUser((prev) => (prev ? { ...prev, ...patch } : prev));
  }, []);

  const value = useMemo(
    () => ({ user, isSignedIn: user !== null, loading, signIn, register, signOut, deleteAccount, updateUser }),
    [user, loading, signIn, register, signOut, deleteAccount, updateUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
