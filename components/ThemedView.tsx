import { Colors } from '@/constants/Colors';
import React from 'react';
import { View, type ViewProps } from 'react-native';

export type ThemedViewProps = ViewProps & {};

export function ThemedView({ style, ...otherProps }: ThemedViewProps) {
  const backgroundColor = Colors.primaryBackground; // 기본 배경색을 primaryBackground로 설정

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}