import { Text, View, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { useAuth } from '@/app/context/AuthContext';
import { useState, useEffect } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { Theme } from '@/constants/Themes';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'https://mory-backend-production.up.railway.app';

export default function ProfileScreen() {
  const { getUserInfo, signOut } = useAuth();
  const [userInfo, setUserInfo] = useState<any>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const info = await getUserInfo();
      setUserInfo(info);
    };
    fetchUserInfo();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      Alert.alert('오류', '로그아웃에 실패했습니다.');
    }
  };

  const handleWithdraw = async () => {
    Alert.alert(
      '회원탈퇴',
      '정말로 회원탈퇴 하시겠습니까? 모든 데이터가 삭제됩니다.',
      [
        { text: '취소', style: 'cancel' },
        {
          text: '탈퇴',
          onPress: async () => {
            try {
              const accessToken = await AsyncStorage.getItem('accessToken');
              if (!accessToken) throw new Error('No access token found');
              await axios.delete(`${API_BASE_URL}/auth/me`, {
                headers: { Authorization: `Bearer ${accessToken}` },
              });
              await signOut();
              Alert.alert('성공', '회원탈퇴가 완료되었습니다.');
            } catch (error) {
              Alert.alert('오류', '회원탈퇴에 실패했습니다.');
            }
          },
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };

  if (!userInfo) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>사용자 정보를 불러오는 중...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* 상단 배경 */}
      <View style={styles.headerBackground}>
        <Text style={styles.headerTitle}>프로필</Text>
        <View style={styles.avatarContainer}>
          <Image
            source={require('@/assets/images/default_avatar.png')}
            style={styles.avatar}
          />
          <TouchableOpacity style={styles.editIcon}>
            <MaterialIcons name="edit" size={22} color="#222" />
          </TouchableOpacity>
        </View>
      </View>

      {/* 하단 카드 */}
      <View style={styles.card}>
        <Text style={styles.name}>{userInfo.name}</Text>
        <Text style={styles.email}>{userInfo.email}</Text>

        <View style={styles.traitRow}>
          <Text style={styles.traitLabel}>성격</Text>
          <Text style={styles.traitValue}>활발하고 감성적</Text>
        </View>

        <View style={styles.divider} />

        <TouchableOpacity style={styles.menuRow} onPress={handleSignOut}>
          <Text style={styles.menuText}>로그아웃</Text>
          <MaterialIcons name="chevron-right" size={22} color={Theme.colors.lightGray} />
        </TouchableOpacity>
        <View style={styles.divider} />

        <TouchableOpacity style={styles.menuRow} onPress={handleWithdraw}>
          <Text style={styles.withdrawText}>회원탈퇴</Text>
          <MaterialIcons name="chevron-right" size={22} color={Theme.colors.lightGray} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.primaryBackground,
  },
  headerBackground: {
    backgroundColor: Theme.colors.primaryBackground,
    paddingTop: 56,
    paddingBottom: 24,
    alignItems: 'center',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  card: {
    backgroundColor: Theme.colors.primaryBackground,
    marginHorizontal: 0,
    marginTop: -16,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingTop: 32,
    alignItems: 'center',
    flex: 1,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginLeft: 24,
    marginBottom: 12,
  },
  avatarContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#fff',
  },
  editIcon: {
    position: 'absolute',
    right: -6,
    bottom: 6,
    backgroundColor: '#FFE600',
    borderRadius: 16,
    padding: 6,
    borderWidth: 2,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  name: {
    color: Theme.colors.white,
    fontSize: Theme.fontSizes.xLarge,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  email: {
    color: Theme.colors.lightGray,
    fontSize: Theme.fontSizes.medium,
    marginBottom: 24,
  },
  traitRow: {
    flexDirection: 'row',
    width: '85%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  traitLabel: {
    color: '#B0C4DE',
    fontSize: 15,
    fontWeight: 'bold',
  },
  traitValue: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '500',
  },
  divider: {
    width: '90%',
    height: 1,
    backgroundColor: '#2C4766',
    alignSelf: 'center',
    marginVertical: 6,
  },
  menuRow: {
    flexDirection: 'row',
    width: '90%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
  },
  menuText: {
    color: '#fff',
    fontSize: 16,
  },
  withdrawText: {
    color: '#FF6B6B',
    fontSize: 16,
  },
  loadingText: {
    color: '#fff',
    fontSize: 16,
    marginTop: 40,
  },
});