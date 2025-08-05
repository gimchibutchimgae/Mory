import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { router } from 'expo-router';
import { Alert } from 'react-native';
import { deleteAccountApi } from '@/api/auth';
import { jwtDecode } from "jwt-decode";

interface AuthContextType {
  token: string | null;
  userEmail: string | null;
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

interface DecodedToken {
  email: string;
  // 다른 필드들도 필요하다면 여기에 추가
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const loadToken = async () => {
      const storedToken = await AsyncStorage.getItem('userToken');
      if (storedToken) {
        setToken(storedToken);
        try {
          const decoded: DecodedToken = jwtDecode(storedToken);
          setUserEmail(decoded.email);
        } catch (error) {
          console.error("Failed to decode token:", error);
          setToken(null);
          setUserEmail(null);
          await AsyncStorage.removeItem('userToken');
        }
      }
    };
    loadToken();
  }, []);

  const signIn = async (newToken: string) => {
    setToken(newToken);
    await AsyncStorage.setItem('userToken', newToken);
    try {
      const decoded: DecodedToken = jwtDecode(newToken);
      setUserEmail(decoded.email);
    } catch (error) {
      console.error("Failed to decode token on sign-in:", error);
      setUserEmail(null);
    }
  };

  const signOut = async () => {
    setToken(null);
    setUserEmail(null);
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
    <AuthContext.Provider value={{ token, userEmail, signIn, signOut, deleteAccount }}>
      {children}
    </AuthContext.Provider>
  );
}
