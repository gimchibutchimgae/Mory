import { useCalendar } from '@/app/context/CalendarContext';
import { IconSvg } from '@/components/ui/IconSvg';
import { mapAPIEmotionToDayState } from '@/utils/emotionMapper';
import { useRouter } from 'expo-router';
import React, { useEffect, useMemo } from 'react';
import Svg, { Path } from 'react-native-svg';
import * as S from './style';

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

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];

// 한국 시간대(KST) 기준 오늘 날짜 가져오기
function getKSTToday(): Date {
  const now = new Date();
  // 한국은 UTC+9
  const kstDate = new Date(now.getTime() + (9 * 60 * 60 * 1000));
  return kstDate;
}

function getKSTTodayString(): string {
  const kstToday = getKSTToday();
  const year = kstToday.getUTCFullYear();
  const month = String(kstToday.getUTCMonth() + 1).padStart(2, '0');
  const day = String(kstToday.getUTCDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// 오늘 표시용 SVG 컴포넌트
const TodayMorySvg = ({ size = 16 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 35 34" fill="none">
    <Path
      d="M11.3815 6.07682C14.1805 4.65209 17.9176 7.71575 19.1436 8.1812C20.3696 8.64664 24.3841 5.90395 26.7874 8.1185C29.1906 10.333 27.0216 14.5253 27.1969 15.999C27.3723 17.4727 30.9721 20.6853 29.6063 23.4012C28.2184 26.1611 23.259 25.1937 22.0683 25.7998C20.8776 26.4059 19.5555 30.9224 15.9426 30.8048C12.3298 30.6872 11.0572 24.7442 11.0572 24.7442C11.0572 24.7442 4.70379 23.8736 4.67913 20.0977C4.65447 16.3218 7.73134 15.6504 8.63475 13.8754C9.53816 12.1003 8.50398 7.54157 11.3815 6.07682Z"
      fill="#FBFAEF"
    />
  </Svg>
);

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
  const kstToday = getKSTToday();
  const dayOfWeek = kstToday.getUTCDay(); // 0: 일요일, 1: 월요일, ...
  // 이번 주 일요일 계산
  const startOfWeek = new Date(kstToday);
  startOfWeek.setUTCDate(kstToday.getUTCDate() - dayOfWeek);
  const weekDates: string[] = [];
  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(startOfWeek);
    currentDate.setUTCDate(startOfWeek.getUTCDate() + i);
    const year = currentDate.getUTCFullYear();
    const month = String(currentDate.getUTCMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getUTCDate()).padStart(2, '0');
    weekDates.push(`${year}-${month}-${day}`);
  }

  return weekDates;
}

// 주간 감정 데이터를 API에서 가져와서 매핑하는 함수
function getEmotionForDate(dateString: string, monthData: any): DayState {
  if (!monthData) return 'gray';
  const day = new Date(dateString).getDate().toString();
  const apiEmotion = monthData[day];
  return mapAPIEmotionToDayState(apiEmotion);
}

interface WeekCalendarProps {
  year?: number;
  month?: number;
  weekNumber?: number; // 1: 첫 번째 주, 2: 두 번째 주, ...
  useCurrentWeek?: boolean; // true: 오늘이 포함된 주간 사용, false: 지정된 년월/주차 사용
  onTodayEmotionChange?: (emotion: DayState | null) => void; // 오늘의 감정 상태 콜백
}

export default function WeekCalendar({
                                       year = new Date().getFullYear(),
                                       month = new Date().getMonth() + 1,
                                       weekNumber = 1,
                                       useCurrentWeek = true, // 기본값을 true로 설정
                                       onTodayEmotionChange
                                     }: WeekCalendarProps) {
  const router = useRouter();
  const { monthData, fetchMonthData, loading } = useCalendar();
  const today = getKSTToday();
  const todayString = getKSTTodayString();

  // 해당 주의 날짜들 계산
  const weekDates = useMemo(() => {
    if (useCurrentWeek) {
      return getCurrentWeekDates();
    } else {
      return getWeekDates(year, month, weekNumber);
    }
  }, [year, month, weekNumber, useCurrentWeek]);
  // 현재 월의 데이터 가져오기 (데이터가 없을 때만)
  const currentMonth = today.getMonth() + 1;
  useEffect(() => {
    if (!monthData && !loading) {
      fetchMonthData(currentMonth);
    }
  }, [currentMonth, fetchMonthData, monthData, loading]);
  // 오늘의 감정 상태를 부모 컴포넌트에 전달
  const todayEmotion = useMemo(() => {
    return getEmotionForDate(todayString, monthData);
  }, [todayString, monthData]);
  React.useEffect(() => {
    if (onTodayEmotionChange) {
      onTodayEmotionChange(todayEmotion);
    }
  }, [todayEmotion, onTodayEmotionChange]);

  // 현재 주간의 년월 정보 계산
  const currentWeekInfo = useMemo(() => {
    if (useCurrentWeek) {
      // KST 기준 오늘 날짜로 년월 표시
      const kstToday = getKSTToday();
      return {
        year: kstToday.getFullYear(),
        month: kstToday.getMonth() + 1
      };
    } else {
      return { year, month };
    }
  }, [useCurrentWeek, year, month]);

  return (
    <S.WeekCalendarContainer>
      {/* 헤더 - 년월 표시와 캘린더 아이콘 */}
      <S.HeaderContainer>
        <S.YearMonthText>
          {currentWeekInfo.year}년 {currentWeekInfo.month}월
        </S.YearMonthText>

        {/* 캘린더 아이콘 - 우측 상단 */}
        <S.CalendarIconButton onPress={() => router.push('/(calendar)/calendar')}>
          <IconSvg name="calendar" size={27} color="#FFFFFF" />
        </S.CalendarIconButton>
      </S.HeaderContainer>

      {/* 주간 캘린더 */}
      <S.WeekContainer>
        {weekDates.map((dateString, index) => {
          const date = new Date(dateString + 'T00:00:00+09:00'); // KST 시간대로 파싱
          const dayNumber = date.getDate();
          const isToday = dateString === todayString;
          const kstToday = getKSTToday();
          const dateObj = new Date(dateString + 'T00:00:00+09:00');
          const todayObj = new Date(kstToday.getUTCFullYear(), kstToday.getUTCMonth(), kstToday.getUTCDate());
          const isPastOrToday = dateObj <= todayObj;
          // 감정 상태에 따른 그라데이션 색상 - API 데이터 사용
          const emotionState = getEmotionForDate(dateString, monthData);
          let gradientColor = gradientColors.gray;
          if (isPastOrToday && emotionState !== 'gray') {
            gradientColor = gradientColors[emotionState];
          }

          // 과거/오늘 날짜에 데이터가 없을 때 색상 처리
          if (isPastOrToday && gradientColor === gradientColors.gray) {
            gradientColor = ['#E8E8E880', '#E8E8E880'];
          }

          // 요일 텍스트 색상 계산
          let weekdayColor = '#ffffff';
          if (!isPastOrToday) {
            weekdayColor = '#736F6FB2';
          }

          // 날짜 텍스트 색상 계산
          let dateTextColor = '#000000';
          if (!isPastOrToday) {
            dateTextColor = '#737373B2';
          }

          return (
            <S.DayContainer key={dateString}>
              {/* 오늘 표시 SVG - 파란색 배경 뒤로 */}
              {isToday && (
                <S.SvgContainer top={-18} left={-7} zIndex={1}>
                  <TodayMorySvg size={40} />
                </S.SvgContainer>
              )}

              {/* 파란색 배경이 있는 컨테이너 */}
              <S.BlueBgContainer
                isToday={isToday}
                borderWidth={3}
                borderColor="#1D6AA1"
                backgroundColor="#1D6AA1"
                shadowColor="#1D6AA1"
                shadowOffsetX={0}
                shadowOffsetY={0}
                shadowOpacity={0.3}
                shadowRadius={8}
                elevation={8}
              >
                {/* 요일 표시 */}
                <S.WeekdayText color={weekdayColor}>
                  {WEEKDAYS[index]}
                </S.WeekdayText>

                {/* 날짜 원형 */}
                <S.DateCircleContainer>
                  <S.GradientBackground
                    colors={gradientColor as [string, string]}
                  >
                    <S.DateText color={dateTextColor}>
                      {dayNumber}
                    </S.DateText>
                  </S.GradientBackground>
                </S.DateCircleContainer>
              </S.BlueBgContainer>
            </S.DayContainer>
          );
        })}
      </S.WeekContainer>
    </S.WeekCalendarContainer>
  );
}