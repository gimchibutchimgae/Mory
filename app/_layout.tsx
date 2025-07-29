import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useState, useMemo, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, View } from 'react-native';
import axios from 'axios';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';

import { AuthContext } from '@/app/context/AuthContext';
import { Theme } from '@/constants/Themes';

WebBrowser.maybeCompleteAuthSession();

const API_BASE_URL = 'https://mory-backend-production.up.railway.app';

export default function RootLayout() {
  const [isSignedIn, setIsSignedIn] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  // Google OAuth 클라이언트 ID 설정 (YOUR_IOS_CLIENT_ID, YOUR_ANDROID_CLIENT_ID, YOUR_WEB_CLIENT_ID를 실제 값으로 대체해야 합니다.)
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: '345186859602-blrocse1jsis9na1jrh6unr5gk68nm2q.apps.googleusercontent.com',
    androidClientId: '345186859602-blrocse1jsis9na1jrh6unr5gk68nm2q.apps.googleusercontent.com',
    webClientId: '345186859602-blrocse1jsis9na1jrh6unr5gk68nm2q.apps.googleusercontent.com',
  });

  useEffect(() => {
    const loadSignInStatus = async () => {
      try {
        const storedStatus = await AsyncStorage.getItem('isSignedIn');
        if (storedStatus !== null) {
          setIsSignedIn(JSON.parse(storedStatus));
        } else {
          setIsSignedIn(false);
        }
      } catch (e) {
        console.error('Failed to load sign-in status', e);
        setIsSignedIn(false);
      } finally {
        setLoading(false);
      }
    };

    loadSignInStatus();
  }, []);

  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      if (authentication?.accessToken) {
        // Google 로그인 성공 후 서버에 accessToken 전달
        googleSignInToServer(authentication.accessToken);
      }
    }
  }, [response]);

  const googleSignInToServer = async (accessToken: string) => {
    try {
      const res = await axios.get(`${API_BASE_URL}/auth/google/redirect`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (res.data.status === 'login') {
        const { accessToken: jwtAccessToken } = res.data.value;
        await AsyncStorage.setItem('accessToken', jwtAccessToken);
        await AsyncStorage.setItem('isSignedIn', JSON.stringify(true));
        setIsSignedIn(true);
      } else if (res.data.status === 'register') {
        // 회원가입이 필요한 경우, 추가 정보 입력 페이지로 이동하거나 처리
        console.log('User needs to register:', res.data.value);
        // 예: router.push('/(auth)/signup', { params: { email: res.data.value.email, name: res.data.value.name, provider: res.data.value.provider } });
      }
    } catch (error) {
      console.error('Google sign-in to server failed:', error);
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || 'Google 로그인에 실패했습니다.');
      } else {
        throw error;
      }
    }
  };

  const authContext = useMemo(
    () => ({
      signIn: async (username, password) => {
        try {
          const response = await axios.post(`${API_BASE_URL}/auth/login`, {
            email: username,
            password,
          });
          const { accessToken } = response.data;
          await AsyncStorage.setItem('accessToken', accessToken);
          await AsyncStorage.setItem('isSignedIn', JSON.stringify(true));
          setIsSignedIn(true);
        } catch (error) {
          if (axios.isAxiosError(error) && error.response) {
            console.error('Login failed:', error.response.data);
            throw new Error(error.response.data.message || '로그인에 실패했습니다.');
          } else {
            console.error('Login failed:', error);
            throw error;
          }
        }
      },
      signOut: async () => {
        setIsSignedIn(false);
        await AsyncStorage.removeItem('isSignedIn');
        await AsyncStorage.removeItem('accessToken');
      },
      signUp: async (name, email, password, mbti, provider) => {
        try {
          const response = await axios.post(`${API_BASE_URL}/auth/register`, {
            email,
            name,
            password,
            mbti: mbti || 'EF',
            provider: provider || 'local',
          });
          await AsyncStorage.setItem('isSignedIn', JSON.stringify(true));
          setIsSignedIn(true);
        } catch (error) {
          if (axios.isAxiosError(error) && error.response) {
            console.error('Sign up failed:', error.response.data);
            throw new Error(error.response.data.message || '회원가입에 실패했습니다.');
          } else {
            console.error('Sign up failed:', error);
            throw error;
          }
        }
      },
      updateProfile: async (mbti: string) => {
        try {
          const accessToken = await AsyncStorage.getItem('accessToken');
          if (!accessToken) {
            throw new Error('No access token found');
          }
          await axios.patch(`${API_BASE_URL}/auth`,
            { mbti },
            { headers: { Authorization: `Bearer ${accessToken}` } }
          );
        } catch (error) {
          console.error('Profile update failed:', error);
          throw error;
        }
      },
      googleSignIn: async () => {
        await promptAsync();
      },
    }),
    [promptAsync],
  );

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Theme.colors.primaryBackground }}>
        <ActivityIndicator size="large" color={Theme.colors.white} />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={authContext}>
      <Stack>
        {isSignedIn ? (
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        ) : (
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        )}
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </AuthContext.Provider>
  );
}
