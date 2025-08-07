import { useAuth } from '@/app/context/AuthContext';
import * as S from '@/components/ui/StyledWaiting';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';

export const options = { headerShown: false };

export default function WaitingScreen() {
  const { diaryId } = useLocalSearchParams<{ diaryId: string }>();
  const { token } = useAuth();
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    if (diaryId && token) {
      startAnalysis();
    }
  }, [diaryId, token]);

  const startAnalysis = async () => {
    if (!diaryId || !token) {
      Alert.alert('오류', '필요한 정보가 없습니다.');
      router.back();
      return;
    }

    setIsAnalyzing(true);

    try {
      console.log('📊 Starting diary analysis for ID:', diaryId);
      
      const response = await fetch('https://mory-backend-production.up.railway.app/analysis/gpt', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          diaryId: parseInt(diaryId)
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`❌ Analysis error: ${response.status} - ${errorText}`);
        throw new Error(`Analysis error: ${response.status} - ${errorText}`);
      }

      const analysisResult = await response.json();
      console.log('✅ Analysis completed:', analysisResult);

      // 분석 완료 후 결과 화면으로 이동
      router.replace('/(diary)/analysis-result');
      
    } catch (error) {
      console.error('분석 오류:', error);
      Alert.alert('오류', '일기 분석에 실패했습니다. 다시 시도해주세요.');
      router.back();
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <S.Container>
      <S.ContentContainer>
        <S.CharacterContainer>
          <S.MoryCharacter 
            source={require('@/assets/images/mory_initial.png')}
          />
        </S.CharacterContainer>
        
        <S.TitleText>모리의 당신의 감정을 분석 중</S.TitleText>
        
        <S.LoadingContainer>
          <S.LoadingBar />
        </S.LoadingContainer>
      </S.ContentContainer>
    </S.Container>
  );
}
