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

// 애플워치 스타일 감정 아이템 (육각형 배치 지원)
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
  
  z-index: ${props => props.isSelected ? 100 : props.size > 140 ? 50 : 1};
`;

// 애플워치 스타일 원형 감정 (더 입체적인 효과)
export const EmotionCircle = styled.View<{
  backgroundColor: string; 
  size: number;
  isSelected?: boolean;
}>`
  width: 100%;
  height: 100%;
  border-radius: ${props => props.size / 2}px;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.backgroundColor};
  
  /* 애플워치 스타일 입체 효과 */
  border-width: ${props => props.isSelected ? 3 : props.size > 140 ? 2 : 1}px;
  border-color: rgba(255, 255, 255, ${props => props.isSelected ? 0.6 : props.size > 140 ? 0.3 : 0.15});
  
  /* 그라디언트 같은 효과 */
  overflow: hidden;
  
  /* 애플워치 스타일 그림자 */
  elevation: ${props => props.isSelected ? 12 : props.size > 140 ? 8 : 4};
  shadow-color: ${props => props.isSelected ? '#FFFFFF' : props.backgroundColor};
  shadow-offset: 0px ${props => props.isSelected ? 6 : props.size > 140 ? 4 : 2}px;
  shadow-opacity: ${props => props.isSelected ? 0.6 : props.size > 140 ? 0.4 : 0.2};
  shadow-radius: ${props => props.isSelected ? 12 : props.size > 140 ? 8 : 4}px;
`;

// 애플워치 스타일 글래시 하이라이트
export const AppleGloss = styled.View<{ size: number; isSelected?: boolean }>`
  position: absolute;
  top: ${props => props.size * 0.1}px;
  left: ${props => props.size * 0.2}px;
  width: ${props => props.size * 0.3}px;
  height: ${props => props.size * 0.3}px;
  border-radius: ${props => props.size * 0.15}px;
  background-color: rgba(255, 255, 255, ${props => props.isSelected ? 0.5 : 0.3});
  opacity: ${props => props.isSelected ? 1 : 0.7};
`;

// 하단 선택된 감정 정보 - UX 개선
export const BottomSheet = styled.View<{ isVisible: boolean }>`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 220px;
  background-color: rgba(0, 0, 0, 0.95);
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  padding: 24px 20px;
  opacity: ${props => props.isVisible ? 1 : 0};
  pointer-events: ${props => props.isVisible ? 'auto' : 'none'};
  
  /* 고급 그림자 효과 */
  elevation: 12;
  shadow-color: #000000;
  shadow-offset: 0px -6px;
  shadow-opacity: 0.4;
  shadow-radius: 12px;
`;

export const SelectedEmotionTitle = styled.Text`
  font-size: 26px;
  font-weight: 700;
  color: #FFFFFF;
  font-family: Pretendard;
  text-align: center;
  margin-bottom: 12px;
  
  /* 제목 강조 효과 */
  letter-spacing: 1px;
  text-shadow-color: rgba(255, 255, 255, 0.3);
  text-shadow-offset: 0px 1px;
  text-shadow-radius: 2px;
`;

export const SelectedEmotionDescription = styled.Text`
  font-size: 16px;
  color: #CCCCCC;
  font-family: Pretendard;
  text-align: center;
  line-height: 24px;
`;

export const SelectButton = styled.TouchableOpacity`
  background-color: #FFFFFF;
  border-radius: 25px;
  padding: 15px 30px;
  margin-top: 20px;
  align-self: center;
  
  /* 버튼 개선 - 더 나은 시각적 피드백 */
  elevation: 6;
  shadow-color: #FFFFFF;
  shadow-offset: 0px 3px;
  shadow-opacity: 0.25;
  shadow-radius: 6px;
  
  /* 터치 영역 확대 */
  min-height: 50px;
  padding-horizontal: 40px;
`;

export const SelectButtonText = styled.Text`
  color: #000000;
  font-size: 16px;
  font-weight: 600;
  font-family: Pretendard;
  letter-spacing: 0.5px;
`;
