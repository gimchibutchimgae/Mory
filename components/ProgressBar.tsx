import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export default function ProgressBar({
  currentStep,
  totalSteps,
}: ProgressBarProps) {
  const animatedWidth = useRef(new Animated.Value(0)).current; // 초기 너비 0으로 설정

  useEffect(() => {
    const targetWidth = (currentStep / totalSteps) * 100; // 목표 너비 (백분율)
    Animated.timing(animatedWidth, {
      toValue: targetWidth,
      duration: 300, // 애니메이션 지속 시간 (밀리초)
      useNativeDriver: false, // 레이아웃 속성을 애니메이션하므로 false로 설정
    }).start();
  }, [currentStep, totalSteps]);

  const widthInterpolated = animatedWidth.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.progressBar, { width: widthInterpolated }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 5,
    backgroundColor: '#555',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 20,
  },
  progressBar: {
    height: '100%',
    backgroundColor: 'yellow',
    borderRadius: 5,
  },
});
