import { router } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, Pressable, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

export const options = { headerShown: false };

// 한국 시간대(KST) 기준 오늘 날짜 가져오기
function getKSTToday(): Date {
  const now = new Date();
  const kstDate = new Date(now.getTime() + (9 * 60 * 60 * 1000));
  return kstDate;
}

function formatKSTDate(date: Date): string {
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();
  
  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
  const weekday = weekdays[date.getUTCDay()];
  
  return `${year}년 ${month}월 ${day}일 ${weekday}요일`;
}

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #F8F6E7;
`;

const Header = styled.View`
  padding: 20px;
  border-bottom-width: 1px;
  border-bottom-color: #D3D2CE;
`;

const DateText = styled.Text`
  font-size: 18px;
  color: #333;
  font-family: 'Pretendard';
  font-weight: 500;
  text-align: center;
`;

const ContentContainer = styled.View`
  flex: 1;
  padding: 20px;
`;

const TitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom-width: 1px;
  border-bottom-color: #D3D2CE;
`;

const TitleLabel = styled.Text`
  font-size: 16px;
  color: #333;
  font-family: 'Pretendard';
  font-weight: 500;
  margin-right: 10px;
`;

const TitleInput = styled(TextInput)`
  flex: 1;
  font-size: 16px;
  color: #333;
  font-family: 'Pretendard';
  padding: 0;
`;

const ContentArea = styled(Pressable)`
  flex: 1;
  min-height: 300px;
`;

const ContentInput = styled(TextInput)`
  flex: 1;
  font-size: 16px;
  color: #333;
  font-family: 'Pretendard';
  text-align-vertical: top;
  line-height: 24px;
`;

const ButtonContainer = styled.View`
  padding: 20px;
  border-top-width: 1px;
  border-top-color: #D3D2CE;
`;

const SubmitButton = styled(Pressable)<{ disabled: boolean }>`
  background-color: ${props => props.disabled ? '#D3D2CE' : '#6B4E8C'};
  padding: 15px;
  border-radius: 8px;
  align-items: center;
`;

const SubmitButtonText = styled.Text<{ disabled: boolean }>`
  color: ${props => props.disabled ? '#999' : '#FFFFFF'};
  font-size: 16px;
  font-family: 'Pretendard';
  font-weight: 600;
`;

const BackButton = styled(Pressable)`
  background-color: transparent;
  padding: 15px;
  border-radius: 8px;
  align-items: center;
  margin-bottom: 10px;
  border-width: 1px;
  border-color: #D3D2CE;
`;

const BackButtonText = styled.Text`
  color: #666;
  font-size: 16px;
  font-family: 'Pretendard';
  font-weight: 500;
`;

export default function DiaryWriteScreen() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const contentInputRef = useRef<TextInput>(null);
  const today = getKSTToday();
  const formattedDate = formatKSTDate(today);

  const handleSubmit = async () => {
    if (!title.trim()) {
      Alert.alert('알림', '제목을 입력해주세요.');
      return;
    }
    
    if (!content.trim()) {
      Alert.alert('알림', '내용을 입력해주세요.');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // TODO: API 호출로 일기 저장
      console.log('일기 저장:', { title: title.trim(), content: content.trim() });
      
      Alert.alert('완료', '일기가 저장되었습니다.', [
        {
          text: '확인',
          onPress: () => router.back(),
        },
      ]);
    } catch (error) {
      console.error('일기 저장 오류:', error);
      Alert.alert('오류', '일기 저장에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const canSubmit = title.trim().length > 0 && content.trim().length > 0 && !isSubmitting;

  return (
    <Container>
      <Header>
        <DateText>{formattedDate}</DateText>
      </Header>
      
      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          <ContentContainer>
            <TitleContainer>
              <TitleLabel>제목:</TitleLabel>
              <TitleInput
                value={title}
                onChangeText={setTitle}
                placeholder="제목을 입력하세요"
                placeholderTextColor="#999"
                maxLength={100}
                returnKeyType="next"
                onSubmitEditing={() => contentInputRef.current?.focus()}
              />
            </TitleContainer>
            
            <ContentArea onPress={() => {
              contentInputRef.current?.focus();
            }}>
              <ContentInput
                ref={contentInputRef}
                value={content}
                onChangeText={setContent}
                placeholder="오늘 하루 어땠나요? 자유롭게 써보세요."
                placeholderTextColor="#999"
                multiline
                scrollEnabled={false}
                textAlignVertical="top"
              />
            </ContentArea>
          </ContentContainer>
        </ScrollView>
        
        <ButtonContainer>
          <BackButton onPress={() => router.back()}>
            <BackButtonText>취소</BackButtonText>
          </BackButton>
          
          <SubmitButton 
            onPress={handleSubmit} 
            disabled={!canSubmit}
          >
            <SubmitButtonText disabled={!canSubmit}>
              {isSubmitting ? '저장 중...' : '완료'}
            </SubmitButtonText>
          </SubmitButton>
        </ButtonContainer>
      </KeyboardAvoidingView>
    </Container>
  );
}
