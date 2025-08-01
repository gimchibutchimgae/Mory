import WeekCalendar from '@/components/calendar/weekCalendar/WeekCalendar';
import * as S from '@/components/ui/StyledScreen';
import { LinearGradient } from 'expo-linear-gradient';
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
          
          {/* 그라데이션 배경 영역 */}
          <LinearGradient
            colors={['#14213d', '#1e3a5f', '#003B68']}
            style={{
              flex: 1,
              minHeight: 100,
              width: '100%',
            }}
          >
          </LinearGradient>
          <View
            style={{
              backgroundColor: '#003B68',
              minHeight: '100%',
              width: '100%',
            }}
          >

          </View>
        </S.ScreenContainer>
      </ScrollView>
    </SafeAreaView>
  );
}