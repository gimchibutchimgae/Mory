import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

interface AuthContextType {
  token: string | null;
  signIn: (newToken: string) => void;
  signOut: () => void;
  deleteAccount: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return auth;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const loadToken = async () => {
      const storedToken = await AsyncStorage.getItem('userToken');
      if (storedToken) {
        setToken(storedToken);
      }
    };
    loadToken();
  }, []);

  const signIn = async (newToken: string) => {
    setToken(newToken);
    await AsyncStorage.setItem('userToken', newToken);
  };

  const signOut = async () => {
    setToken(null);
    await AsyncStorage.removeItem('userToken');
    router.replace('/(auth)/login');
  };

  const deleteAccount = async () => {
    try {
      const response = await fetch('https://mory-backend-production.up.railway.app/auth/me', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        console.log('Account deleted successfully');
        await signOut(); // 계정 삭제 후 로그아웃 처리
      } else {
        const errorData = await response.json();
        console.error('Failed to delete account:', errorData);
        alert(`회원 탈퇴 실패: ${errorData.message || '알 수 없는 오류'}`);
      }
    } catch (error) {
      console.error('Error deleting account:', error);
      alert('회원 탈퇴 중 오류가 발생했습니다.');
    }
  };

  return (
    <AuthContext.Provider value={{ token, signIn, signOut, deleteAccount }}>
      {children}
    </AuthContext.Provider>
  );
}
