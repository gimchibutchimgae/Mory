import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Themes } from '@/constants/Themes';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

interface InputWithIconProps {
  iconName?: keyof typeof MaterialCommunityIcons.glyphMap; // 아이콘은 선택적
  placeholder: string;
  secureTextEntry?: boolean;
  showEyeIcon?: boolean; // 눈 아이콘 표시 여부
  value: string;
  onChangeText: (text: string) => void;
  error?: string; // 오류 메시지 추가
}

export default function InputWithIcon({
  iconName,
  placeholder,
  secureTextEntry = false,
  showEyeIcon = false,
  value,
  onChangeText,
  error,
}: InputWithIconProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(!secureTextEntry); // secureTextEntry가 true면 초기에는 가려진 상태
  const shake = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: shake.value }],
    };
  });

  useEffect(() => {
    if (error) {
      shake.value = withSequence(
        withTiming(-10, { duration: 50 }),
        withTiming(10, { duration: 50 }),
        withTiming(-10, { duration: 50 }),
        withTiming(10, { duration: 50 }),
        withTiming(0, { duration: 50 })
      );
    }
  }, [error]);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={styles.wrapper}>
      <Animated.View style={[styles.container, error ? styles.errorBorder : {}, animatedStyle]}>
        {iconName && (
          <MaterialCommunityIcons name={iconName} size={24} color={Themes.gray} style={styles.icon} />
        )}
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={Themes.lightGray}
          secureTextEntry={secureTextEntry && !isPasswordVisible} // secureTextEntry와 isPasswordVisible 상태에 따라 결정
          value={value}
          onChangeText={onChangeText}
        />
        {showEyeIcon && (
          <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
            <MaterialCommunityIcons
              name={isPasswordVisible ? "eye-off" : "eye"}
              size={24}
              color={Themes.gray}
            />
          </TouchableOpacity>
        )}
      </Animated.View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    marginBottom: 15,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Themes.white,
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 50,
    width: '100%',
    borderColor: Themes.gray,
    borderWidth: 1,
  },
  errorBorder: {
    borderColor: 'red',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: '100%',
    color: Themes.black,
  },
  eyeIcon: {
    padding: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
    marginLeft: 5,
  },
});