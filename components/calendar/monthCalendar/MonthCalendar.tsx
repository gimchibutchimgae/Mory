import { useCalendar } from '@/app/context/CalendarContext';
import SpeechBubble from '@/components/ui/SpeechBubble/SpeechBubble';
import { mapAPIEmotionToDayState } from '@/utils/emotionMapper';
import { useRouter } from 'expo-router';
import React, { useEffect, useMemo } from 'react';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import Svg, { Path } from 'react-native-svg';
import * as S from './style';

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

// Write 아이콘 SVG 컴포넌트
const WriteSvg = ({ size = 24 }: { size?: number }) => (
  <Svg width={32} height={32} viewBox="0 0 24 24" fill="none">
    <Path
      d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
      fill="#001F3D"
    />
  </Svg>
);

export default function MonthCalendar() {
  const { monthData, fetchMonthData, loading } = useCalendar();
  const router = useRouter();
  
  // KST 기준으로 오늘 날짜 계산
  const today = getKSTToday();
  const todayString = getKSTTodayString();
  
  console.log('🗓️ [MonthCalendar] Date calculation - today:', today, 'todayString:', todayString, 'today.getDate():', today.getDate());

  // 현재 월의 감정 데이터 생성
  const currentMonth = today.getMonth() + 1; // 1-12
  const currentYear = today.getFullYear();

  // 오늘 일기 작성 여부 상태 (API 데이터에서 계산)
  const hasTodayDiary = useMemo(() => {
    if (!monthData) return false;
    // todayString에서 실제 날짜 추출 (2025-08-07 → 7)
    const todayDay = todayString.split('-')[2]; // "07" → 7로 변환 시 자동으로 0이 제거됨
    const todayDayNumber = parseInt(todayDay, 10).toString(); // "07" → "7"
    const todayEmotion = monthData[todayDayNumber];
    console.log('🗓️ [MonthCalendar] hasTodayDiary check - todayString:', todayString, 'extracted day:', todayDayNumber, 'todayEmotion:', todayEmotion, 'result:', todayEmotion !== null && todayEmotion !== 'YET');
    return todayEmotion !== null && todayEmotion !== 'YET';
  }, [monthData, todayString]);
  
  // 오늘의 감정 상태 (API 데이터에서 가져오기)
  const todayEmotionState = useMemo(() => {
    if (!monthData) return 'gray';
    // todayString에서 실제 날짜 추출 (2025-08-07 → 7)
    const todayDay = todayString.split('-')[2]; // "07" → 7로 변환 시 자동으로 0이 제거됨
    const todayDayNumber = parseInt(todayDay, 10).toString(); // "07" → "7"
    const todayEmotion = monthData[todayDayNumber];
    const mappedState = mapAPIEmotionToDayState(todayEmotion);
    console.log('🗓️ [MonthCalendar] todayEmotionState - todayString:', todayString, 'extracted day:', todayDayNumber, 'todayEmotion:', todayEmotion, 'mappedState:', mappedState);
    return mappedState;
  }, [monthData, todayString]);

  useEffect(() => {
    if (!monthData && !loading) {
      fetchMonthData(currentMonth);
    }
  }, [currentMonth, fetchMonthData, monthData, loading]);

  // 실제 API 데이터 사용
  const getEmotionForDate = (dateString: string): DayState => {
    if (!monthData) return 'gray';

    const day = new Date(dateString).getDate().toString();
    const apiEmotion = monthData[day];
    return mapAPIEmotionToDayState(apiEmotion);
  };

  return (
    <S.Container>
      <S.CalendarWrapper>
        <Calendar
          current={todayString}
          minDate={'1900-01-01'}
          hideExtraDays={true}
          monthFormat={'yyyy년 MM월'}
          hideDayNames={false}
          renderHeader={(date) => (
            <S.HeaderText>
              {date.getFullYear()}년 {String(date.getMonth() + 1).padStart(2, '0')}월
            </S.HeaderText>
          )}
        dayComponent={({ date }) => {
          const dateString = date?.dateString;
          const dateObj = dateString ? new Date(dateString + 'T00:00:00+09:00') : null;
          const kstToday = getKSTToday();
          const todayObj = new Date(kstToday.getUTCFullYear(), kstToday.getUTCMonth(), kstToday.getUTCDate());
          const isPast = dateObj && dateObj < todayObj;
          const isFuture = dateObj && dateObj > todayObj;
          const isToday = dateString === todayString;
          const isPastOrToday = isPast || isToday;

          let gradientColor = gradientColors.gray;
          let textColor = '#000000';

          if (isToday) {
            if (hasTodayDiary) {
              // 일기를 작성한 경우: 감정 분석 결과에 따른 색상
              gradientColor = gradientColors[todayEmotionState];
              textColor = '#000000';
            } else {
              // 일기를 작성하지 않은 경우: 연한 회색
              gradientColor = ['#748593', '#748593'];
              textColor = '#000000';
            }
          } else if (isFuture) {
            // 미래 날짜: 기존 회색 디자인 유지
            gradientColor = gradientColors.gray;
            textColor = 'rgba(115, 115, 115, 0.70)';
          } else if (isPast && dateObj && dateObj.getMonth() === currentMonth - 1) {
            // 과거 날짜이면서 현재 월인 경우 - API 데이터 사용
            const dayNumber = dateObj.getDate().toString();
            const apiEmotion = monthData ? monthData[dayNumber] : null;
            const state = mapAPIEmotionToDayState(apiEmotion);
            
            if (state && state !== 'gray') {
              // 감정 데이터가 있는 경우
              gradientColor = gradientColors[state];
              textColor = '#000000';
            } else {
              // 감정 데이터가 없는 과거 날짜: 연한 회색

              gradientColor = ['#748593', '#748593'];
              textColor = '#000000';
            }

            return (
              <S.DayContainer>
                <S.GradientBackground
                  colors={gradientColor as any}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <S.DayText
                    isToday={isToday}
                    textColor={textColor}
                  >
                    {date?.day}
                  </S.DayText>
                </S.GradientBackground>

                {/* 오늘 날짜에만 별 아이콘 표시 */}
                {isToday && (
                  <S.TodaySvgContainer>
                    <TodayMorySvg size={33} />
                  </S.TodaySvgContainer>
                )}
              </S.DayContainer>
            );
          }}
          theme={{
            backgroundColor: '#14213d',
            calendarBackground: '#14213d',
            textMonthFontFamily: 'Pretendard',
            textDayHeaderFontFamily: 'Pretendard',
            monthTextColor: '#fff',
            textSectionTitleColor: '#9C9A9A',
            dayTextColor: '#fff',
            todayTextColor: '#fff',
            arrowColor: '#fff',
          }}
        />
      </S.CalendarWrapper>

      {/* 말풍선 - 오늘 일기를 작성하지 않았을 때만 표시 */}
      {!hasTodayDiary && (
        <SpeechBubble message="오늘 하루 어땠어?" />
      )}

      {/* Write 버튼 - 일기 작성 화면으로 이동 */}
      <S.WriteButton
        onPress={() => {
          router.push('/(diary)/write' as any);
        }}
      >
        <WriteSvg size={20} />
      </S.WriteButton>
    </S.Container>
  );
}