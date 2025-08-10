import { Stack } from 'expo-router';

export default function EmotionsLayout() {
  return (
    <Stack>
      <Stack.Screen name="emotions" options={{ headerShown: false }} />
      <Stack.Screen name="emotion-grid" options={{ headerShown: false }} />
      <Stack.Screen name="emotion-detail" options={{ headerShown: false }} />
      <Stack.Screen name="emotion-expanded" options={{ headerShown: false }} />
    </Stack>
  );
}
