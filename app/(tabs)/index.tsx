import * as S from '@/components/ui/StyledScreen';
import { useRouter } from 'expo-router';
import { Image, TouchableOpacity } from 'react-native';

export const options = { headerShown: false };

export default function HomeScreen() {
  const router = useRouter();

  return (
    <S.ScreenContainer>
      <S.ScreenTitle>홈</S.ScreenTitle>
      <TouchableOpacity onPress={() => router.push('/(calendar)/calendar')}>
        <Image
          source={require('@/assets/icons/calendar.png')}
          style={{ width: 48, height: 48, marginTop: 24 }}
        />
      </TouchableOpacity>
    </S.ScreenContainer>
  );
}