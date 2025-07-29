import { IconSvg } from '@/components/ui/IconSvg';
import * as S from '@/components/ui/StyledScreen';
import { useRouter } from 'expo-router';
import { TouchableOpacity, View } from 'react-native';

export const options = { headerShown: false };

export default function HomeScreen() {
  const router = useRouter();

  return (
    <S.ScreenContainer>
      <S.ScreenTitle>홈</S.ScreenTitle>
      <TouchableOpacity onPress={() => router.push('/(calendar)/calendar')}>
        <View style={{ marginTop: 24 }}>
          <IconSvg 
            name="calendar" 
            size={48} 
            color="#FFFFFF"
          />
        </View>
      </TouchableOpacity>
    </S.ScreenContainer>
  );
}