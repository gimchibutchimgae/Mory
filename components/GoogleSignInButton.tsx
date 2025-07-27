import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

interface GoogleSignInButtonProps {
  onPress: () => void;
}

export default function GoogleSignInButton({ onPress }: GoogleSignInButtonProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <AntDesign name="google" size={24} color={Colors.googleRed} />
      <Text style={styles.buttonText}>구글로 로그인 하기</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
});