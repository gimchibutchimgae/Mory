import WeekCalendar from '@/components/calendar/WeekCalendar';
import { IconSvg } from '@/components/ui/IconSvg';
import * as S from '@/components/ui/StyledScreen';
import { useRouter } from 'expo-router';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const options = { headerShown: false };

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#14213d' }}>
      <ScrollView style={{ flex: 1, backgroundColor: '#14213d' }}>
        <S.ScreenContainer>
          
          {/* 주간 캘린더 테스트 */}
          <View>
            <WeekCalendar useCurrentWeek={true} />
          </View>
          
          <TouchableOpacity onPress={() => router.push('/(calendar)/calendar')}>
            <View style={{ marginTop: 24 }}>
              <IconSvg 
                name="calendar" 
                size={27} 
                color="#FFFFFF"
              />
            </View>
          </TouchableOpacity>
        </S.ScreenContainer>
      </ScrollView>
    </SafeAreaView>
  );
}