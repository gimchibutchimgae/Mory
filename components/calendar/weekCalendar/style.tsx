import { LinearGradient } from 'expo-linear-gradient';
import styled from 'styled-components/native';

// 메인 컨테이너
export const WeekCalendarContainer = styled.View`
  background-color: #14213d;
  padding-horizontal: 20px;
  padding-vertical: 20px;
  position: relative;
  max-width: 503px;
`;

// 헤더 컨테이너
export const HeaderContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
  position: relative;
`;

// 년월 텍스트
export const YearMonthText = styled.Text`
  color: #fff;
  font-size: 24px;
  text-align: center;
  font-family: 'Pretendard';
`;

// 캘린더 아이콘 버튼
export const CalendarIconButton = styled.TouchableOpacity`
  position: absolute;
  right: 20px;
  top: 0px;
`;

// 주간 캘린더 컨테이너
export const WeekContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding-horizontal: 5px;
`;

// 각 날짜 컨테이너
export const DayContainer = styled.View`
  align-items: center;
  margin-horizontal: 9px;
  padding-horizontal: 3px;
  position: relative;
`;

// SVG 컨테이너
export const SvgContainer = styled.View<{ top: number; left: number; zIndex: number }>`
  position: absolute;
  top: ${props => props.top}px;
  left: ${props => props.left}px;
  z-index: ${props => props.zIndex};
`;

// 파란색 배경 컨테이너
export const BlueBgContainer = styled.View<{ 
  isToday: boolean;
  borderWidth?: number;
  borderColor?: string;
  backgroundColor?: string;
  shadowColor?: string;
  shadowOffsetX?: number;
  shadowOffsetY?: number;
  shadowOpacity?: number;
  shadowRadius?: number;
  elevation?: number;
}>`
  align-items: center;
  border-radius: 25px;
  position: relative;
  z-index: 2;
  ${props => props.isToday && `
    border-width: ${props.borderWidth || 3}px;
    border-color: ${props.borderColor || '#1D6AA1'};
    background-color: ${props.backgroundColor || '#1D6AA1'};
    shadow-color: ${props.shadowColor || '#1D6AA1'};
    shadow-offset: ${props.shadowOffsetX || 0}px ${props.shadowOffsetY || 0}px;
    shadow-opacity: ${props.shadowOpacity || 0.3};
    shadow-radius: ${props.shadowRadius || 8}px;
    elevation: ${props.elevation || 8};
  `}
`;

// 요일 텍스트
export const WeekdayText = styled.Text<{ color: string }>`
  color: ${props => props.color};
  font-size: 16px;
  font-family: 'Pretendard';
  line-height: 40px;
  font-weight: 500;
`;

// 날짜 원형 컨테이너
export const DateCircleContainer = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-bottom: 2px;
`;

// 그라데이션 배경
export const GradientBackground = styled(LinearGradient)`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
`;

// 날짜 텍스트
export const DateText = styled.Text<{ color: string }>`
  color: ${props => props.color};
  font-size: 20px;
  font-weight: 500;
  font-family: 'Pretendard';
`;