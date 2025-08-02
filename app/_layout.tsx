import { Stack, SplashScreen } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useMemo, useState, useEffect } from 'react';
import 'react-native-reanimated';
import { useFonts } from 'expo-font';

import { AuthContext } from '@/app/context/AuthContext';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isSignedIn, setIsSignedIn] = useState(false);
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

  const authContext = useMemo(
    () => ({
      signIn: () => {
        setIsSignedIn(true);
      },
    }),
    [],
  );

  if (!loaded) {
    return null;
  }

  return (
    <AuthContext.Provider value={authContext}>
      <Stack>
        {isSignedIn ? (
          <>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="(calendar)" options={{ headerShown: false }} />
          </>
        ) : (
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        )}
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </AuthContext.Provider>
  );
}
