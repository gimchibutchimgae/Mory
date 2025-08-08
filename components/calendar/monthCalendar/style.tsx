import { LinearGradient } from 'expo-linear-gradient';
import styled from 'styled-components/native';

// 그라데이션 색상 정의
export const gradientColors: Record<
  'red' | 'yellow' | 'green' | 'blue' | 'gray',
  string[]
> = {
  red: ['#FF7342', '#FE2C4D'],
  yellow: ['#FCDD63', '#FEB821'],
  green: ['#7AE9A0', '#4ED491'],
  blue: ['#85B7FC', '#748CFE'],
  gray: ['#374553', '#374553'],
};

// 메인 컨테이너
export const Container = styled.View`
  font-family: 'Pretendard';
  background-color: #14213d;
  flex: 1;
  width: 100%;
  padding: 0;
  border-radius: 0;
  align-items: center;
`;

// 캘린더 래퍼
export const CalendarWrapper = styled.View`
  max-width: 400px;
  width: 100%;
`;

// 헤더 텍스트
export const HeaderText = styled.Text`
  color: #fff;
  font-size: 24px;
  text-align: center;
  margin-top: 40px;
  margin-bottom: 40px;
  font-family: 'Pretendard';
`;

// 날짜 컨테이너
export const DayContainer = styled.View`
  width: 40px;
  height: 70px;
  align-items: center;
  justify-content: center;
  margin-left: 7px;
  margin-right: 7px;
  margin-top: 0;
  margin-bottom: 0;
`;

// 그라데이션 배경
export const GradientBackground = styled(LinearGradient)`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
`;

// 날짜 텍스트
export const DayText = styled.Text<{ 
  isToday?: boolean; 
  textColor?: string;
}>`
  font-family: 'Pretendard';
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 48px;
  text-align: center;
  color: ${props => props.textColor || '#000000'};
`;

// 오늘 SVG 컨테이너
export const TodaySvgContainer = styled.View`
  position: absolute;
  top: 2px;
  left: -7px;
  z-index: -1;
`;

// Write 버튼
export const WriteButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 30px;
  right: 30px;
  background-color: rgba(255, 255, 255, 0.85);
  width: 63px;
  height: 63px;
  border-radius: 30px;
  align-items: center;
  justify-content: center;
  shadow-color: #000;
  shadow-offset: 4px 4px;
  shadow-opacity: 0.25;
  shadow-radius: 2px;
  elevation: 5;
`;
