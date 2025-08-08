import { useRouter } from 'expo-router';
import {TouchableOpacity, Text, View, Image, Dimensions, StyleSheet, Platform, UIManager} from 'react-native';
import { useState } from 'react';



if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

import * as S from '@/components/ui/StyledScreen';
import Svg, {Path} from "react-native-svg";

// 상수 정의
const CHART_SIZE = 200;
const INNER_RADIUS = 60;
const IMAGE_SIZE = 60;

// 타입 정의
interface ChartDataItem {
  value: number;
  color: string;
  label?: string;
}

interface ChartData {
  date: string;
  data: ChartDataItem[];
}

// 가짜 데이터 정의
const fakeChartData: ChartData = {
  date: '2025년 7월 9일',
  data: [
    { value: 60, color: '#FFD36A', label: '카테고리 1' },
    { value: 20, color: '#FF8A7A', label: '카테고리 2' },
    { value: 15, color: '#7EDFA2', label: '카테고리 3' },
    { value: 5, color: '#A2B6FF', label: '카테고리 4' },
  ],
};

const PieChart = ({
  data,
  size = CHART_SIZE,
  innerRadius = INNER_RADIUS
}: {
  data: ChartDataItem[];
  size?: number;
  innerRadius?: number;
}) => {
  // 데이터 유효성 검사
  if (!data || data.length === 0) {
    return null;
  }

  const total = data.reduce((sum, item) => sum + item.value, 0);

  if (total === 0) {
    return null;
  }

  let startAngle = -90; // 12시 방향에서 시작

  const paths = data.map((item, index) => {
    const angle = (item.value / total) * 360;
    const endAngle = startAngle + angle;

    // 라디안 변환
    const startRad = (Math.PI * startAngle) / 180;
    const endRad = (Math.PI * endAngle) / 180;

    const radius = size / 2;
    const x1 = size / 2 + radius * Math.cos(startRad);
    const y1 = size / 2 + radius * Math.sin(startRad);
    const x2 = size / 2 + radius * Math.cos(endRad);
    const y2 = size / 2 + radius * Math.sin(endRad);

    const largeArcFlag = angle > 180 ? 1 : 0;

    const d = `M ${size / 2},${size / 2} L ${x1},${y1} A ${radius},${radius} 0 ${largeArcFlag},1 ${x2},${y2} Z`;

    startAngle = endAngle;

    return <Path key={`${item.color}-${index}`} d={d} fill={item.color} />;
  });

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Svg height={size} width={size} viewBox={`0 0 ${size} ${size}`}>
        {paths}
        {/* 내부 원 */}
        <Path
          d={`M ${size/2 - innerRadius},${size/2} a ${innerRadius},${innerRadius} 0 1,0 ${innerRadius*2},0 a ${innerRadius},${innerRadius} 0 1,0 -${innerRadius*2},0`}
          fill="#112B44"
        />
      </Svg>
      <View style={{ position: 'absolute' }}>
        <Image
          source={require('@/assets/images/mory_initial.png')}
          style={{ width: IMAGE_SIZE, height: IMAGE_SIZE }}
        />
      </View>
    </View>
  );
};

const diaryList = [
  { date: '2025년 7월 8일', day: 8, written: false },
  { date: '2025년 7월 9일', day: 9, written: true },
  { date: '2025년 7월 10일', day: 10, written: false },
];

const DiaryGallery = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 6, 9));
  const router = useRouter();
  const windowWidth = Dimensions.get('window').width;
  const CARD_WIDTH = windowWidth * 0.55;
  const SIDE_CARD_WIDTH = windowWidth * 0.45;
  const CARD_HEIGHT = 340;
  const MORY_SIZE = 92;
  const MORY_TOP = 70;

  const getDiaryForDate = (date: Date) => {
    return {
      dateString: `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`,
      day: date.getDate(),
      written: date.getDate() % 2 !== 0,
    };
  };

  const goToPrevDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() - 1);
    setCurrentDate(newDate);
  };

  const goToNextDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + 1);
    setCurrentDate(newDate);
  };

  const prevDate = new Date(currentDate);
  prevDate.setDate(currentDate.getDate() - 1);
  const nextDate = new Date(currentDate);
  nextDate.setDate(currentDate.getDate() + 1);

  const prevDiary = getDiaryForDate(prevDate);
  const currentDiary = getDiaryForDate(currentDate);
  const nextDiary = getDiaryForDate(nextDate);

  return (
    <View style={styles.container}>
      {/* 닫기 버튼 */}
      <TouchableOpacity style={styles.closeBtn} onPress={() => router.back()}>
        <View style={styles.closeCircle}>
          <Text style={styles.closeText}>×</Text>
        </View>
      </TouchableOpacity>
      {/* 날짜 */}
      <Text style={styles.yearMonth}>{`${currentDate.getFullYear()}년 ${currentDate.getMonth() + 1}월`}</Text>
      <Text style={styles.day}>{`${currentDate.getDate()}일`}</Text>

      {/* 다이어리 카드 갤러리 */}
      <View style={styles.galleryContainer}>
        <TouchableOpacity onPress={goToPrevDay} style={styles.leftCardTouchable}>
          <View style={[styles.card, styles.sideCard, { width: SIDE_CARD_WIDTH, height: CARD_HEIGHT }]}>
            <Image
              source={prevDiary.written ? require('@/assets/images/diary_written.png') : require('@/assets/images/diary_not_written.png')}
              style={styles.bookImage}
            />
            <Text style={styles.sideDateText}>{`${prevDiary.day}일`}</Text>
          </View>
        </TouchableOpacity>

        <View style={[styles.card, styles.centerCard, { width: CARD_WIDTH, height: CARD_HEIGHT }]}>
          <Image
            source={currentDiary.written ? require('@/assets/images/diary_written.png') : require('@/assets/images/diary_not_written.png')}
            style={styles.bookImage}
          />
          <Image
            source={require('@/assets/images/mory_initial.png')}
            style={[
              styles.mory,
              {
                width: MORY_SIZE,
                height: MORY_SIZE,
                top: MORY_TOP,
                left: (CARD_WIDTH - MORY_SIZE) / 2,
              },
            ]}
          />
        </View>

        <TouchableOpacity onPress={goToNextDay} style={styles.rightCardTouchable}>
          <View style={[styles.card, styles.sideCard, { width: SIDE_CARD_WIDTH, height: CARD_HEIGHT }]}>
            <Image
              source={nextDiary.written ? require('@/assets/images/diary_written.png') : require('@/assets/images/diary_not_written.png')}
              style={styles.bookImage}
            />
            <Text style={styles.sideDateText}>{`${nextDiary.day}일`}</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* 내용보기 버튼 */}
      <TouchableOpacity style={styles.button} onPress={() => router.push('/record-detail')}>
        <Text style={styles.buttonText}>내용보기</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B2540',
    alignItems: 'center',
    paddingTop: 44,
  },
  closeBtn: {
    position: 'absolute',
    top: 36,
    left: 20,
    zIndex: 10,
  },
  closeCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#111A2B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  yearMonth: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 0,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  day: {
    color: '#fff',
    fontSize: 38,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    letterSpacing: 1.2,
  },
  galleryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 12,
  },
  card: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  centerCard: {
    zIndex: 2,
    marginHorizontal: -20, // Overlap side cards slightly
  },
  sideCard: {
    opacity: 0.5,
    transform: [{ scale: 0.85 }],
  },
  bookImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  mory: {
    position: 'absolute',
    zIndex: 10,
  },
  sideDateText: {
    position: 'absolute',
    top: '1%', // Move text higher up on the book
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 24,
    fontWeight: 'bold',
  },
  button: {
    marginTop: 18,
    backgroundColor: '#183A5A',
    borderRadius: 24,
    paddingHorizontal: 56,
    paddingVertical: 16,
    minWidth: 220,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 19,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});

export const options = { headerShown: false };

export default function ChartScreen() {
  return <DiaryGallery />;
}