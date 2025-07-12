import { NaviBar } from '@/components/navBar/NavBar';
import * as Font from 'expo-font';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Text, TextProps, View } from 'react-native';
import 'react-native-reanimated';

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    Font.loadAsync({
      Pretendard: require('../assets/fonts/PretendardVariable.ttf'),
    }).then(() => setFontsLoaded(true));
  }, []);

  if (!loaded) {
    return null;
  }

  if (!fontsLoaded) {
    return <View style={{flex:1, justifyContent:'center', alignItems:'center'}}><ActivityIndicator /></View>;
  }

  return (
    <>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <NaviBar />
      <StatusBar style="auto" />
    </>
  );
}

export function ThemedText(props: TextProps) {
  return (
    <Text {...props} style={[{ fontFamily: 'Pretendard' }, props.style]}>
      {props.children}
    </Text>
  );
}
