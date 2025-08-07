import * as S from '@/components/ui/StyledAnalysisResult';
import { router } from 'expo-router';
import React, { useEffect } from 'react';

export const options = { headerShown: false };

export default function AnalysisResultScreen() {
  useEffect(() => {
    // 몇 초 후 분석 결과 화면으로 이동 (임시로 홈으로 이동)
    const timer = setTimeout(() => {
      router.replace('/(tabs)');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <S.Container>
      <S.ContentContainer>
        <S.ResultText>오늘의 일기 분석 결과...</S.ResultText>
      </S.ContentContainer>
    </S.Container>
  );
}
