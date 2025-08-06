import React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import Svg, { Path, Defs, LinearGradient as SvgLinearGradient, Stop } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';
import { gradientColors } from '@/components/calendar/monthCalendar/style';

import { MaterialCommunityIcons } from '@expo/vector-icons';

// --- Helper Functions for Semi-circle Chart ---
const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = (angleInDegrees) * Math.PI / 180.0;
    return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
    };
}

const describeArc = (x: number, y: number, radius: number, startAngle: number, endAngle: number) => {
    const start = polarToCartesian(x, y, radius, endAngle);
    const end = polarToCartesian(x, y, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    const d = [
        "M", start.x, start.y,
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");
    return d;
}

// --- Semi-circle Chart Component ---
const SemiCircleChart = ({ data, size, strokeWidth }: { data: { value: number, emotion: keyof typeof gradientColors }[], size: number, strokeWidth: number }) => {
    const totalValue = data.reduce((acc, item) => acc + item.value, 0);
    const radius = (size - strokeWidth) / 2;
    let startAngle = 180;

    return (
        <Svg width={size} height={size / 2 + strokeWidth} viewBox={`0 0 ${size} ${size / 2 + strokeWidth}`}>
            <Defs>
                {data.map((item, index) => {
                    const gradientId = `grad${index}`;
                    const colors = gradientColors[item.emotion];
                    return (
                        <SvgLinearGradient key={gradientId} id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
                            <Stop offset="0%" stopColor={colors[0]} />
                            <Stop offset="100%" stopColor={colors[1]} />
                        </SvgLinearGradient>
                    );
                })}
            </Defs>
            <Path
                d={describeArc(size / 2, size / 2, radius, 180, 360)}
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth={strokeWidth}
                fill="none"
            />
            {data.map((item, index) => {
                const angle = (item.value / totalValue) * 180;
                const endAngle = startAngle + angle;
                const path = describeArc(size / 2, size / 2, radius, startAngle, endAngle);
                startAngle = endAngle;
                return (
                    <Path
                        key={index}
                        d={path}
                        stroke={`url(#grad${index})`}
                        strokeWidth={strokeWidth}
                        fill="none"
                    />
                );
            })}
        </Svg>
    );
};

// --- Main Screen Component ---
const fakeData = {
  primary_emotion_type: 'YELLOW',
  emotions: {
    RED: ['화남', '짜증'],
    YELLOW: ['행복', '기쁨', '즐거움'],
    GREEN: ['평온', '안정'],
    BLUE: ['슬픔'],
  },
  ratio: [
    ['YELLOW', 0.6],
    ['RED', 0.2],
    ['GREEN', 0.15],
    ['BLUE', 0.05],
  ],
  diary: {
    year: 2025,
    month: 7,
    day: 9,
  },
};

export default function RecordDetailScreen() {
  const router = useRouter();

  const getEmotionGradient = (emotion: string): string[] => {
    const emotionKey = emotion.toLowerCase() as keyof typeof gradientColors;
    return gradientColors[emotionKey] || gradientColors.gray;
  };

  const getEmotionText = (emotion: string) => {
    switch (emotion) {
      case 'RED': return '화남';
      case 'YELLOW': return '기쁨';
      case 'GREEN': return '평온';
      case 'BLUE': return '슬픔';
      default: return '';
    }
  };

  const primaryEmotionGradient = getEmotionGradient(fakeData.primary_emotion_type);
  const primaryEmotionText = getEmotionText(fakeData.primary_emotion_type);

  const semiCircleData = fakeData.ratio.map(([emotion, value]) => ({
    value: value * 100,
    emotion: emotion.toLowerCase() as keyof typeof gradientColors,
  }));

  // @ts-ignore
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <TouchableOpacity style={styles.closeBtn} onPress={() => router.back()}>
        <MaterialCommunityIcons name="close" size={28} color="#E6F1FF" />
      </TouchableOpacity>

      <Text style={styles.date}>{`${fakeData.diary.year}년 ${fakeData.diary.month}월 ${fakeData.diary.day}일`}</Text>

      <View style={styles.chartBox}>
        <SemiCircleChart data={semiCircleData} size={280} strokeWidth={45} />
      </View>

      <View style={styles.emotionRow}>
        {fakeData.ratio.map(([emotion, value]) => (
          <View key={emotion} style={styles.emotionItem}>
            <LinearGradient
              colors={getEmotionGradient(emotion)}
              style={styles.circle}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            />
            <Text style={styles.emotionPercent}>{`${Math.round(value * 100)}%`}</Text>
          </View>
        ))}
      </View>

      <View style={styles.bubbleBox}>
        <LinearGradient
          colors={primaryEmotionGradient}
          style={styles.bubbleIcon}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
        <Text style={styles.bubbleText}>이 날은 굉장히 <Text style={{ color: primaryEmotionGradient[1], fontWeight: 'bold' }}>{primaryEmotionText}</Text> 하루였군요!!</Text>
      </View>

      <Text style={styles.sectionTitle}>감정이 드러난 단어들</Text>

      {Object.entries(fakeData.emotions)
        .sort(([emotionA], [emotionB]) => {
          const ratioA = fakeData.ratio.find(r => r[0] === emotionA)?.[1] || 0;
          const ratioB = fakeData.ratio.find(r => r[0] === emotionB)?.[1] || 0;
          // @ts-ignore
          return ratioB - ratioA;
        })
        .map(([emotion, words]) => {
          if (words.length === 0) return null;
          const gradient = getEmotionGradient(emotion);
          const emotionRatio = fakeData.ratio.find(r => r[0] === emotion);
          // @ts-ignore
          return (
            <View key={emotion} style={styles.wordBox}>
              <View style={styles.wordHeader}>
                <Text style={[styles.wordTitle, { color: gradient[1] }]}>{getEmotionText(emotion)}</Text>
                <Text style={styles.wordPercent}>{emotionRatio ? `${Math.round(emotionRatio[1] * 100)}%` : ''}</Text>
              </View>
              <View style={styles.wordList}>
                {words.map((word, index) => (
                  <LinearGradient
                    key={index}
                    colors={gradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.wordTag}
                  >
                    <Text style={styles.wordItem}>{word}</Text>
                  </LinearGradient>
                ))}
              </View>
            </View>
          );
        })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A192F', // 더 깊고 세련된 네이비 색상
  },
  contentContainer: {
    paddingTop: 60, // SafeArea 대응
    paddingHorizontal: 24,
    paddingBottom: 48,
  },
  closeBtn: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
    padding: 8,
  },
  date: {
    color: '#E6F1FF',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24, // 날짜와 차트 박스 간 간격 증가
    fontFamily: 'Pretendard',
  },
  chartBox: {
    backgroundColor: 'rgba(20, 39, 64, 0.6)',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingTop: 24,
    paddingHorizontal: 16,
    marginBottom: 24,
    overflow: 'hidden', // 하단이 둥근 모서리를 넘어가지 않도록
  },
  emotionRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 32,
    paddingHorizontal: 16, // 좌우 여백 추가
  },
  emotionItem: {
    alignItems: 'center',
  },
  circle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginBottom: 8,
  },
  emotionPercent: {
    color: '#E6F1FF',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Pretendard',
  },
  bubbleBox: {
    backgroundColor: 'rgba(20, 39, 64, 0.6)',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    marginBottom: 40,
  },
  bubbleIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bubbleText: {
    flex: 1,
    color: '#E6F1FF',
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Pretendard',
    lineHeight: 24,
  },
  sectionTitle: {
    color: '#E6F1FF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    fontFamily: 'Pretendard',
  },
  wordBox: {
    backgroundColor: 'rgba(20, 39, 64, 0.6)',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
  },
  wordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  wordTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Pretendard',
  },
  wordPercent: {
    color: '#E6F1FF',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Pretendard',
  },
  wordList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  wordItem: {
    color: '#0A192F',
    fontSize: 15,
    fontWeight: '600',
    fontFamily: 'Pretendard',
  },
  wordTag: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 16,
    overflow: 'hidden', // for LinearGradient border-radius
  },
});