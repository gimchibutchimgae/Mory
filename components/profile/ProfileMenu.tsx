import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface ProfileMenuProps {
  userPersonality1: '활발' | '소심' | null;
  userPersonality2: '감성적' | '이성적' | null;
  onLogout: () => void;
  onWithdraw: () => void;
}

export default function ProfileMenu({ userPersonality1, userPersonality2, onLogout, onWithdraw }: ProfileMenuProps) {
  const router = useRouter();

  const displayPersonality = () => {
    let personalityText = '';
    if (userPersonality1) {
      personalityText += userPersonality1;
    }
    if (userPersonality2) {
      personalityText += (personalityText ? '하고 ' : '') + userPersonality2;
    }
    return personalityText || '미설정';
  };

  return (
    <View style={styles.menuContainer}>
      <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/(auth)/personality-selection')}>
        <ThemedText style={styles.menuText}>성격</ThemedText>
        <ThemedText style={styles.infoValue}>{displayPersonality()}</ThemedText>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={onLogout}>
        <ThemedText style={styles.menuText}>로그아웃</ThemedText>
        <MaterialCommunityIcons name="chevron-right" size={24} color={Colors.lightGray} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={onWithdraw}>
        <ThemedText style={styles.withdrawText}>회원탈퇴</ThemedText>
        <MaterialCommunityIcons name="chevron-right" size={24} color={Colors.lightGray} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  menuContainer: {
    width: '100%',
    marginTop: 16,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#2B4A6F',
    marginLeft: '5%',
  },
  menuText: {
    color: Colors.white,
    fontSize: 16,
  },
  infoValue: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: '500',
  },
  withdrawText: {
    color: '#FF5A5A',
    fontSize: 16,
  },
});