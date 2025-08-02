import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { Alert } from 'react-native'; // Alert import 추가
import { deleteAccountApi } from '@/api/auth'; // deleteAccountApi import 추가

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
      if (!token) {
        Alert.alert('오류', '로그인 상태가 아닙니다.');
        return;
      }
      await deleteAccountApi(token);
      console.log('Account deleted successfully');
      await signOut(); // 계정 삭제 후 로그아웃 처리
      Alert.alert('성공', '회원 탈퇴가 완료되었습니다.');
    } catch (error: any) {
      console.error('Error deleting account:', error);
      Alert.alert('회원 탈퇴 실패', error.message || '알 수 없는 오류가 발생했습니다.');
    }
  };

  return (
    <AuthContext.Provider value={{ token, signIn, signOut, deleteAccount }}>
      {children}
    </AuthContext.Provider>
  );
}
