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

// 애플워치 스타일 상수 (SELECTED 150에 맞춘 적절한 크기 조절)
const BUBBLE_SIZE = {
  SMALL: 35,    // 40 → 35 (SELECTED의 23%)
  MEDIUM: 60,   // 65 → 60 (SELECTED의 40%)
  LARGE: 85,    // 90 → 85 (SELECTED의 57%)
  SELECTED: 150 // 150 유지
};

// 허니콤 그리드 상수
const HEX_GRID = {
  RADIUS: 35 // 기본 반지름
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
  const bottomSheetTranslateY = useRef(new Animated.Value(300)).current;

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

  useEffect(() => {
    if (selectedEmotion) {
      Animated.spring(bottomSheetTranslateY, {
        toValue: 0,
        useNativeDriver: true,
        tension: 100,
        friction: 20,
      }).start();
    } else {
      Animated.timing(bottomSheetTranslateY, {
        toValue: 300,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [selectedEmotion, bottomSheetTranslateY]);

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

  // 애플워치 스타일 허니콤 그리드 위치 계산 (겹침 방지 최적화)
  const getHoneycombPosition = (emotion: EmotionItem) => {
    const centerX = SCREEN_WIDTH / 2;
    const centerY = SCREEN_HEIGHT / 2 - 50;

    if (!selectedEmotion) {
      // 원래 그리드 위치를 기반으로 허니콤 스타일 적용 (간격 정밀 조정)
      const gridCols = 10;
      const gridRows = 10;
      const spacing = 70; // 65 → 70 (약간 증가하여 겹침 완전 방지)

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
        y: centerY + (offsetY * spacing * 0.85) // 0.87 → 0.85 (세로 간격 조정)
      };
    }

    // 선택된 감정은 중심으로
    if (emotion.id === selectedEmotion.id) {
      return { x: centerX, y: centerY };
    }

    // 선택되지 않은 감정들은 바깥 링으로 배치 (간격 정밀 조정)
    const deltaX = emotion.x - selectedEmotion.x;
    const deltaY = emotion.y - selectedEmotion.y;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    let radius;
    if (distance <= 1.5) {
      radius = 130; // 120 → 130 (첫 번째 링 간격 증가)
    } else if (distance <= 2.5) {
      radius = 210; // 200 → 210 (두 번째 링 간격 증가)
    } else if (distance <= 3.5) {
      radius = 290; // 280 → 290 (세 번째 링 간격 증가)
    } else {
      radius = 370; // 360 → 370 (외곽 링 간격 증가)
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

  // 표시할 감정들을 필터링하는 함수 (모든 감정을 표시하도록 수정)
  const getVisibleEmotions = () => {
    // 모든 감정을 표시하도록 변경
    return emotionData;
  };

  // 화면 중앙에 가장 가까운 감정을 찾는 함수
  const findCenterEmotion = () => {
    const centerX = SCREEN_WIDTH / 2;
    const centerY = SCREEN_HEIGHT / 2 - 50;

    let closestEmotion: EmotionItem | null = null;
    let minDistance = Infinity;

    emotionData.forEach(emotion => {
      const position = getHoneycombPosition(emotion);

      // 컨테이너의 이동을 고려한 실제 위치 계산 (리스너에서 직접 값을 받도록 수정)
      const currentPanX = (containerPan.x as any)._value || 0;
      const currentPanY = (containerPan.y as any)._value || 0;

      const actualX = position.x + currentPanX;
      const actualY = position.y + currentPanY;

      // 화면 중앙과의 거리 계산
      const distance = Math.sqrt(
        Math.pow(actualX - centerX, 2) +
        Math.pow(actualY - centerY, 2)
      );

      if (distance < minDistance) {
        minDistance = distance;
        closestEmotion = emotion;
      }
    });

    return closestEmotion;
  };

  // 그리드 경계 계산 함수
  const getGridBounds = () => {
    if (!selectedEmotion) {
      // 기본 그리드 상태에서의 경계
      const gridSize = 9;
      const spacing = 90;
      const totalWidth = gridSize * spacing;
      const totalHeight = gridSize * spacing;

      return {
        minX: -(totalWidth / 2 - SCREEN_WIDTH / 2),
        maxX: totalWidth / 2 - SCREEN_WIDTH / 2,
        minY: -(totalHeight / 2 - SCREEN_HEIGHT / 2 + 200), // 헤더/하단 여유공간
        maxY: totalHeight / 2 - SCREEN_HEIGHT / 2 + 200
      };
    } else {
      // 선택된 상태에서의 경계 (더 넓은 범위)
      const maxRadius = 520; // 가장 먼 감정들이 배치되는 반지름
      const margin = 100; // 여유 공간

      return {
        minX: -(maxRadius + margin - SCREEN_WIDTH / 2),
        maxX: maxRadius + margin - SCREEN_WIDTH / 2,
        minY: -(maxRadius + margin - SCREEN_HEIGHT / 2 + 200),
        maxY: maxRadius + margin - SCREEN_HEIGHT / 2 + 200
      };
    }
  };

  // 경계 내로 위치를 제한하는 함수
  const clampToBounds = (x: number, y: number) => {
    const bounds = getGridBounds();
    return {
      x: Math.max(bounds.minX, Math.min(bounds.maxX, x)),
      y: Math.max(bounds.minY, Math.min(bounds.maxY, y))
    };
  };

  // 팬 제스처 처리 (경계 제한 추가)
  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationX: containerPan.x, translationY: containerPan.y } }],
    {
      useNativeDriver: false,
      listener: (event: any) => {
        const { translationX, translationY } = event.nativeEvent;
        const clamped = clampToBounds(translationX, translationY);

        // 경계를 벗어나려 할 때 저항감 추가
        containerPan.setValue({
          x: clamped.x,
          y: clamped.y
        });

        // 실시간으로 중앙 감정 찾기
        const centerEmotion = findCenterEmotion();
        if (centerEmotion && centerEmotion.id !== selectedEmotion?.id) {
          handleEmotionPress(centerEmotion, false); // 클릭이 아닌 스크롤로 인한 선택
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
      }
    }
  );

  const onHandlerStateChange = (event: any) => {
    if (event.nativeEvent.state === State.END) {
      const { translationX, translationY } = event.nativeEvent;
      const clamped = clampToBounds(translationX, translationY);

      // 경계 내의 가까운 위치로 스프링 애니메이션
      Animated.spring(containerPan, {
        toValue: { x: clamped.x, y: clamped.y },
        useNativeDriver: false,
        tension: 100,
        friction: 8,
      }).start();
    }
  };

  // 버블 크기 계산 (동심원 기준)
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

    // 동심원 기준으로 같은 반지름 내의 감정들은 같은 크기
    if (distance <= 1.5) return BUBBLE_SIZE.LARGE;   // 첫 번째 원 (가장 가까운 감정들)
    if (distance <= 2.5) return BUBBLE_SIZE.MEDIUM;  // 두 번째 원
    if (distance <= 3.5) return BUBBLE_SIZE.SMALL;   // 세 번째 원
    return BUBBLE_SIZE.SMALL;                         // 그 외 모든 감정들
  };

  // 동적 투명도 계산 함수 (선택된 원 기준)
  const getBubbleOpacity = (emotion: EmotionItem) => {
    if (!selectedEmotion) {
      return 0.8; // 기본 투명도
    }

    if (emotion.id === selectedEmotion.id) {
      return 1.0; // 선택된 감정은 완전히 불투명
    }

    // 선택된 감정과의 거리 계산
    const distance = Math.sqrt(
      Math.pow(emotion.x - selectedEmotion.x, 2) +
      Math.pow(emotion.y - selectedEmotion.y, 2)
    );

    // 거리에 따른 부드러운 투명도 변화 (선형 감소)
    if (distance <= 1.5) {
      return 0.95; // 첫 번째 원 - 거의 불투명
    } else if (distance <= 2.5) {
      return 0.8;  // 두 번째 원 - 약간 투명
    } else if (distance <= 3.5) {
      return 0.5;  // 세 번째 원 - 반투명
    } else if (distance <= 4.5) {
      return 0.3;  // 네 번째 원 - 상당히 투명
    } else {
      return 0.15; // 그 외 - 매우 투명
    }
  };

  // 터치 이벤트 처리
  const handleEmotionPress = (emotion: EmotionItem, isClick: boolean = true) => {
    if (isClick) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }

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

    // 다른 버블들 애니메이션 (동심원 기준)
    emotionData.forEach(otherEmotion => {
      if (otherEmotion.id !== emotion.id) {
        const distance = Math.sqrt(
          Math.pow(otherEmotion.x - emotion.x, 2) +
          Math.pow(otherEmotion.y - emotion.y, 2)
        );

        // 동심원 기준으로 같은 반지름 내의 감정들은 같은 불투명도와 스케일
        let targetOpacity, targetScale;

        if (distance <= 1.5) {
          // 첫 번째 원 - 높은 불투명도, 약간 확대
          targetOpacity = 0.9;
          targetScale = 1.05;
        } else if (distance <= 2.5) {
          // 두 번째 원 - 중간 불투명도, 기본 크기
          targetOpacity = 0.7;
          targetScale = 1.0;
        } else if (distance <= 3.5) {
          // 세 번째 원 - 낮은 불투명도, 약간 축소
          targetOpacity = 0.4;
          targetScale = 0.9;
        } else {
          // 그 외 - 매우 낮은 불투명도, 축소
          targetOpacity = 0.3;
          targetScale = 0.8;
        }

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

  // 렌더링 함수들 (향상된 UI 디자인)
  const renderBubble = (emotion: EmotionItem) => {
    const position = getHoneycombPosition(emotion);
    const size = getBubbleSize(emotion);
    const dynamicOpacity = getBubbleOpacity(emotion);
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
          opacity: dynamicOpacity,
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

            // 향상된 테두리 효과
            borderWidth: isSelected ? 3 : isHovered ? 2 : 1,
            borderColor: isSelected
              ? '#FFFFFF'
              : isHovered
                ? 'rgba(255, 255, 255, 0.6)'
                : 'rgba(255, 255, 255, 0.15)',

            // 글래스모피즘 효과
            ...(isSelected && {
              backgroundColor: `${emotion.color}E6`, // 약간 투명하게
              backdropFilter: 'blur(10px)',
            }),

            // 향상된 그림자 효과
            shadowColor: isSelected ? '#FFFFFF' : emotion.color,
            shadowOffset: {
              width: 0,
              height: isSelected ? 8 : isHovered ? 4 : 2
            },
            shadowOpacity: isSelected ? 0.9 : dynamicOpacity * 0.7,
            shadowRadius: isSelected ? 15 : isHovered ? 8 : 4,
            elevation: isSelected ? 15 : isHovered ? 8 : 3,
          }}
        >
          {/* 내부 글로우 효과 */}
          {isSelected && (
            <View
              style={{
                position: 'absolute',
                width: size - 8,
                height: size - 8,
                borderRadius: (size - 8) / 2,
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderWidth: 1,
                borderColor: 'rgba(255, 255, 255, 0.2)',
              }}
            />
          )}

          {/* 감정 텍스트 */}
          <Text
            style={{
              color: '#FFFFFF',
              fontSize: isSelected ? size * 0.12 : size * 0.15, // 선택된 원은 텍스트 크기 조정
              fontWeight: isSelected ? '700' : '600',
              textAlign: 'center',
              textShadowColor: 'rgba(0, 0, 0, 0.9)',
              textShadowOffset: { width: 0, height: 1 },
              textShadowRadius: isSelected ? 3 : 2,
              opacity: Math.max(dynamicOpacity, 0.8),
              letterSpacing: isSelected ? 0.5 : 0,
            }}
            numberOfLines={isSelected ? 3 : 2}
          >
            {emotion.name}
          </Text>

          {/* 선택된 원에 맥동 효과 */}
          {isSelected && (
            <Animated.View
              style={{
                position: 'absolute',
                width: size + 10,
                height: size + 10,
                borderRadius: (size + 10) / 2,
                borderWidth: 2,
                borderColor: 'rgba(255, 255, 255, 0.3)',
                opacity: bubbleAnimations[emotion.id]?.opacity || 0.5,
              }}
            />
          )}
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const visibleEmotions = getVisibleEmotions();

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


        {/* 스크롤 가능한 감정 그리드 */}
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
              backgroundColor: 'rgba(20, 20, 20, 0.8)',
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              padding: 24,
              transform: [{ translateY: bottomSheetTranslateY }],

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
                borderWidth: 1,
                borderColor: 'rgba(255, 255, 255, 0.2)',

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