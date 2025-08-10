import * as S from '@/components/ui/EmotionStyle';
import { useRouter } from 'expo-router';
import React from 'react';

export const options = { headerShown: false };

const emotions: S.EmotionType[] = [
  { id: 1, name: '활력 높음', color: '#FF7342', category: 'red' },
  { id: 2, name: '활력 높음', color: '#FCDD63', category: 'yellow' },
  { id: 3, name: '활력 낮음', color: '#85B7FC', category: 'blue' },
  { id: 4, name: '활력 낮음', color: '#7AE9A0', category: 'green' },
];

export default function EmotionsScreen() {
  const router = useRouter();

  const handleEmotionSelect = (emotion: S.EmotionType) => {
    // 감정 그리드 페이지로 이동 (카테고리 정보 전달)
    router.push(`/(emotions)/emotion-grid?category=${emotion.category}`);
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
              <S.EmotionCircle backgroundColor={emotion.color}>
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
