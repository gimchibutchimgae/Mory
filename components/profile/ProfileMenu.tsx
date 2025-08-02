import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';

export default function ProfileMenu({ onLogout, onWithdraw }: any) {
  return (
    <View style={styles.menuContainer}>
      <View style={styles.menuItem}>
        <ThemedText style={styles.menuText}>성격</ThemedText>
        <ThemedText style={styles.infoValue}>활발하고 감성적</ThemedText>
      </View>
      <TouchableOpacity style={styles.menuItem} onPress={onLogout}>
        <ThemedText style={styles.menuText}>로그아웃</ThemedText>
        <ThemedText style={styles.arrow}>{'>'}</ThemedText>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={onWithdraw}>
        <ThemedText style={styles.withdrawText}>회원탈퇴</ThemedText>
        <ThemedText style={styles.arrow}>{'>'}</ThemedText>
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