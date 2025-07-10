import MonthCalendar from '@/components/calendar/MonthCalendar';
import * as S from '@/components/ui/StyledScreen';

export const options = { headerShown: false };

export default function CalendarScreen() {
  return (
    <S.ScreenContainer>
      <S.ScreenTitle>캘린더 페이지</S.ScreenTitle>
      <MonthCalendar />
    </S.ScreenContainer>
  );
}