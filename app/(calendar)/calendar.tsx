import MonthCalendar from '@/components/calendar/MonthCalendar';
import * as S from '@/components/ui/StyledScreen';

export const options = { headerShown: false };

export default function CalendarScreen() {
  return (
    <S.ScreenContainer>
      <MonthCalendar />
    </S.ScreenContainer>
  );
}
