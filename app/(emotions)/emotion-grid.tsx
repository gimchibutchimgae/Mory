import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  Dimensions,
  Animated,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { GestureHandlerRootView, PanGestureHandler, State } from 'react-native-gesture-handler';
import { emotionData, EmotionItem } from '@/data/emotionData';
import * as Haptics from 'expo-haptics';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// 애플워치 스타일 상수
const BUBBLE_SIZE = {
  SMALL: 35,
  MEDIUM: 60,
  LARGE: 90,
  SELECTED: 130
};

// 허니콤 그리드 상수
const HEX_GRID = {
  RADIUS: 35, // 기본 반지름
  SPACING: 70, // 원 간격
  RINGS: 4, // 총 링 개수
};

export default function EmotionGridScreen() {
  const router = useRouter();
  const { category } = useLocalSearchParams();
  console.log('Category:', category); // category 사용하여 경고 제거

  const [selectedEmotion, setSelectedEmotion] = useState<EmotionItem | null>(null);
  const [hoveredEmotion, setHoveredEmotion] = useState<number | null>(null);

  // WineGlass 스타일 애니메이션 - 올바른 useRef 사용법
  const bubbleAnimationsRef = useRef<Record<number, {
    scale: Animated.Value;
    opacity: Animated.Value;
    translateX: Animated.Value;
    translateY: Animated.Value;
    rotate: Animated.Value;
  }>>({});

  const containerPanRef = useRef(new Animated.ValueXY());
  const containerScaleRef = useRef(new Animated.Value(1));

  // ref에서 current 값 추출
  const bubbleAnimations = bubbleAnimationsRef.current;
  const containerPan = containerPanRef.current;
  const containerScale = containerScaleRef.current;

  // 감정 버블 애니메이션 초기화
  useEffect(() => {
    emotionData.forEach(emotion => {
      if (!bubbleAnimations[emotion.id]) {
        bubbleAnimations[emotion.id] = {
          scale: new Animated.Value(1),
          opacity: new Animated.Value(0.8),
          translateX: new Animated.Value(0),
          translateY: new Animated.Value(0),
          rotate: new Animated.Value(0)
        };
      }
    });
  }, [bubbleAnimations]);

  // WineGlass 스타일 체계적 배치 계산 - 겹침 방지 및 화면 경계 처리
  const getHexagonPosition = (emotion: EmotionItem) => {
    const centerX = SCREEN_WIDTH / 2;
    const centerY = SCREEN_HEIGHT / 2 - 50;

    if (!selectedEmotion) {
      // 선택되지 않은 상태에서는 균등한 그리드 배치
      const gridSize = 9;
      const spacing = 90;
      const startX = centerX - (gridSize * spacing) / 2;
      const startY = centerY - (gridSize * spacing) / 2;

      return {
        x: startX + (emotion.x * spacing),
        y: startY + (emotion.y * spacing)
      };
    }

    // 선택된 감정은 정중앙 고정
    if (emotion.id === selectedEmotion.id) {
      return { x: centerX, y: centerY };
    }

    // 선택된 감정과의 거리 계산
    const deltaX = emotion.x - selectedEmotion.x;
    const deltaY = emotion.y - selectedEmotion.y;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    // 거리별 반지름 설정 - 겹치지 않도록 충분한 간격
    let radius = 0;

    if (distance <= 1.5) {
      // 1칸 거리 - 첫 번째 링 (8개 위치)
      radius = 160;
    } else if (distance <= 2.5) {
      // 2칸 거리 - 두 번째 링
      radius = 280;
    } else if (distance <= 3.5) {
      // 3칸 거리 - 세 번째 링
      radius = 400;
    } else {
      // 4칸 이상 - 외곽 링 (화면 밖으로 나갈 수 있음)
      radius = 520;
    }

    // 각도 계산
    const angle = Math.atan2(deltaY, deltaX);

    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + Math.sin(angle) * radius;

    return { x, y };
  };

  // 애플워치 스타일 허니콤 그리드 위치 계산
  const getHoneycombPosition = (emotion: EmotionItem) => {
    const centerX = SCREEN_WIDTH / 2;
    const centerY = SCREEN_HEIGHT / 2 - 50;

    if (!selectedEmotion) {
      // 원래 그리드 위치를 기반으로 허니콤 스타일 적용
      const gridCols = 10;
      const gridRows = 10;
      const spacing = 65; // 약간 줄인 간격

      // 그리드의 중심점 계산
      const gridCenterX = (gridCols - 1) / 2;
      const gridCenterY = (gridRows - 1) / 2;

      // 감정의 그리드 상 위치에서 중심점까지의 거리
      const offsetX = emotion.x - gridCenterX;
      const offsetY = emotion.y - gridCenterY;

      // 허니콤 패턴을 위한 약간의 오프셋 (홀수 행은 반칸 이동)
      const hexOffset = emotion.y % 2 === 1 ? spacing * 0.5 : 0;

      return {
        x: centerX + (offsetX * spacing) + hexOffset,
        y: centerY + (offsetY * spacing * 0.87) // 세로 간격을 약간 줄여서 허니콤 느낌
      };
    }

    // 선택된 감정은 중심으로
    if (emotion.id === selectedEmotion.id) {
      return { x: centerX, y: centerY };
    }

    // 선택되지 않은 감정들은 바깥 링으로 배치
    const deltaX = emotion.x - selectedEmotion.x;
    const deltaY = emotion.y - selectedEmotion.y;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    let radius;
    if (distance <= 1.5) {
      radius = 120; // 가까운 감정들
    } else if (distance <= 2.5) {
      radius = 200; // 중간 거리
    } else if (distance <= 3.5) {
      radius = 280; // 먼 감정들
    } else {
      radius = 360; // 매우 먼 감정들
    }

    // 각도 계산
    const angle = Math.atan2(deltaY, deltaX);

    return {
      x: centerX + Math.cos(angle) * radius,
      y: centerY + Math.sin(angle) * radius
    };
  };

  // 화면 경계 내에 있는지 확인하는 함수
  const isInBounds = (position: { x: number; y: number }, size: number) => {
    const margin = size / 2 + 10; // 원의 반지름 + 여유 공간

    return (
      position.x >= margin &&
      position.x <= SCREEN_WIDTH - margin &&
      position.y >= margin + 100 && // 상단 헤더 고려
      position.y <= SCREEN_HEIGHT - 300 // 하단 시트 고려
    );
  };

  // 원들이 겹치는지 확인하는 함수
  const isOverlapping = (pos1: { x: number; y: number }, size1: number, pos2: { x: number; y: number }, size2: number) => {
    const distance = Math.sqrt(Math.pow(pos1.x - pos2.x, 2) + Math.pow(pos1.y - pos2.y, 2));
    const minDistance = (size1 / 2) + (size2 / 2) + 5; // 5px 여유 공간
    return distance < minDistance;
  };

  // 표시할 감정들을 필터링하는 함수
  const getVisibleEmotions = () => {
    const visibleEmotions: EmotionItem[] = [];

    for (const emotion of emotionData) {
      const position = getHoneycombPosition(emotion);
      const size = getBubbleSize(emotion);

      // 화면 경계 확인
      if (!isInBounds(position, size)) {
        continue;
      }

      // 다른 원들과의 겹침 확인
      let hasOverlap = false;
      for (const existingEmotion of visibleEmotions) {
        const existingPosition = getHoneycombPosition(existingEmotion);
        const existingSize = getBubbleSize(existingEmotion);

        if (isOverlapping(position, size, existingPosition, existingSize)) {
          hasOverlap = true;
          break;
        }
      }

      // 겹치지 않으면 표시할 목록에 추가
      if (!hasOverlap) {
        visibleEmotions.push(emotion);
      }
    }

    return visibleEmotions;
  };

  // 버블 크기 계산 (거리 기반)
  const getBubbleSize = (emotion: EmotionItem) => {
    if (!selectedEmotion) {
      return BUBBLE_SIZE.MEDIUM;
    }

    if (emotion.id === selectedEmotion.id) {
      return BUBBLE_SIZE.SELECTED;
    }

    // 선택된 감정과의 거리 계산
    const distance = Math.sqrt(
      Math.pow(emotion.x - selectedEmotion.x, 2) +
      Math.pow(emotion.y - selectedEmotion.y, 2)
    );

    if (distance <= 1) return BUBBLE_SIZE.LARGE;
    if (distance <= 2) return BUBBLE_SIZE.MEDIUM;
    return BUBBLE_SIZE.SMALL;
  };

  // 터치 이벤트 처리
  const handleEmotionPress = (emotion: EmotionItem) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    setSelectedEmotion(emotion);

    // 선택된 버블 애니메이션
    Animated.sequence([
      Animated.timing(bubbleAnimations[emotion.id].scale, {
        toValue: 1.3,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(bubbleAnimations[emotion.id].scale, {
        toValue: 1.1,
        duration: 150,
        useNativeDriver: true,
      })
    ]).start();

    // 다른 버블들 애니메이션
    emotionData.forEach(otherEmotion => {
      if (otherEmotion.id !== emotion.id) {
        const distance = Math.sqrt(
          Math.pow(otherEmotion.x - emotion.x, 2) +
          Math.pow(otherEmotion.y - emotion.y, 2)
        );

        const targetOpacity = distance <= 2 ? 0.9 : 0.3;
        const targetScale = distance <= 1 ? 1.05 : distance <= 2 ? 1 : 0.8;

        Animated.parallel([
          Animated.timing(bubbleAnimations[otherEmotion.id].opacity, {
            toValue: targetOpacity,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(bubbleAnimations[otherEmotion.id].scale, {
            toValue: targetScale,
            duration: 300,
            useNativeDriver: true,
          })
        ]).start();
      }
    });
  };

  // 팬 제스처 처리
  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationX: containerPan.x, translationY: containerPan.y } }],
    { useNativeDriver: false }
  );

  const onHandlerStateChange = (event: any) => {
    if (event.nativeEvent.state === State.END) {
      // 스냅 백 애니메이션
      Animated.spring(containerPan, {
        toValue: { x: 0, y: 0 },
        useNativeDriver: false,
      }).start();
    }
  };

  // 렌더링 함수들
  const renderBubble = (emotion: EmotionItem) => {
    const position = getHoneycombPosition(emotion); // 허니콤 패턴 사용
    const size = getBubbleSize(emotion);
    const isSelected = selectedEmotion?.id === emotion.id;
    const isHovered = hoveredEmotion === emotion.id;

    return (
      <Animated.View
        key={emotion.id}
        style={{
          position: 'absolute',
          left: position.x - size / 2,
          top: position.y - size / 2,
          transform: [
            { scale: bubbleAnimations[emotion.id]?.scale || 1 },
            { translateX: bubbleAnimations[emotion.id]?.translateX || 0 },
            { translateY: bubbleAnimations[emotion.id]?.translateY || 0 },
          ],
          opacity: bubbleAnimations[emotion.id]?.opacity || 0.8,
        }}
      >
        <TouchableOpacity
          onPress={() => handleEmotionPress(emotion)}
          onPressIn={() => setHoveredEmotion(emotion.id)}
          onPressOut={() => setHoveredEmotion(null)}
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: emotion.color,
            justifyContent: 'center',
            alignItems: 'center',

            // 애플워치 스타일 효과
            borderWidth: isSelected ? 2 : 1,
            borderColor: isSelected
              ? 'rgba(255, 255, 255, 0.9)'
              : 'rgba(255, 255, 255, 0.2)',

            // 깔끔한 그림자 효과
            shadowColor: isSelected ? '#FFFFFF' : emotion.color,
            shadowOffset: { width: 0, height: isSelected ? 6 : 3 },
            shadowOpacity: isSelected ? 0.8 : 0.4,
            shadowRadius: isSelected ? 10 : 5,
            elevation: isSelected ? 10 : 5,
          }}
        >
          {/* 감정 텍스트 */}
          <Text
            style={{
              color: '#FFFFFF',
              fontSize: size * 0.15, // 원 크기의 15% 비율로 폰트 크기 설정
              fontWeight: '600',
              textAlign: 'center',
              textShadowColor: 'rgba(0, 0, 0, 0.8)',
              textShadowOffset: { width: 0, height: 1 },
              textShadowRadius: 2,
            }}
            numberOfLines={2}
          >
            {emotion.name}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#000000' }}>
        {/* 헤더 */}
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 20,
          paddingVertical: 10
        }}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={{
              width: 44,
              height: 44,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ color: '#FFFFFF', fontSize: 18 }}>←</Text>
          </TouchableOpacity>

          <Text style={{
            color: '#FFFFFF',
            fontSize: 18,
            fontWeight: '600'
          }}>
            감정 선택
          </Text>

          <View style={{ width: 44 }} />
        </View>

        {/* WineGlass 스타일 그리드 */}
        <PanGestureHandler
          onGestureEvent={onGestureEvent}
          onHandlerStateChange={onHandlerStateChange}
          enabled={true}
        >
          <Animated.View
            style={{
              flex: 1,
              transform: [
                { translateX: containerPan.x },
                { translateY: containerPan.y },
                { scale: containerScale },
              ],
            }}
          >
            {getVisibleEmotions().map(emotion => renderBubble(emotion))}
          </Animated.View>
        </PanGestureHandler>

        {/* 선택된 감정 정보 */}
        {selectedEmotion && (
          <Animated.View
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.95)',
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              padding: 24,

              // 그림자 효과
              shadowColor: '#000000',
              shadowOffset: { width: 0, height: -6 },
              shadowOpacity: 0.4,
              shadowRadius: 12,
              elevation: 12,
            }}
          >
            <Text style={{
              color: '#FFFFFF',
              fontSize: 24,
              fontWeight: '700',
              textAlign: 'center',
              marginBottom: 8,
            }}>
              {selectedEmotion.name}
            </Text>

            <Text style={{
              color: '#CCCCCC',
              fontSize: 16,
              textAlign: 'center',
              marginBottom: 20,
            }}>
              이 감정이 지금의 당신과 가장 가까운가요?
            </Text>

            <TouchableOpacity
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
                router.back();
              }}
              style={{
                backgroundColor: selectedEmotion.color,
                borderRadius: 25,
                paddingVertical: 15,
                paddingHorizontal: 40,
                alignSelf: 'center',

                // 글래시 효과
                borderWidth: 2,
                borderColor: 'rgba(255, 255, 255, 0.3)',

                shadowColor: selectedEmotion.color,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.6,
                shadowRadius: 8,
                elevation: 8,
              }}
            >
              <Text style={{
                color: '#FFFFFF',
                fontSize: 16,
                fontWeight: '600',
                textAlign: 'center',
              }}>
                이 감정 선택하기
              </Text>
            </TouchableOpacity>
          </Animated.View>
        )}
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
