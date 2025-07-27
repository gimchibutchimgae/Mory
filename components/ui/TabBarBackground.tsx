import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Themes } from '@/constants/Themes';

export default function TabBarBackground() {
  return <View style={styles.container} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Themes.darkPrimaryBackground, // 더 어두운 배경색 적용
  },
});