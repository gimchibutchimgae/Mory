import { createContext, useContext } from 'react';

export const AuthContext = createContext<{ signIn: () => void } | null>(null);

export function useAuth() {
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return auth;
}
