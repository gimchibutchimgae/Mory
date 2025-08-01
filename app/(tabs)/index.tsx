import WeekCalendar from '@/components/calendar/weekCalendar/WeekCalendar';
import * as S from '@/components/ui/StyledScreen';
import { useRouter } from 'expo-router';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const options = { headerShown: false };

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#14213d' }}>
      <ScrollView style={{ flex: 1, backgroundColor: '#14213d' }}>
        <S.ScreenContainer>
          <View>
            <WeekCalendar useCurrentWeek={true} />
          </View>
        </S.ScreenContainer>
      </ScrollView>
    </SafeAreaView>
  );
}