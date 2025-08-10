import styled from 'styled-components/native';

export interface EmotionType {
  id: number;
  name: string;
  color: string; // 단색 배경
  category: 'red' | 'yellow' | 'blue' | 'green';
}

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #000000;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-horizontal: 20px;
  padding-top: 10px;
  padding-bottom: 20px;
`;

export const CloseButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
`;

export const SearchButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
`;

export const ButtonIcon = styled.Image`
  width: 24px;
  height: 24px;
  resize-mode: contain;
`;

export const Content = styled.View`
  flex: 1;
  padding-horizontal: 40px;
  justify-content: center;
`;

export const Title = styled.Text`
  color: #ffffff;
  font-size: 24px;
  font-family: 'Pretendard';
  text-align: center;
  margin-bottom: 60px;
  line-height: 32px;
`;

export const EmotionGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  padding-horizontal: 20px;
`;

export const EmotionButton = styled.TouchableOpacity`
  width: 45%;
  margin-bottom: 30px;
  align-items: center;
`;

export const EmotionCircle = styled.View<{ backgroundColor: string }>`
  width: 120px;
  height: 120px;
  border-radius: 60px;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.backgroundColor};
`;

export const EmotionTitle = styled.Text`
  color: #ffffff;
  font-size: 16px;
  font-family: 'Pretendard';
  font-weight: 600;
  text-align: center;
`;

export const EmotionSubtitle = styled.Text`
  color: #ffffff;
  font-size: 14px;
  font-family: 'Pretendard';
  font-weight: 400;
  text-align: center;
  margin-top: 2px;
`;
