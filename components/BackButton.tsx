import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Themes } from '@/constants/Themes';

interface BackButtonProps {
  onPress?: () => void; // onPress prop 추가
}

export default function BackButton({ onPress }: BackButtonProps) {
  const router = useRouter();
  return (
    <TouchableOpacity onPress={onPress || (() => router.back())} style={styles.container}>
      <MaterialIcons name="arrow-back-ios" size={24} color={Themes.white} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});