import React, { useMemo } from 'react';
import { Image, Text, View } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import calendarStyles from './style';

const dayImages: Record<
  'red' | 'yellow' | 'green' | 'blue' | 'today' | 'gray',
  any
> = {
  red: require('../../assets/icons/daysRed.png'),
  yellow: require('../../assets/icons/daysYellow.png'),
  green: require('../../assets/icons/daysGreen.png'),
  blue: require('../../assets/icons/daysBlue.png'),
  today: require('../../assets/icons/daysToday.png'),
  gray: require('../../assets/icons/daysGray.png'),
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

  return (
    <View style={calendarStyles.container}>
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

          let imageSource = null;
          let imageStyle = calendarStyles.dayImage;

          if (isToday) {
            imageSource = dayImages.today;
            imageStyle = calendarStyles.todayImage;
          } else if (isFuture) {
            imageSource = dayImages.gray;
            imageStyle = calendarStyles.dayImage;
          } else if (isPast && dateObj && dateObj.getMonth() === 6) {
            const state: DayState = julyRandomMap[dateString] || 'yellow';
            imageSource = dayImages[state];
            imageStyle = calendarStyles.dayImage;
          } else if (isPast) {
            imageSource = dayImages.gray;
            imageStyle = calendarStyles.dayImage;
          }

          return (
            <View style={calendarStyles.dayContainer}>
              {imageSource && (
                <Image source={imageSource} style={imageStyle} resizeMode="contain" />
              )}
              <Text
                style={[
                  calendarStyles.dayText,
                  isToday && calendarStyles.todayText,
                ]}
              >
                {date?.day}
              </Text>
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
