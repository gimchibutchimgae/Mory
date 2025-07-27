import { Text, View } from 'react-native';
import { Theme } from '@/constants/Themes';

export default function ProfileScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: Theme.colors.primaryBackground }}>
      <Text style={{ fontSize: Theme.fontSizes.large, fontWeight: 'bold', color: Theme.colors.white }}>홈</Text>
    </View>
  );
}