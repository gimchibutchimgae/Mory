import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/Colors';

export default function ProfileMenu({ onLogout, onWithdraw }: any) {
  return (
    <View style={styles.menuContainer}>
      <View style={styles.menuItem}>
        <Text style={styles.menuText}>성격</Text>
        <Text style={styles.infoValue}>활발하고 감성적</Text>
      </View>
      <TouchableOpacity style={styles.menuItem} onPress={onLogout}>
        <Text style={styles.menuText}>로그아웃</Text>
        <Text style={styles.arrow}>{'>'}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={onWithdraw}>
        <Text style={styles.withdrawText}>회원탈퇴</Text>
        <Text style={styles.arrow}>{'>'}</Text>
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
  arrow: {
    color: '#B0B8C1',
    fontSize: 18,
    fontWeight: 'bold',
  },
});