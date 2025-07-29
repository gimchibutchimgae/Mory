import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useMemo, useState } from 'react';
import 'react-native-reanimated';

import { AuthContext } from '@/app/context/AuthContext';

export default function RootLayout() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const authContext = useMemo(
    () => ({
      signIn: () => {
        setIsSignedIn(true);
      },
    }),
    [],
  );

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
