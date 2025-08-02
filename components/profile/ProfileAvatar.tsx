import { View, StyleSheet, Image } from 'react-native';

export default function ProfileAvatar() {
  return (
    <View style={styles.avatarWrapper}>
      <Image source={require('@/assets/images/mory_initial.png')} style={styles.avatar} />
    </View>
  );
}

const styles = StyleSheet.create({
  avatarWrapper: {
    position: 'relative',
    marginBottom: 8,
    marginTop: 8,
  },
  avatar: {
    width: 234,
    height: 234,
    resizeMode: 'contain',
  },
});

