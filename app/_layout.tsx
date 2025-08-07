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

  return (
    <Stack>
      {token ? (
        <>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(calendar)" options={{ headerShown: false }} />
          <Stack.Screen name="(diary)" options={{ headerShown: false }} />
        </>
      ) : (
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      )}
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}

