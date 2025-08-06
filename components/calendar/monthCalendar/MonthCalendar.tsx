import { useCalendar } from '@/app/context/CalendarContext';
import SpeechBubble from '@/components/ui/SpeechBubble/SpeechBubble';
import { mapAPIEmotionToDayState } from '@/utils/emotionMapper';
import React, { useEffect, useMemo, useState } from 'react';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import Svg, { Path } from 'react-native-svg';
import * as S from './style';
import { gradientColors } from './style';

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
  const [currentDate, setCurrentDate] = useState(new Date());

  const today = new Date();
  const todayString = today.toISOString().split('T')[0];

  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  useEffect(() => {
    fetchMonthData(currentMonth);
  }, [currentMonth, fetchMonthData]);

  const onMonthChange = (month) => {
    setCurrentDate(new Date(month.dateString));
  };

  const hasTodayDiary = useMemo(() => {
    if (!monthData) return false;
    const todayDay = today.getDate().toString();
    const todayEmotion = monthData[todayDay];
    return todayEmotion !== null && todayEmotion !== 'YET';
  }, [monthData, today]);

  const todayEmotionState = useMemo(() => {
    if (!monthData) return 'gray';
    const todayDay = today.getDate().toString();
    const todayEmotion = monthData[todayDay];
    return mapAPIEmotionToDayState(todayEmotion);
  }, [monthData, today]);

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
          onMonthChange={onMonthChange}
          renderHeader={(date) => (
            <S.HeaderText>
              {date.getFullYear()}년 {String(date.getMonth() + 1).padStart(2, '0')}월
            </S.HeaderText>
          )}
          dayComponent={({ date }) => {
            if (!date) return null;
            const dateString = date.dateString;
            const isToday = dateString === todayString;

            const emotionState = getEmotionForDate(dateString);
            const gradientColor = gradientColors[emotionState];
            const textColor = '#000000';

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
                    {date.day}
                  </S.DayText>
                </S.GradientBackground>

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

      {!hasTodayDiary && (
        <SpeechBubble message="오늘 하루 어땠어?" />
      )}

      <S.WriteButton
        onPress={() => {
          console.log('일기 작성하기');
        }}
      >
        <WriteSvg size={20} />
      </S.WriteButton>
    </S.Container>
  );
}