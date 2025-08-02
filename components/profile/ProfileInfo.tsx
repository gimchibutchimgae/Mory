import { View, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';

interface ProfileInfoProps {
  user: {
    name: string;
    email: string;
  };
}

export default function ProfileInfo({ user }: ProfileInfoProps) {
  return (
    <View style={styles.container}>
      <ThemedText style={styles.name}>{user.name}</ThemedText>
      <ThemedText style={styles.email}>{user.email}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
    marginBottom: 16,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.white,
    marginTop: 0,
    marginBottom: 2,
  },
  email: {
    fontSize: 13,
    color: '#B0B8C1',
  },
});
