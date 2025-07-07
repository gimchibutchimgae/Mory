import styled from 'styled-components/native';

export const TabBarContainer = styled.View`
  flex-direction: row;
  background-color: #fff;
  border-top-width: 1px;
  border-top-color: #eee;
  height: 60px;
`;

export const TabBarButton = styled.TouchableOpacity<{ focused: boolean }>`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${({ focused }) => (focused ? '#f0f0f0' : '#fff')};
`;