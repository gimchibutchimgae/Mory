import { LinearGradient } from 'expo-linear-gradient';
import React, { useMemo, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import calendarStyles from './style';

// 그라데이션 색상 정의
const gradientColors: Record<
  'red' | 'yellow' | 'green' | 'blue' | 'gray',
  string[]
> = {
  red: ['#FF7342', '#FE2C4D'],
  yellow: ['#FCDD63', '#FEB821'],
  green: ['#7AE9A0', '#4ED491'],
  blue: ['#85B7FC', '#748CFE'],
  gray: ['#6D686880', '#6D686880'],
};

const today = new Date();
const todayString = today.toISOString().split('T')[0];

LocaleConfig.locales['ko'] = {
  monthNames: [
    '1월', '2월', '3월', '4월', '5월', '6월',
    '7월', '8월', '9월', '10월', '11월', '12월'
  ],
  monthNamesShort: [
    '1월', '2월', '3월', '4월', '5월', '6월',
    '7월', '8월', '9월', '10월', '11월', '12월'
  ],
  dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
  today: '오늘'
};
LocaleConfig.defaultLocale = 'ko';

type DayState = 'gray' | 'red' | 'yellow' | 'green' | 'blue';
type JulyRandomMap = { [date: string]: DayState };
function getRandomState(): DayState {
  const states: DayState[] = ['gray', 'red', 'yellow', 'green', 'blue'];
  return states[Math.floor(Math.random() * states.length)];
}
function getJulyRandomMap(): JulyRandomMap {
  const map: JulyRandomMap = {};
  for (let d = 1; d <= 31; d++) {
    const date = `2024-07-${d.toString().padStart(2, '0')}`;
    map[date] = getRandomState();
  }
  return map;
}

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];

export default function MonthCalendar() {
  const julyRandomMap = useMemo<JulyRandomMap>(() => getJulyRandomMap(), []);
  
  // 오늘 일기 작성 여부 상태 (실제로는 API에서 가져올 데이터)
  // TODO: 실제 구현시에는 props로 받거나 API에서 가져오도록 변경
  const [hasTodayDiary, setHasTodayDiary] = useState(false); // false: 작성 안함, true: 작성 완료
  const [todayEmotionState, setTodayEmotionState] = useState<DayState>('red'); // 오늘의 감정 상태

  return (
    <View style={calendarStyles.container}>
      {/* 테스트용 버튼 - 실제 구현시에는 제거 */}
      <View style={{ padding: 10, alignItems: 'center' }}>
        <TouchableOpacity
          onPress={() => {
            setHasTodayDiary(!hasTodayDiary);
            // 랜덤으로 감정 상태 변경
            const emotions: DayState[] = ['red', 'yellow', 'green', 'blue'];
            setTodayEmotionState(emotions[Math.floor(Math.random() * emotions.length)]);
          }}
          style={{
            backgroundColor: '#fff',
            padding: 8,
            borderRadius: 8,
            marginBottom: 10
          }}
        >
          <Text style={{ color: '#000', fontSize: 12 }}>
            {hasTodayDiary ? '오늘 일기 삭제 (테스트)' : '오늘 일기 작성 (테스트)'}
          </Text>
        </TouchableOpacity>
      </View>
      
      <Calendar
        current={todayString}
        minDate={'1900-01-01'}
        hideExtraDays={true}
        monthFormat={'yyyy년 MM월'}
        hideDayNames={false}
        renderHeader={(date) => (
          <Text style={{ color: '#fff', fontSize: 24, textAlign: 'center', marginVertical: 10 }}>
            {date.getFullYear()}년 {String(date.getMonth() + 1).padStart(2, '0')}월
          </Text>
        )}
        dayComponent={({ date }) => {
          const dateString = date?.dateString;
          const dateObj = dateString ? new Date(dateString) : null;
          const isPast =
            dateString && new Date(dateString).setHours(0, 0, 0, 0) < today.setHours(0, 0, 0, 0);
          const isFuture =
            dateString && new Date(dateString).setHours(0, 0, 0, 0) > today.setHours(0, 0, 0, 0);
          const isToday = dateString === todayString;

          let gradientColor = gradientColors.gray;

          if (isToday) {
            // 오늘 날짜 처리
            if (hasTodayDiary) {
              // 일기를 작성한 경우: 감정 분석 결과에 따른 색상
              gradientColor = gradientColors[todayEmotionState];
            } else {
              // 일기를 작성하지 않은 경우: 회색
              gradientColor = gradientColors.gray;
            }
          } else if (isFuture) {
            gradientColor = gradientColors.gray;
          } else if (isPast && dateObj && dateObj.getMonth() === 6) {
            const state: DayState = julyRandomMap[dateString] || 'yellow';
            gradientColor = gradientColors[state];
          } else if (isPast) {
            gradientColor = gradientColors.gray;
          }

          return (
            <View style={calendarStyles.dayContainer}>
              <LinearGradient
                colors={gradientColor as any}
                style={calendarStyles.gradientBackground} // 모든 날짜 동일한 크기
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Text
                  style={[
                    calendarStyles.dayText,
                    isToday && calendarStyles.todayText,
                    // 배경색에 따라 글자색 적용
                    gradientColor === gradientColors.gray 
                      ? { color: 'rgba(115, 115, 115, 0.70)' } 
                      : { color: '#000000' }
                  ]}
                >
                  {date?.day}
                </Text>
              </LinearGradient>
            </View>
          );
        }}
        theme={{
          backgroundColor: '#14213d',
          calendarBackground: '#14213d',
          textMonthFontFamily: 'Pretendard !important',
          textDayHeaderFontFamily: 'Pretendard',
          monthTextColor: '#fff',
          textSectionTitleColor: '#9C9A9A',
          dayTextColor: '#fff',
          todayTextColor: '#fff',
          arrowColor: '#fff',
        }}
      />
    </View>
  );
}
