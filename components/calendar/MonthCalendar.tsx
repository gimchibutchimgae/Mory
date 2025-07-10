import React from 'react';
import { Text, View } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import calendarStyles from './style';

const today = new Date();
const todayString = today.toISOString().split('T')[0];

// 한국어 설정
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

export default function MonthCalendar() {
  // 오늘 이전 날짜를 비활성화 처리
  const minDate = todayString;

  return (
    <View style={calendarStyles.container}>
      <Calendar
        // 현재 월로 이동
        current={todayString}
        // 오늘 이후 날짜만 선택 가능
        minDate={'1900-01-01'}
        hideExtraDays={true}
        monthFormat={'yyyy년 MM월'}
        // 커스텀 스타일
        dayComponent={({ date, state }) => {
          const dateString = date?.dateString;
          const isPast =
            dateString && new Date(dateString).setHours(0, 0, 0, 0) <
            today.setHours(0, 0, 0, 0);
          const isFuture =
            dateString && new Date(dateString).setHours(0, 0, 0, 0) >
            today.setHours(0, 0, 0, 0);

          return (
            <View
              style={[
                calendarStyles.dayContainer,
                isFuture && calendarStyles.futureDay,
                isPast && calendarStyles.pastDay,
                dateString === todayString && calendarStyles.today,
              ]}
            >
              <Text
                style={{
                  color: isFuture ? '#aaa' : '#fff',
                  fontWeight: dateString === todayString ? 'bold' : 'normal',
                }}
              >
                {date?.day}
              </Text>
            </View>
          );
        }}
        theme={{
          backgroundColor: '#14213d',
          calendarBackground: '#14213d',
          monthTextColor: '#fff',
          textSectionTitleColor: '#fff',
          dayTextColor: '#fff',
          todayTextColor: '#fff',
          arrowColor: '#fff',
        }}
      />
    </View>
  );
}
