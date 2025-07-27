import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useState, useMemo, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, View } from 'react-native';

import { AuthContext } from '@/app/context/AuthContext';
import { Theme } from '@/constants/Themes';

export default function RootLayout() {
  const [isSignedIn, setIsSignedIn] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

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

  const authContext = useMemo(
    () => ({
      signIn: async () => {
        // Simulate a network request
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsSignedIn(true);
        await AsyncStorage.setItem('isSignedIn', JSON.stringify(true));
      },
      signOut: async () => {
        setIsSignedIn(false);
        await AsyncStorage.removeItem('isSignedIn');
      },
      signUp: async () => {
        // Simulate a network request
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsSignedIn(true);
        await AsyncStorage.setItem('isSignedIn', JSON.stringify(true));
      },
    }),
    [],
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
