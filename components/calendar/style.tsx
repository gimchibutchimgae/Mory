import { StyleSheet } from 'react-native';

const calendarStyles = StyleSheet.create({
  container: {
    backgroundColor: '#14213d',
    flex: 1,
    padding: 16,
    borderRadius: 16,
  },
  dayContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 2,
  },
  pastDay: {
    backgroundColor: '#264653',
  },
  today: {
    backgroundColor: '#fca311',
  },
  futureDay: {
    backgroundColor: '#22223b',
  },
});

export default calendarStyles;
