import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: row;
  background-color: #00274e;
  height: 60px;
  align-items: center;
  justify-content: space-around;
`;

export const TabButton = styled.TouchableOpacity<{ focused: boolean }>`
  align-items: center;
  flex: 1;
`;

export const Label = styled.Text<{ focused: boolean }>`
  color: ${({ focused }) => (focused ? '#fff' : '#FFFFFF66')};
  font-size: 12px;
  margin-top: 4px;
`;