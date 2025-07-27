import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

interface InputWithIconProps {
  iconName?: keyof typeof MaterialCommunityIcons.glyphMap; // 아이콘은 선택적
  placeholder: string;
  secureTextEntry?: boolean;
  showEyeIcon?: boolean; // 눈 아이콘 표시 여부
  value: string;
  onChangeText: (text: string) => void;
}

export default function InputWithIcon({
  iconName,
  placeholder,
  secureTextEntry = false,
  showEyeIcon = false,
  value,
  onChangeText,
}: InputWithIconProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(!secureTextEntry); // secureTextEntry가 true면 초기에는 가려진 상태

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={styles.container}>
      {iconName && (
        <MaterialCommunityIcons name={iconName} size={24} color={Colors.gray} style={styles.icon} />
      )}
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={Colors.lightGray}
        secureTextEntry={secureTextEntry && !isPasswordVisible} // secureTextEntry와 isPasswordVisible 상태에 따라 결정
        value={value}
        onChangeText={onChangeText}
      />
      {showEyeIcon && (
        <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
          <MaterialCommunityIcons
            name={isPasswordVisible ? "eye-off" : "eye"}
            size={24}
            color={Colors.gray}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    height: 50,
    width: '100%',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: '100%',
    color: Colors.black,
  },
  eyeIcon: {
    padding: 10,
  },
});