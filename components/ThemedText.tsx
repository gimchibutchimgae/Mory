import { Colors } from '@/constants/Colors';
import React from 'react';
import { StyleSheet, Text, type TextProps } from 'react-native';

export type ThemedTextProps = TextProps & {
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

export function ThemedText({
  style,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const color = Colors.black; // 기본 텍스트 색상을 black으로 설정

  return (
    <Text
      style={[
        type === 'title' && styles.title,
        style,
      ]}
      {...otherProps}
    />
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: Colors.yellow, // 링크 색상을 yellow로 설정
  },
});
