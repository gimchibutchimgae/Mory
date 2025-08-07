import { Stack } from 'expo-router';

export default function DiaryLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="write" />
      <Stack.Screen name="waiting" />
      <Stack.Screen name="analysis-result" />
    </Stack>
  );
}
