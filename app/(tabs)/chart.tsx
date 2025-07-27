import { Text, View } from 'react-native';
import { Colors } from '@/constants/Colors';

export default function ProfileScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.primaryBackground }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', color: Colors.white }}>기록</Text>
    </View>
  );
}