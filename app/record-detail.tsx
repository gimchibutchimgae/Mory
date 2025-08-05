import React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import Svg, { Path } from 'react-native-svg';

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
const SemiCircleChart = ({ data, size, strokeWidth }: { data: { value: number, color: string }[], size: number, strokeWidth: number }) => {
    const totalValue = data.reduce((acc, item) => acc + item.value, 0);
    const radius = (size - strokeWidth) / 2;
    let startAngle = 180; // Start from the left side

    return (
        <Svg width={size} height={size / 2 + strokeWidth} viewBox={`0 0 ${size} ${size / 2 + strokeWidth}`}>
            {/* Background Arc */}
            <Path
                d={describeArc(size / 2, size / 2, radius, 180, 360)}
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth={strokeWidth}
                fill="none"
            />
            {/* Data Arcs */}
            {data.map((item, index) => {
                const angle = (item.value / totalValue) * 180; // Map value to 180 degrees
                const endAngle = startAngle + angle;
                const path = describeArc(size / 2, size / 2, radius, startAngle, endAngle);
                startAngle = endAngle;
                return (
                    <Path
                        key={index}
                        d={path}
                        stroke={item.color}
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

  const getEmotionColor = (emotion: string) => {
    switch (emotion) {
      case 'RED': return '#FF8A7A';
      case 'YELLOW': return '#FFD36A';
      case 'GREEN': return '#7EDFA2';
      case 'BLUE': return '#A2B6FF';
      default: return '#fff';
    }
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

  const primaryEmotionColor = getEmotionColor(fakeData.primary_emotion_type);
  const primaryEmotionText = getEmotionText(fakeData.primary_emotion_type);

  const semiCircleData = [
    { value: (fakeData.ratio.find(([e]) => e === 'BLUE')?.[1] || 0) * 100, color: getEmotionColor('BLUE') },
    { value: (fakeData.ratio.find(([e]) => e === 'RED')?.[1] || 0) * 100, color: getEmotionColor('RED') },
    { value: (fakeData.ratio.find(([e]) => e === 'GREEN')?.[1] || 0) * 100, color: getEmotionColor('GREEN') },
    { value: (fakeData.ratio.find(([e]) => e === 'YELLOW')?.[1] || 0) * 100, color: getEmotionColor('YELLOW') },
  ];

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#0A2940' }} contentContainerStyle={{ paddingBottom: 32 }}>
      <View style={styles.closeRow}>
        <Text style={styles.closeBtn} onPress={() => router.push('/chart')}>✕</Text>
      </View>
      <Text style={styles.date}>{`${fakeData.diary.year}년 ${fakeData.diary.month}월 ${fakeData.diary.day}일`}</Text>
      <View style={styles.chartBox}>
        <View style={{ marginTop: 20 }}>
          <SemiCircleChart data={semiCircleData} size={200} strokeWidth={40} />
        </View>
      </View>
      <View style={[styles.emotionRow, { marginTop: 40 }]}>
        {fakeData.ratio.map(([emotion, value]) => (
          <View key={emotion} style={styles.emotionItem}>
            <View style={[styles.circle, { backgroundColor: getEmotionColor(emotion) }]} />
            <Text style={styles.emotionPercent}>{`${Math.round(value * 100)}%`}</Text>
          </View>
        ))}
      </View>
      <View style={styles.bubbleBox}>
        <View style={[styles.bubbleIcon, { backgroundColor: primaryEmotionColor }]} />
        <Text style={styles.bubbleText}>이 날은 굉장히 <Text style={{ color: primaryEmotionColor }}>{primaryEmotionText}</Text> 하루였군요!!</Text>
      </View>
      <Text style={styles.sectionTitle}>감정이 들어난 단어들</Text>
      {Object.entries(fakeData.emotions)
        .sort(([emotionA], [emotionB]) => {
          const ratioA = fakeData.ratio.find(r => r[0] === emotionA)?.[1] || 0;
          const ratioB = fakeData.ratio.find(r => r[0] === emotionB)?.[1] || 0;
          return ratioB - ratioA; // Descending order
        })
        .map(([emotion, words]) => {
        if (words.length === 0) return null;
        const color = getEmotionColor(emotion);
        const emotionRatio = fakeData.ratio.find(r => r[0] === emotion);
        return (
          <View key={emotion} style={styles.wordBox}>
            <View style={styles.wordHeader}>
              <Text style={[styles.wordTitle, { color }]}>{getEmotionText(emotion)}</Text>
              <Text style={styles.wordPercent}>{emotionRatio ? `${Math.round(emotionRatio[1] * 100)}%` : ''}</Text>
            </View>
            <View style={styles.wordList}>
              {words.map((word, index) => (
                <Text key={index} style={styles.wordItem}>• {word}</Text>
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
    backgroundColor: '#0A2940',
    paddingTop: 40,
    paddingHorizontal: 16,
  },
  closeRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 16,
  },
  closeBtn: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  date: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 32,
  },
  chartBox: {
    backgroundColor: '#112B44',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 6,
    height: 220,
  },
  emotionRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: 24,
    paddingHorizontal: 10,
    marginTop: 32,
  },
  emotionItem: {
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 10,
  },
  circle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginBottom: 4,
  },
  emotionPercent: {
    color: '#fff',
    fontSize: 19, // 퍼센트 글자 크기 증가
  },
  bubbleBox: {
    backgroundColor: '#112B44',
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginBottom: 32,
  },
  bubbleIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginRight: 8,
  },
  bubbleText: {
    color: '#fff',
    fontSize: 19, // 한마디 글자 크기 증가
    fontWeight: '500',
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 21, // 섹션 타이틀 글자 크기 증가
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  wordBox: {
    backgroundColor: '#112B44',
    borderRadius: 16,
    paddingVertical: 28, // 상하 패딩 더 증가
    paddingHorizontal: 24, // 좌우 패딩 더 증가
    marginBottom: 32,
  },
  wordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20, // 헤더와 리스트 간 간격 더 증가
  },
  wordTitle: {
    fontSize: 19, // 글자 크기 증가
    fontWeight: 'bold',
  },
  wordPercent: {
    color: '#fff',
    fontSize: 19, // 글자 크기 증가
    fontWeight: 'bold',
  },
  wordList: {
    marginLeft: 12, // 리스트 좌측 여백 증가
  },
  wordItem: {
    color: '#fff',
    fontSize: 19, // 글자 크기 증가
    marginBottom: 12, // 단어 간 간격 더 증가
  },
});