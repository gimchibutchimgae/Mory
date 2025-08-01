import { Stack } from 'expo-router';

export default function EmotionsLayout() {
  return (
    <Stack>
      <Stack.Screen name="emotions" options={{ headerShown: false }} />
    </Stack>
  );
}
