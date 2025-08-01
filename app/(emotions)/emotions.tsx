import * as S from '@/components/ui/EmotionStyle';
import { useRouter } from 'expo-router';
import React from 'react';

export const options = { headerShown: false };

const emotions: S.EmotionType[] = [
  { id: 1, name: '활력 높음', color: ['#FF7342', '#FE2C4D'] as const },
  { id: 2, name: '활력 높음', color: ['#FCDD63', '#FEB821'] as const },
  { id: 3, name: '활력 낮음', color: ['#85B7FC', '#748CFE'] as const },
  { id: 4, name: '활력 낮음', color: ['#7AE9A0', '#4ED491'] as const },
];

export default function EmotionsScreen() {
  const router = useRouter();

  const handleEmotionSelect = (emotion: S.EmotionType) => {
    // 다음 화면으로 이동하는 로직 (나중에 구현)
    console.log('Selected emotion:', emotion);
  };

  return (
    <S.Container>
      <S.Header>
        <S.CloseButton onPress={() => router.back()}>
          <S.ButtonIcon source={require('@/assets/icons/backIcon.svg')} />
        </S.CloseButton>
        <S.SearchButton>
          <S.ButtonIcon source={require('@/assets/icons/searchIcon.svg')} />
        </S.SearchButton>
      </S.Header>

      <S.Content>
        <S.Title>
          다양한 감정을 선택하여{'\n'}살펴보아요
        </S.Title>

        <S.EmotionGrid>
          {emotions.map((emotion) => (
            <S.EmotionButton
              key={emotion.id}
              onPress={() => handleEmotionSelect(emotion)}
            >
              <S.EmotionCircle colors={emotion.color}>
                <S.EmotionTitle>{emotion.name.split(' ')[0]}</S.EmotionTitle>
                <S.EmotionSubtitle>{emotion.name.split(' ')[1]}</S.EmotionSubtitle>
              </S.EmotionCircle>
            </S.EmotionButton>
          ))}
        </S.EmotionGrid>
      </S.Content>
    </S.Container>
  );
}
