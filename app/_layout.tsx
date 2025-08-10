import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { AuthProvider, useAuth } from '@/app/context/AuthContext';
import { CalendarProvider } from '@/app/context/CalendarContext';
import { UserProvider } from '@/app/context/UserContext';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'Pretendard': require('../assets/fonts/PretendardVariable.ttf'),
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider>
      <UserProvider>
        <CalendarProvider>
          <RootLayoutNav />
          <StatusBar style="auto" />
        </CalendarProvider>
      </UserProvider>
    </AuthProvider>
  );
}

function RootLayoutNav() {
  const { token } = useAuth();

  const screenOptions = {
    headerShown: false, // 상단 헤더 완전히 숨김
    animation: "none" as const, // 애니메이션 없음
    presentation: "card" as const, // 카드 스타일로 설정
    animationDuration: 0, // 애니메이션 지속시간 0
    gestureEnabled: false, // 스와이프 제스처 비활성화
  };

  return (
    <Stack>
      {token ? (
        <>
          <Stack.Screen name="(tabs)" options={screenOptions} />
          <Stack.Screen name="(calendar)" options={screenOptions} />
          <Stack.Screen name="(diary)" options={screenOptions} />
          <Stack.Screen name="record-detail" options={screenOptions} />
        </>
      ) : (
        <Stack.Screen name="(auth)" options={screenOptions} />
      )}
      <Stack.Screen name="+not-found" options={screenOptions} />
    </Stack>
  );
}
