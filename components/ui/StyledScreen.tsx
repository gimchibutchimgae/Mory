import styled from 'styled-components/native';

export const ScreenContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-start;
  background-color: #003B68;
`;

export const ScreenTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #ffffff;
`;

export const WeekCalendarContainer = styled.View`
  width: 100%;
  display: flex;
  align-items: center;
  background-color: #14213d;
`;

export const EmotionButton = styled.TouchableOpacity`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  justify-content: center;
  align-items: center;
`;

export const EmotionButtonIcon = styled.Image`
  width: 35px;
  height: 35px;
  margin-left: 8px;
`;

export const EmotionButtonText = styled.Text`
  font-family: 'Pretendard';
  font-size: 13px;
  color: #ffffff;
  text-align: center;
`;

export const MainMoryContainer = styled.View`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 336px;
  height: 336px;
  margin-top: 40px;
`;

export const MainMoryBlurBackground = styled.View<{ backgroundColor?: string }>`
  position: absolute;
  width: 336px;
  height: 336px;
  border-radius: 336px;
  background: ${props => props.backgroundColor || 'transparent'};
  filter: blur(50px);
`;

export const MainMory = styled.Image`
  width: 200px;
  height: 200px;
  resize-mode: contain;
  z-index: 1;
  margin-bottom: 45px;
`;

export const MainMoryShadow = styled.Image`
  width: 140px;
  height: 20px;
  filter: blur(2px);
`;