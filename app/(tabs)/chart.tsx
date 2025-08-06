import { useRouter } from 'expo-router';
import { TouchableOpacity, Text, View, Image } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import * as S from '@/components/ui/StyledScreen';

// 가짜 데이터 정의
const fakeChartData = {
  date: '2025년 7월 9일',
  data: [
    { value: 60, color: '#FFD36A' },
    { value: 20, color: '#FF8A7A' },
    { value: 15, color: '#7EDFA2' },
    { value: 5, color: '#A2B6FF' },
  ],
};

const PieChart = ({ data, size, innerRadius }: { data: { value: number, color: string }[], size: number, innerRadius: number }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let startAngle = 0;

  const paths = data.map(item => {
    const angle = (item.value / total) * 360;
    const endAngle = startAngle + angle;

    const x1 = size / 2 + (size / 2) * Math.cos(Math.PI * startAngle / 180);
    const y1 = size / 2 + (size / 2) * Math.sin(Math.PI * startAngle / 180);
    const x2 = size / 2 + (size / 2) * Math.cos(Math.PI * endAngle / 180);
    const y2 = size / 2 + (size / 2) * Math.sin(Math.PI * endAngle / 180);

    const largeArcFlag = angle > 180 ? 1 : 0;

    const d = `M ${size / 2},${size / 2} L ${x1},${y1} A ${size / 2},${size / 2} 0 ${largeArcFlag},1 ${x2},${y2} Z`;

    startAngle = endAngle;

    return <Path key={item.color} d={d} fill={item.color} />;
  });

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Svg height={size} width={size} viewBox={`0 0 ${size} ${size}`}>
        {paths}
        <Path d={`M ${size/2 - innerRadius},${size/2} a ${innerRadius},${innerRadius} 0 1,0 ${innerRadius*2},0 a ${innerRadius},${innerRadius} 0 1,0 -${innerRadius*2},0`} fill="#112B44" />
      </Svg>
      <View style={{ position: 'absolute' }}>
        <Image 
          source={require('@/assets/images/mory_initial.png')} 
          style={{ width: 60, height: 60 }}
        />
      </View>
    </View>
  );
};

export const options = { headerShown: false };

export default function ChartScreen() {
  const router = useRouter();

  const handlePress = () => {
    router.push('/record-detail');
  };

  return (
    <S.ScreenContainer>
      <S.ScreenTitle>기록</S.ScreenTitle>
      <S.ScreenTitle>{fakeChartData.date}</S.ScreenTitle>

      <S.ScreenTitle>임시 상세 보기</S.ScreenTitle>
      <TouchableOpacity
        style={{
          backgroundColor: '#112B44',
          borderRadius: 12,
          paddingVertical: 12,
          paddingHorizontal: 24,
          marginTop: 16,
        }}
        onPress={handlePress}
      >
        <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>
          상세 기록 보기
        </Text>
      </TouchableOpacity>
    </S.ScreenContainer>
  );
}