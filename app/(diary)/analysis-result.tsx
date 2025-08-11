import * as S from '@/components/ui/StyledAnalysisResult';
import { router } from 'expo-router';
import React, { useEffect } from 'react';

export const options = { headerShown: false };

// 한국 시간대(KST) 기준 오늘 날짜 가져오기
function getKSTToday(): { year: number; month: number; day: number } {
  const now = new Date();
  const kstDate = new Date(now.getTime() + (9 * 60 * 60 * 1000));
  return {
    year: kstDate.getUTCFullYear(),
    month: kstDate.getUTCMonth() + 1,
    day: kstDate.getUTCDate()
  };
}

export default function AnalysisResultScreen() {
  useEffect(() => {
    // 몇 초 후 분석 기록 조회 페이지로 이동
    const timer = setTimeout(() => {
      const today = getKSTToday();
      router.replace(`/record-detail?year=${today.year}&month=${today.month}&day=${today.day}`);
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
