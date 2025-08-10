import { useRouter } from 'expo-router';
import {TouchableOpacity, Text, View, Image, Dimensions, StyleSheet, Platform, UIManager} from 'react-native';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '@/app/context/AuthContext';
import { useCalendar } from '@/app/context/CalendarContext';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const DiaryGallery = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { token } = useContext(AuthContext);
  const { monthData, fetchMonthData } = useCalendar();
  const router = useRouter();
  const windowWidth = Dimensions.get('window').width;
  const CARD_WIDTH = windowWidth * 0.55;
  const SIDE_CARD_WIDTH = windowWidth * 0.45;
  const CARD_HEIGHT = 340;
  const MORY_SIZE = 92;
  const MORY_TOP = 70;

  // 현재 월의 데이터를 가져오기
  useEffect(() => {
    const currentMonth = currentDate.getMonth() + 1;
    console.log('📖 [DiaryGallery] Fetching month data for:', currentMonth);
    fetchMonthData(currentMonth);
  }, [currentDate, fetchMonthData]);

  const getDiaryForDate = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    // monthData에서 해당 날짜의 일기 작성 여부 확인
    const dayKey = day.toString();
    const emotion = monthData ? monthData[dayKey] : null;
    const written = emotion !== null && emotion !== 'YET';

    console.log('📖 [DiaryGallery] getDiaryForDate:', {
      date: `${year}-${month}-${day}`,
      dayKey,
      emotion,
      written,
      monthData: monthData ? `${Object.keys(monthData).length} days` : 'no data'
    });

    return {
      dateString: `${year}년 ${month}월 ${day}일`,
      day: day,
      written: written,
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
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          const year = currentDate.getFullYear();
          const month = currentDate.getMonth() + 1;
          const day = currentDate.getDate();
          console.log('📖 [DiaryGallery] Navigating to record-detail with date:', { year, month, day });
          router.push(`/record-detail?year=${year}&month=${month}&day=${day}` as any);
        }}
      >
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
  leftCardTouchable: {
    // 좌측 카드 터치 영역
  },
  rightCardTouchable: {
    // 우측 카드 터치 영역
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


export default function ChartScreen() {
  return <DiaryGallery />;
}