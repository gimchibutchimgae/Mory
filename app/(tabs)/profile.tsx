import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/Colors';
import ProfileAvatar from '@/components/profile/ProfileAvatar';
import ProfileInfo from '@/components/profile/ProfileInfo';
import ProfileMenu from '@/components/profile/ProfileMenu';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import { useUser } from '@/app/context/UserContext';

export const options = { headerShown: false };

export default function ProfileScreen() {
  const { userName, userPersonality1, userPersonality2 } = useUser();

  // 임시 데이터 (UserContext에서 가져온 데이터로 대체)
  const user = {
    name: userName || '사용자',
    email: 'choyoung0711@gamil.com',
  };

  const handleLogout = () => {
    // 로그아웃 로직
    console.log('로그아웃');
  };

  const handleWithdraw = () => {
    // 회원탈퇴 로직
    console.log('회원탈퇴');
  };

  return (
    <View style={styles.container}>
      <ThemedText style={styles.title}>프로필</ThemedText>
      <View style={styles.avatarContainer}>
        <ProfileAvatar />
      </View>
      <View style={styles.profileInfoBox}>
        <TouchableOpacity style={styles.editButton}>
          <MaterialCommunityIcons name="pencil" size={18} color="#003B68" />
        </TouchableOpacity>
        <ProfileInfo user={user} />
        <ProfileMenu
          userPersonality1={userPersonality1}
          userPersonality2={userPersonality2}
          onLogout={handleLogout}
          onWithdraw={handleWithdraw}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00223D',
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
    marginBottom: -117, // 234 * 1/2
  },
  profileInfoBox: {
    backgroundColor: '#00274e',
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



