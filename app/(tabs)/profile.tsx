import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/Colors';
import ProfileAvatar from '@/components/profile/ProfileAvatar';
import ProfileInfo from '@/components/profile/ProfileInfo';
import ProfileMenu from '@/components/profile/ProfileMenu';
import { FontAwesome } from '@expo/vector-icons';

export const options = { headerShown: false };

export default function ProfileScreen() {
  // 임시 데이터
  const user = {
    name: '조영찬',
    email: 'choyoung0711@gamil.com',
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>프로필</Text>
      <View style={styles.avatarContainer}>
        <ProfileAvatar />
      </View>
      <View style={styles.profileInfoBox}>
        <TouchableOpacity style={styles.editButton}>
          <FontAwesome name="pencil" size={18} color="#003B68" />
        </TouchableOpacity>
        <ProfileInfo user={user} />
        <ProfileMenu />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003B68',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.white,
    alignSelf: 'flex-start',
    marginTop: 40,
    marginLeft: 24,
    marginBottom: 8,
  },
  avatarContainer: {
    marginBottom: -90,
  },
  profileInfoBox: {
    backgroundColor: '#072B4B',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    width: '100%',
    alignItems: 'center',
    paddingTop: 24,
    paddingBottom: 32,
    flex: 1,
  },
  editButton: {
    position: 'absolute',
    right: 30,
    top: -16,
    backgroundColor: '#FFE600',
    borderRadius: 16,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
});

