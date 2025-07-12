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
  textSectionTitleColor: {
    fontFamily: 'Pretendard',
    fontWeight: '500',
    fontStyle: 'normal',
  },
  todayImage: {
    width: 42,
    height: 48,
    marginBottom: 6,
  },
  dayImage: {
    width: 40,
    height: 40,
  },
  dayText: {
    position: 'absolute',
    fontFamily: 'Pretendard',
    fontWeight: '500',
    fontStyle: 'normal',
    lineHeight: 40,
    color: '#000000',
    fontSize: 20,
    textAlign: 'center',
    width: 40,
    height: 40,
    textAlignVertical: 'center',
  },
  todayText: {
    width: 40,
    height: 40,
    marginTop: 2,
  },
  weekdays: {
    flexDirection: 'row',
    marginBottom: 5,
  },
});

export default calendarStyles;
