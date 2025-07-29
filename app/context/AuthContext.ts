import { createContext, useContext } from 'react';

export const AuthContext = createContext<{ signIn: (username: string, password: string) => Promise<void>; signOut: () => Promise<void>; signUp: (name: string, email: string, password: string, mbti?: string, provider?: string) => Promise<void>; updateProfile: (mbti: string) => Promise<void>; getUserInfo: () => Promise<any>; googleSignIn: () => Promise<void>; googleLoginError: string | null; } | null>(null);

export function useAuth() {
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return auth;
}
