import { View, Text, StyleSheet } from 'react-native';
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
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.email}>{user.email}</Text>
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
