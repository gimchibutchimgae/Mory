import { LinearGradient } from 'expo-linear-gradient';
import React, { useMemo, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import Svg, { Path } from 'react-native-svg';
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
  gray: ['#374553', '#374553'],
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

// 오늘 표시용 SVG 컴포넌트
const TodayMorySvg = ({ size = 16 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 35 34" fill="none">
    <Path
      d="M11.3815 6.07682C14.1805 4.65209 17.9176 7.71575 19.1436 8.1812C20.3696 8.64664 24.3841 5.90395 26.7874 8.1185C29.1906 10.333 27.0216 14.5253 27.1969 15.999C27.3723 17.4727 30.9721 20.6853 29.6063 23.4012C28.2184 26.1611 23.259 25.1937 22.0683 25.7998C20.8776 26.4059 19.5555 30.9224 15.9426 30.8048C12.3298 30.6872 11.0572 24.7442 11.0572 24.7442C11.0572 24.7442 4.70379 23.8736 4.67913 20.0977C4.65447 16.3218 7.73134 15.6504 8.63475 13.8754C9.53816 12.1003 8.50398 7.54157 11.3815 6.07682Z"
      fill="#FBFAEF"
    />
  </Svg>
);

export default function MonthCalendar() {
  const julyRandomMap = useMemo<JulyRandomMap>(() => getJulyRandomMap(), []);
  
  // 오늘 일기 작성 여부 상태 (실제로는 API에서 가져올 데이터)
  // TODO: 실제 구현시에는 props로 받거나 API에서 가져오도록 변경
  const [hasTodayDiary, setHasTodayDiary] = useState(false); // false: 작성 안함, true: 작성 완료
  const [todayEmotionState, setTodayEmotionState] = useState<DayState>('red'); // 오늘의 감정 상태

  return (
    <View style={calendarStyles.container}>
      <View style={{ maxWidth: 400, width: '100%' }}>
        <Calendar
          current={todayString}
          minDate={'1900-01-01'}
          hideExtraDays={true}
          monthFormat={'yyyy년 MM월'}
          hideDayNames={false}
          renderHeader={(date) => (
            <Text style={{ color: '#fff', fontSize: 24, textAlign: 'center', marginTop: 40, marginBottom: 40 }}>
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
              
              {/* 오늘 날짜에만 별 아이콘 표시 */}
              {isToday && (
                <View style={{
                  position: 'absolute',
                  top: 2,
                  left: -7,
                  zIndex: -1
                }}>
                  <TodayMorySvg size={33} />
                </View>
              )}
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
    </View>
  );
}
