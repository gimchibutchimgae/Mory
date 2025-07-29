import NavBar from '@/components/navBar/NavBar';
import { Stack } from 'expo-router';
import { View } from 'react-native';

export default function CalendarLayout() {
  return (
    <View style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
      </Stack>
      <NavBar />
    </View>
  );
}
