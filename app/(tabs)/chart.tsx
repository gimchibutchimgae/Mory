import { useRouter } from 'expo-router';
import { TouchableOpacity, Text, View, Image, Dimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import * as S from '@/components/ui/StyledScreen';

// 상수 정의
const CHART_SIZE = 200;
const INNER_RADIUS = 60;
const IMAGE_SIZE = 60;

// 타입 정의
interface ChartDataItem {
  value: number;
  color: string;
  label?: string;
}

interface ChartData {
  date: string;
  data: ChartDataItem[];
}

// 가짜 데이터 정의
const fakeChartData: ChartData = {
  date: '2025년 7월 9일',
  data: [
    { value: 60, color: '#FFD36A', label: '카테고리 1' },
    { value: 20, color: '#FF8A7A', label: '카테고리 2' },
    { value: 15, color: '#7EDFA2', label: '카테고리 3' },
    { value: 5, color: '#A2B6FF', label: '카테고리 4' },
  ],
};

const PieChart = ({ 
  data, 
  size = CHART_SIZE, 
  innerRadius = INNER_RADIUS 
}: { 
  data: ChartDataItem[];
  size?: number;
  innerRadius?: number;
}) => {
  // 데이터 유효성 검사
  if (!data || data.length === 0) {
    return null;
  }

  const total = data.reduce((sum, item) => sum + item.value, 0);
  
  if (total === 0) {
    return null;
  }

  let startAngle = -90; // 12시 방향에서 시작

  const paths = data.map((item, index) => {
    const angle = (item.value / total) * 360;
    const endAngle = startAngle + angle;

    // 라디안 변환
    const startRad = (Math.PI * startAngle) / 180;
    const endRad = (Math.PI * endAngle) / 180;

    const radius = size / 2;
    const x1 = size / 2 + radius * Math.cos(startRad);
    const y1 = size / 2 + radius * Math.sin(startRad);
    const x2 = size / 2 + radius * Math.cos(endRad);
    const y2 = size / 2 + radius * Math.sin(endRad);

    const largeArcFlag = angle > 180 ? 1 : 0;

    const d = `M ${size / 2},${size / 2} L ${x1},${y1} A ${radius},${radius} 0 ${largeArcFlag},1 ${x2},${y2} Z`;

    startAngle = endAngle;

    return <Path key={`${item.color}-${index}`} d={d} fill={item.color} />;
  });

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Svg height={size} width={size} viewBox={`0 0 ${size} ${size}`}>
        {paths}
        {/* 내부 원 */}
        <Path 
          d={`M ${size/2 - innerRadius},${size/2} a ${innerRadius},${innerRadius} 0 1,0 ${innerRadius*2},0 a ${innerRadius},${innerRadius} 0 1,0 -${innerRadius*2},0`} 
          fill="#112B44" 
        />
      </Svg>
      <View style={{ position: 'absolute' }}>
        <Image 
          source={require('@/assets/images/mory_initial.png')} 
          style={{ width: IMAGE_SIZE, height: IMAGE_SIZE }}
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

  const buttonStyles = {
    backgroundColor: '#112B44',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginTop: 16,
    alignItems: 'center' as const,
  };

  const buttonTextStyles = {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold' as const,
  };

  return (
    <S.ScreenContainer>
      <S.ScreenTitle>기록</S.ScreenTitle>
      <S.ScreenTitle>{fakeChartData.date}</S.ScreenTitle>

      {/* 파이 차트 렌더링 */}
      <View style={{ marginVertical: 20 }}>
        <PieChart data={fakeChartData.data} />
      </View>

      <S.ScreenTitle>임시 상세 보기</S.ScreenTitle>
      <TouchableOpacity
        style={buttonStyles}
        onPress={handlePress}
        accessibilityRole="button"
        accessibilityLabel="상세 기록 보기"
      >
        <Text style={buttonTextStyles}>
          상세 기록 보기
        </Text>
      </TouchableOpacity>
    </S.ScreenContainer>
  );
}