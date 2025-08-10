import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

// 메인 컨테이너
export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #000000;
`;

// 헤더
export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  padding-top: 10px;
`;

export const BackButton = styled.TouchableOpacity`
  width: 44px;
  height: 44px;
  align-items: center;
  justify-content: center;
`;

export const ButtonIcon = styled.Image`
  width: 24px;
  height: 24px;
`;

// 감정 그리드 컨테이너
export const EmotionGrid = styled.TouchableOpacity`
  flex: 1;
  padding: 20px;
  align-items: center;
  justify-content: center;
`;

// 스크롤 가능한 그리드 컨테이너
export const GridContainer = styled.View`
  flex: 1;
  min-height: 2000px;
  width: 100%;
`;

// 감정 아이템 (픽셀 크기 기반)
export const EmotionItem = styled.TouchableOpacity<{
  size: number;
  positionX: number;
  positionY: number;
  isSelected?: boolean;
}>`
  position: absolute;
  align-items: center;
  justify-content: center;
  
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  
  left: ${props => props.positionX}px;
  top: ${props => props.positionY}px;
  
  z-index: ${props => props.isSelected ? 10 : 1};
`;

export const EmotionCircle = styled.View<{ 
  backgroundColor: string; 
  size: number;
}>`
  width: 100%;
  height: 100%;
  border-radius: ${props => props.size / 2}px;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.backgroundColor};
`;

export const EmotionText = styled.Text<{ size: number }>`
  color: #FFFFFF;
  font-family: 'Pretendard';
  font-weight: 600;
  text-align: center;
  font-size: ${props => props.size >= 200 ? 18 : props.size >= 140 ? 14 : 10}px;
`;

// 하단 선택된 감정 정보
export const BottomSheet = styled.View<{ isVisible: boolean }>`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 200px;
  background-color: rgba(0, 0, 0, 0.9);
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 20px;
  opacity: ${props => props.isVisible ? 1 : 0};
  pointer-events: ${props => props.isVisible ? 'auto' : 'none'};
`;

export const SelectedEmotionTitle = styled.Text`
  font-size: 24px;
  font-weight: 700;
  color: #FFFFFF;
  font-family: 'Pretendard';
  text-align: center;
  margin-bottom: 10px;
`;

export const SelectedEmotionDescription = styled.Text`
  font-size: 16px;
  color: #CCCCCC;
  font-family: 'Pretendard';
  text-align: center;
  line-height: 24px;
`;

export const SelectButton = styled.TouchableOpacity`
  background-color: #FFFFFF;
  border-radius: 25px;
  padding: 15px 30px;
  margin-top: 20px;
  align-self: center;
`;

export const SelectButtonText = styled.Text`
  color: #000000;
  font-size: 16px;
  font-weight: 600;
  font-family: 'Pretendard';
`;
