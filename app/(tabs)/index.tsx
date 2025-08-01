import WeekCalendar from '@/components/calendar/weekCalendar/WeekCalendar';
import * as S from '@/components/ui/StyledScreen';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const options = { headerShown: false };

// 감정 상태별 배경색 정의
const emotionBackgroundColors = {
  yellow: 'rgba(250, 232, 103, 0.50)',
  red: 'rgba(254, 72, 70, 0.50)',
  green: 'rgba(94, 220, 151, 0.50)',
  blue: 'rgba(125, 162, 253, 0.50)',
  gray: 'transparent', // 입력되지 않았을 때
};

type DayState = 'gray' | 'red' | 'yellow' | 'green' | 'blue';

export default function HomeScreen() {
  const router = useRouter();
  const [todayEmotionState, setTodayEmotionState] = useState<DayState | null>(null);
  
  // 오늘의 감정 상태에 따른 배경색 결정
  const blurBackgroundColor = todayEmotionState ? emotionBackgroundColors[todayEmotionState] : 'transparent';

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#14213d' }}>
      <ScrollView style={{ flex: 1, backgroundColor: '#003B68' }}>
        <S.ScreenContainer>
          <S.WeekCalendarContainer>
            <WeekCalendar 
              useCurrentWeek={true} 
              onTodayEmotionChange={setTodayEmotionState}
            />
          </S.WeekCalendarContainer>
          
          {/* 그라데이션 배경 영역 */}
          <LinearGradient
            colors={['#14213d', '#1e3a5f', '#003B68']}
            style={{
              flex: 1,
              minHeight: 400,
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <S.EmotionButton onPress={() => router.push('/(emotions)/emotions')}>
              <S.EmotionButtonIcon source={require('@/assets/icons/info.svg')} />
              <S.EmotionButtonText>
                감정{'\n'}둘러보기
              </S.EmotionButtonText>
            </S.EmotionButton>
            <S.MainMoryContainer>
              <S.MainMoryBlurBackground backgroundColor={blurBackgroundColor} />
              <S.MainMory 
                source={require('@/assets/images/mainMory.svg')}
              />
              <S.MainMoryShadow 
                source={require('@/assets/images/mainMoryShadow.svg')}
              />
            </S.MainMoryContainer>
          </LinearGradient>
        </S.ScreenContainer>
      </ScrollView>
    </SafeAreaView>
  );
}