import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

// 메인 컨테이너
export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #14213D;
`;

// 콘텐츠 컨테이너
export const ContentContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 40px;
`;

// 결과 텍스트
export const ResultText = styled.Text`
  font-size: 24px;
  color: #FFFFFF;
  font-family: 'Pretendard';
  font-weight: 500;
  text-align: center;
`;
