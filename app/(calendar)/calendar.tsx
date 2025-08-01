import MonthCalendar from '@/components/calendar/monthCalendar/MonthCalendar';
import * as S from '@/components/ui/StyledScreen';

export const options = { headerShown: false };

export default function CalendarScreen() {
  return (
    <S.ScreenContainer>
      <MonthCalendar />
    </S.ScreenContainer>
  );
}
