import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useState, useMemo } from 'react';

import { AuthContext } from '@/app/context/AuthContext';

export default function RootLayout() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const authContext = useMemo(
    () => ({
      signIn: async () => {
        // Simulate a network request
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsSignedIn(true);
      },
      signOut: () => {
        setIsSignedIn(false);
      },
      signUp: async () => {
        // Simulate a network request
        await new Promise(resolve => setTimeout(resolve, 1000));
      },
    }),
    [],
  );

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
