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
  margin: 44px 20px 0;
  border-top-width: 1px;
  border-top-color: #D3D2CE;
  border-bottom-width: 1px;
  border-bottom-color: #D3D2CE;
  position: relative;
`;

// 취소 아이콘 버튼
export const CancelIconButton = styled(Pressable)`
  position: absolute;
  top: 6px;
  right: 20px;
  width: 32px;
  height: 32px;
  align-items: center;
  justify-content: center;
  z-index: 10;
`;

// 취소 아이콘 이미지
export const CancelIcon = styled.Image`
  width: 40px;
  height: 40px;
`;

// 날짜 텍스트
export const DateText = styled.Text`
  font-size: 24px;
  color: #717171;
  font-family: 'Pretendard';
  font-weight: 700;
  text-align: start;
  line-height: 48px;
`;

// 콘텐츠 컨테이너
export const ContentContainer = styled.View`
  flex: 1;
  padding: 0 10px;
  margin: 0 10px;
`;

// 제목 컨테이너
export const TitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: #D3D2CE;
`;

// 제목 라벨
export const TitleLabel = styled.Text`
  font-size: 24px;
  color: #717171;
  font-family: 'Pretendard';
  font-weight: 700;
  margin-right: 10px;
  line-height: 48px;
`;

// 제목 입력 필드
export const TitleInput = styled(TextInput)`
  flex: 1;
  font-size: 20px;
  color: #000000;
  font-family: 'Pretendard';
  padding: 0;
  outline-width: 0;
  border-width: 0;
`;

// 내용 입력 영역
export const ContentArea = styled(Pressable)`
  flex: 1;
  min-height: 400px;
  position: relative;
  margin-top: 44px;
  border-top-width: 1px;
  border-top-color: #D3D2CE;
`;

// 노트 라인 컨테이너
export const NoteLinesContainer = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
`;

// 개별 노트 라인
export const NoteLine = styled.View`
  height: 44px;
  border-bottom-width: 1px;
  border-bottom-color: #E5E5E5;
`;

// 내용 입력 필드
export const ContentInput = styled(TextInput)`
  flex: 1;
  font-size: 20px;
  color: #000000;
  font-family: 'Pretendard';
  text-align-vertical: top;
  line-height: 44px;
  padding: 0;
  margin: 0;
  z-index: 2;
  position: relative;
  min-height: 400px;
  outline-width: 0;
  border-width: 0;
`;

// 버튼 컨테이너
export const ButtonContainer = styled.View`
  padding: 20px;
`;

// 제출 버튼
export const SubmitButton = styled(Pressable)<{ disabled: boolean }>`
  flex-direction: row;
  justify-content: center;
  background-color: ${props => props.disabled ? 'none' : '#002851'};
  width: 153px;
  padding: 20px;
  border-radius: 50px;
  align-items: center;
  align-self: flex-end;
`;

// 제출 버튼 텍스트
export const SubmitButtonText = styled.Text<{ disabled: boolean }>`
  color: ${props => props.disabled ? '#ffffff00' : '#FFFFFF'};
  font-size: 24px;
  font-family: 'Pretendard';
  font-weight: 500;
  line-height: 30px;
`;

export const SubmitButtonIcon = styled.Image<{ disabled: boolean }>`
  tint-color: ${props => props.disabled ? '#ffffff00' : '#FFFFFF'};
  width: 33px;
  height: 28px;
  margin-left: 15px;
`;