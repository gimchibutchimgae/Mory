import React from 'react';
import { StyleSheet, Text, type TextProps } from 'react-native';

export function ThemedText(props: TextProps & { type?: 'title' }) {
  const { style, type, ...otherProps } = props;
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
    // 필요하다면 여기서 색상 지정 (예: color: '#222')
  },
});
