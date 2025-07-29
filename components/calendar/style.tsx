import { StyleSheet } from 'react-native';

const calendarStyles = StyleSheet.create({
  container: {
    fontFamily: 'Pretendard',
    backgroundColor: '#14213d',
    flex: 1,
    padding: 0,
    borderRadius: 16,
  },
  dayContainer: {
    width: 40,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 7,
    marginRight: 7,
    marginTop: 0,
    marginBottom: 0,
  },
  gradientBackground: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textSectionTitleColor: {
    fontFamily: 'Pretendard',
    fontWeight: '500',
    fontStyle: 'normal',
  },
  dayText: {
    fontFamily: 'Pretendard',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 48,
    textAlign: 'center',
  },
  todayText: {
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 48,
  },
  weekdays: {
    flexDirection: 'row',
    marginBottom: 5,
  },
});

export default calendarStyles;
