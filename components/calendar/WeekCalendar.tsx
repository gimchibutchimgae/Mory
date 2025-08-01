import { LinearGradient } from 'expo-linear-gradient';
import React, { useMemo } from 'react';
import { Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

// MonthCalendar에서 가져온 그라데이션 색상 정의
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

type DayState = 'gray' | 'red' | 'yellow' | 'green' | 'blue';
type WeekDataMap = { [date: string]: DayState };

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];

// 오늘 표시용 SVG 컴포넌트 (MonthCalendar에서 가져옴)
const TodayMorySvg = ({ size = 16 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 35 34" fill="none">
    <Path
      d="M11.3815 6.07682C14.1805 4.65209 17.9176 7.71575 19.1436 8.1812C20.3696 8.64664 24.3841 5.90395 26.7874 8.1185C29.1906 10.333 27.0216 14.5253 27.1969 15.999C27.3723 17.4727 30.9721 20.6853 29.6063 23.4012C28.2184 26.1611 23.259 25.1937 22.0683 25.7998C20.8776 26.4059 19.5555 30.9224 15.9426 30.8048C12.3298 30.6872 11.0572 24.7442 11.0572 24.7442C11.0572 24.7442 4.70379 23.8736 4.67913 20.0977C4.65447 16.3218 7.73134 15.6504 8.63475 13.8754C9.53816 12.1003 8.50398 7.54157 11.3815 6.07682Z"
      fill="#FBFAEF"
    />
  </Svg>
);

// 랜덤 상태 생성 함수 (MonthCalendar에서 가져옴)
function getRandomState(): DayState {
  const states: DayState[] = ['gray', 'red', 'yellow', 'green', 'blue'];
  return states[Math.floor(Math.random() * states.length)];
}

// 특정 주의 날짜들을 가져오는 함수
function getWeekDates(year: number, month: number, weekNumber: number): string[] {
  const firstDayOfMonth = new Date(year, month - 1, 1);
  const firstDayWeekday = firstDayOfMonth.getDay(); // 0: 일요일, 1: 월요일, ...
  
  // 첫 번째 주의 시작일 계산
  const firstWeekStart = new Date(year, month - 1, 1 - firstDayWeekday);
  
  // 해당 주의 시작일 계산
  const weekStart = new Date(firstWeekStart);
  weekStart.setDate(firstWeekStart.getDate() + (weekNumber - 1) * 7);
  
  const weekDates: string[] = [];
  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(weekStart);
    currentDate.setDate(weekStart.getDate() + i);
    weekDates.push(currentDate.toISOString().split('T')[0]);
  }
  
  return weekDates;
}

// 오늘이 포함된 주간의 날짜들을 가져오는 함수
function getCurrentWeekDates(): string[] {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0: 일요일, 1: 월요일, ...
  
  // 이번 주 일요일 계산
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - dayOfWeek);
  
  const weekDates: string[] = [];
  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(startOfWeek);
    currentDate.setDate(startOfWeek.getDate() + i);
    weekDates.push(currentDate.toISOString().split('T')[0]);
  }
  
  return weekDates;
}

// 주간 감정 데이터 생성
function getWeekDataMap(weekDates: string[]): WeekDataMap {
  const map: WeekDataMap = {};
  weekDates.forEach(date => {
    map[date] = getRandomState();
  });
  return map;
}

interface WeekCalendarProps {
  year?: number;
  month?: number;
  weekNumber?: number; // 1: 첫 번째 주, 2: 두 번째 주, ...
  useCurrentWeek?: boolean; // true: 오늘이 포함된 주간 사용, false: 지정된 년월/주차 사용
}

export default function WeekCalendar({ 
  year = new Date().getFullYear(), 
  month = new Date().getMonth() + 1, 
  weekNumber = 1,
  useCurrentWeek = true // 기본값을 true로 설정
}: WeekCalendarProps) {
  const today = new Date();
  const todayString = today.toISOString().split('T')[0];
  
  // 해당 주의 날짜들 계산
  const weekDates = useMemo(() => {
    if (useCurrentWeek) {
      return getCurrentWeekDates();
    } else {
      return getWeekDates(year, month, weekNumber);
    }
  }, [year, month, weekNumber, useCurrentWeek]);
  
  // 주간 감정 데이터
  const weekDataMap = useMemo(() => getWeekDataMap(weekDates), [weekDates]);

  // 현재 주간의 년월 정보 계산
  const currentWeekInfo = useMemo(() => {
    if (useCurrentWeek) {
      // 오늘 날짜 기준으로 년월 표시
      return {
        year: today.getFullYear(),
        month: today.getMonth() + 1
      };
    } else {
      return { year, month };
    }
  }, [today, useCurrentWeek, year, month]);

  return (
    <View style={{
      backgroundColor: '#14213d',
      paddingHorizontal: 20,
      paddingVertical: 20,
    }}>
      {/* 헤더 - 년월 표시 */}
      <Text style={{
        color: '#fff',
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 20,
        fontFamily: 'Pretendard',
      }}>
        {currentWeekInfo.year}년 {currentWeekInfo.month}월
      </Text>
      
      {/* 주간 캘린더 */}
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 5,
      }}>
        {weekDates.map((dateString, index) => {
          const date = new Date(dateString);
          const dayNumber = date.getDate();
          const isToday = dateString === todayString;
          const isPastOrToday = new Date(dateString).setHours(0, 0, 0, 0) <= today.setHours(0, 0, 0, 0);
          
          // 감정 상태에 따른 그라데이션 색상
          let gradientColor = gradientColors.gray;
          if (isPastOrToday && weekDataMap[dateString]) {
            gradientColor = gradientColors[weekDataMap[dateString]];
          }
          
          return (
            <View key={dateString} style={{ 
              alignItems: 'center',
              marginHorizontal: 9,
              paddingHorizontal: 3,
              borderRadius: 25,
              // 오늘 날짜일 때 외곽 테두리 추가
              ...(isToday && {
                borderWidth: 3,
                borderColor: '#1D6AA1',
                backgroundColor: '#1D6AA1',
                shadowColor: '#1D6AA1',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 8,
              })
            }}>
              {/* 요일 표시 */}
              <Text style={{
                color: isPastOrToday && weekDataMap[dateString] && gradientColor !== gradientColors.gray 
                  ? '#ffffff' 
                  : '#736F6FB2',
                fontSize: 16,
                fontFamily: 'Pretendard',
                lineHeight: 40,
                fontWeight: '500',
              }}>
                {WEEKDAYS[index]}
              </Text>
              
              {/* 날짜 원형 */}
              <View style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                overflow: 'hidden',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                marginBottom: 2,
              }}>
                <LinearGradient
                  colors={gradientColor as [string, string]}
                  style={{
                    width: '100%',
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text style={{
                    color: gradientColor === gradientColors.gray 
                      ? '#737373B2' 
                      : '#000000',
                    fontSize: 16,
                    fontWeight: 'bold',
                    fontFamily: 'Pretendard',
                  }}>
                    {dayNumber}
                  </Text>
                </LinearGradient>
                
                {/* 오늘 표시 */}
                {isToday && (
                  <View style={{
                    position: 'absolute',
                    top: -8,
                    right: -8,
                  }}>
                    <TodayMorySvg size={16} />
                  </View>
                )}
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}
