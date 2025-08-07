import { Pressable, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

// 메인 컨테이너
export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #F8F6E7;
`;

// 헤더 영역
export const Header = styled.View`
  padding: 20px;
  border-bottom-width: 1px;
  border-bottom-color: #D3D2CE;
`;

// 날짜 텍스트
export const DateText = styled.Text`
  font-size: 18px;
  color: #333;
  font-family: 'Pretendard';
  font-weight: 500;
  text-align: center;
`;

// 콘텐츠 컨테이너
export const ContentContainer = styled.View`
  flex: 1;
  padding: 20px;
`;

// 제목 컨테이너
export const TitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom-width: 1px;
  border-bottom-color: #D3D2CE;
`;

// 제목 라벨
export const TitleLabel = styled.Text`
  font-size: 16px;
  color: #333;
  font-family: 'Pretendard';
  font-weight: 500;
  margin-right: 10px;
`;

// 제목 입력 필드
export const TitleInput = styled(TextInput)`
  flex: 1;
  font-size: 16px;
  color: #333;
  font-family: 'Pretendard';
  padding: 0;
`;

// 내용 입력 영역
export const ContentArea = styled(Pressable)`
  flex: 1;
  min-height: 300px;
`;

// 내용 입력 필드
export const ContentInput = styled(TextInput)`
  flex: 1;
  font-size: 16px;
  color: #333;
  font-family: 'Pretendard';
  text-align-vertical: top;
  line-height: 24px;
`;

// 버튼 컨테이너
export const ButtonContainer = styled.View`
  padding: 20px;
  border-top-width: 1px;
  border-top-color: #D3D2CE;
`;

// 제출 버튼
export const SubmitButton = styled(Pressable)<{ disabled: boolean }>`
  background-color: ${props => props.disabled ? '#D3D2CE' : '#6B4E8C'};
  padding: 15px;
  border-radius: 8px;
  align-items: center;
`;

// 제출 버튼 텍스트
export const SubmitButtonText = styled.Text<{ disabled: boolean }>`
  color: ${props => props.disabled ? '#999' : '#FFFFFF'};
  font-size: 16px;
  font-family: 'Pretendard';
  font-weight: 600;
`;

// 취소 버튼
export const BackButton = styled(Pressable)`
  background-color: transparent;
  padding: 15px;
  border-radius: 8px;
  align-items: center;
  margin-bottom: 10px;
  border-width: 1px;
  border-color: #D3D2CE;
`;

// 취소 버튼 텍스트
export const BackButtonText = styled.Text`
  color: #666;
  font-size: 16px;
  font-family: 'Pretendard';
  font-weight: 500;
`;