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

// 캐릭터 컨테이너
export const CharacterContainer = styled.View`
  align-items: center;
  margin-bottom: 60px;
`;

// 모리 캐릭터
export const MoryCharacter = styled.Image`
  width: 200px;
  height: 200px;
  resize-mode: contain;
`;

// 제목 텍스트
export const TitleText = styled.Text`
  font-size: 20px;
  color: #FFFFFF;
  font-family: 'Pretendard';
  font-weight: 500;
  text-align: center;
  margin-bottom: 40px;
`;

// 로딩 컨테이너
export const LoadingContainer = styled.View`
  width: 200px;
  height: 4px;
  background-color: #2A3B52;
  border-radius: 2px;
  overflow: hidden;
`;

// 로딩 바
export const LoadingBar = styled.View`
  width: 50%;
  height: 100%;
  background-color: #FFFFFF;
  border-radius: 2px;
`;
