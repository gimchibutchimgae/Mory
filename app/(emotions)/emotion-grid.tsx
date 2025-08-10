import * as S from '@/components/ui/EmotionGridStyle';
import { categoryFocus, emotionData, EmotionItem } from '@/data/emotionData';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Dimensions, ScrollView } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export const options = { headerShown: false };

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const BASE_SIZE = 116; // 기본 크기
const SELECTED_SIZE = 206; // 선택된 감정 크기
const NEIGHBOR_SIZE = 142; // 주변 8개 크기

export default function EmotionGridScreen() {
  const router = useRouter();
  const { category } = useLocalSearchParams<{ category: string }>();
  
  const [selectedEmotion, setSelectedEmotion] = useState<EmotionItem | null>(null);

  // 초기 선택된 감정 설정 (카테고리 중심)
  useEffect(() => {
    if (category && categoryFocus[category as keyof typeof categoryFocus]) {
      const focus = categoryFocus[category as keyof typeof categoryFocus];
      // 해당 카테고리의 중심 감정 찾기
      const centerEmotion = emotionData.find(e => e.x === focus.x && e.y === focus.y);
      if (centerEmotion) {
        setSelectedEmotion(centerEmotion);
      }
    }
  }, [category]);

  // 선택된 감정 주변의 8개 감정 찾기
  const getNeighborEmotions = (centerEmotion: EmotionItem): EmotionItem[] => {
    const neighbors: EmotionItem[] = [];
    
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        if (dx === 0 && dy === 0) continue; // 중심 감정 제외
        
        const neighborX = centerEmotion.x + dx;
        const neighborY = centerEmotion.y + dy;
        
        const neighbor = emotionData.find(e => e.x === neighborX && e.y === neighborY);
        if (neighbor) {
          neighbors.push(neighbor);
        }
      }
    }
    
    return neighbors;
  };

  // 감정의 화면상 위치와 크기 계산
  const getEmotionLayout = (emotion: EmotionItem) => {
    if (!selectedEmotion) {
      // 선택된 감정이 없을 때는 원래 격자 형태로 표시 (스크롤 가능)
      const itemSize = BASE_SIZE;
      const padding = 20;
      const spacing = 10;
      
      const x = padding + emotion.x * (itemSize + spacing) + itemSize / 2;
      const y = 150 + emotion.y * (itemSize + spacing) + itemSize / 2;
      
      return {
        x: x,
        y: y,
        size: itemSize,
        isVisible: true
      };
    }

    if (emotion.id === selectedEmotion.id) {
      // 선택된 감정은 화면 중앙에 고정
      return {
        x: SCREEN_WIDTH / 2,
        y: SCREEN_HEIGHT / 2 - 50,
        size: SELECTED_SIZE,
        isVisible: true
      };
    }

    // 주변 8개 감정 확인
    const neighbors = getNeighborEmotions(selectedEmotion);
    const isNeighbor = neighbors.some(n => n.id === emotion.id);
    
    if (isNeighbor) {
      // 주변 감정들: 원래 격자 위치 관계를 유지하면서 선택된 감정 주변으로 모이기
      const neighborSpacing = 180; // 주변 감정들 간의 간격 (조금 더 가깝게)
      
      // 선택된 감정을 중심으로 상대적 위치 계산 (격자 구조 유지)
      const relativeX = emotion.x - selectedEmotion.x;
      const relativeY = emotion.y - selectedEmotion.y;
      
      const x = SCREEN_WIDTH / 2 + relativeX * neighborSpacing;
      const y = SCREEN_HEIGHT / 2 + relativeY * neighborSpacing - 50;
      
      return {
        x: x,
        y: y,
        size: NEIGHBOR_SIZE,
        isVisible: true
      };
    }

    // 나머지 모든 감정들을 작게 표시 (원래 격자 위치 유지)
    const otherItemSize = BASE_SIZE * 0.5; // 50% 크기
    const spacing = otherItemSize + 5; // 간격 조정
    
    // 선택된 감정을 중심으로 상대적 위치 계산 (원래 격자 구조 유지)
    const relativeX = emotion.x - selectedEmotion.x;
    const relativeY = emotion.y - selectedEmotion.y;
    
    const x = SCREEN_WIDTH / 2 + relativeX * spacing;
    const y = SCREEN_HEIGHT / 2 + relativeY * spacing - 50;
    
    // 화면 경계 체크를 더 관대하게
    const margin = 30;
    const isInBounds = x > margin && x < SCREEN_WIDTH - margin && 
                      y > margin + 100 && y < SCREEN_HEIGHT - 280;
    
    return {
      x: x,
      y: y,
      size: otherItemSize,
      isVisible: isInBounds
    };
  };

  // 감정 선택 핸들러
  const handleEmotionPress = (emotion: EmotionItem) => {
    setSelectedEmotion(emotion);
  };

  // 배경 터치 시 선택 해제
  const handleBackgroundPress = () => {
    setSelectedEmotion(null);
  };

  // 감정 선택 완료
  const handleSelectEmotion = () => {
    if (selectedEmotion) {
      console.log('Final selected emotion:', selectedEmotion);
      router.back();
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <S.Container>
        {/* 헤더 */}
        <S.Header>
          <S.BackButton onPress={() => router.back()}>
            <S.ButtonIcon source={require('@/assets/icons/backIcon.svg')} />
          </S.BackButton>
        </S.Header>

        {/* 감정 그리드 */}
        <S.EmotionGrid 
          onPress={handleBackgroundPress}
          activeOpacity={1}
        >
          {!selectedEmotion ? (
            // 선택되지 않은 상태: 스크롤 가능한 격자
            <ScrollView 
              style={{ flex: 1 }}
              showsVerticalScrollIndicator={false}
            >
              <S.GridContainer>
                {emotionData.map((emotion) => {
                  const layout = getEmotionLayout(emotion);
                  
                  return (
                    <S.EmotionItem
                      key={emotion.id}
                      size={layout.size}
                      positionX={layout.x - layout.size / 2}
                      positionY={layout.y - layout.size / 2}
                      onPress={() => handleEmotionPress(emotion)}
                      isSelected={false}
                    >
                      <S.EmotionCircle 
                        backgroundColor={emotion.color}
                        size={layout.size}
                      >
                        <S.EmotionText size={layout.size}>
                          {emotion.name}
                        </S.EmotionText>
                      </S.EmotionCircle>
                    </S.EmotionItem>
                  );
                })}
              </S.GridContainer>
            </ScrollView>
          ) : (
            // 선택된 상태: 중앙 고정 + 원형 배치
            <>
              {emotionData.map((emotion) => {
                const layout = getEmotionLayout(emotion);
                
                if (!layout.isVisible) return null;
                
                const isSelected = selectedEmotion?.id === emotion.id;
                
                return (
                  <S.EmotionItem
                    key={emotion.id}
                    size={layout.size}
                    positionX={layout.x - layout.size / 2}
                    positionY={layout.y - layout.size / 2}
                    onPress={() => handleEmotionPress(emotion)}
                    isSelected={isSelected}
                  >
                    <S.EmotionCircle 
                      backgroundColor={emotion.color}
                      size={layout.size}
                    >
                      <S.EmotionText size={layout.size}>
                        {emotion.name}
                      </S.EmotionText>
                    </S.EmotionCircle>
                  </S.EmotionItem>
                );
              })}
            </>
          )}
        </S.EmotionGrid>

        {/* 하단 선택된 감정 정보 */}
        <S.BottomSheet isVisible={selectedEmotion !== null}>
          {selectedEmotion && (
            <>
              <S.SelectedEmotionTitle>
                {selectedEmotion.name}
              </S.SelectedEmotionTitle>
              <S.SelectedEmotionDescription>
                이 감정이 오늘의 당신 마음과 가장 가까운가요?
              </S.SelectedEmotionDescription>
              <S.SelectButton onPress={handleSelectEmotion}>
                <S.SelectButtonText>이 감정 선택하기</S.SelectButtonText>
              </S.SelectButton>
            </>
          )}
        </S.BottomSheet>
      </S.Container>
    </GestureHandlerRootView>
  );
}
