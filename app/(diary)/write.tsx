import * as S from '@/components/ui/StyledDiary';
import { router } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, TextInput } from 'react-native';

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

export default function DiaryWriteScreen() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const contentInputRef = useRef<TextInput>(null);
  const today = getKSTToday();
  const formattedDate = formatKSTDate(today);

  // 노트 라인 개수 (화면에 보이는 줄 수)
  const numberOfLines = 15;

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
    <S.Container>
      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <S.CancelIconButton onPress={() => router.back()}>
          <S.CancelIcon source={require('@/assets/icons/cancel.svg')} />
        </S.CancelIconButton>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          <S.Header>
            <S.DateText>{formattedDate}</S.DateText>
          </S.Header>
          
          <S.ContentContainer>
            <S.TitleContainer>
              <S.TitleLabel>제목:</S.TitleLabel>
              <S.TitleInput
                value={title}
                onChangeText={setTitle}
                placeholder="제목을 입력하세요"
                placeholderTextColor="#717171"
                maxLength={100}
                returnKeyType="next"
                onSubmitEditing={() => contentInputRef.current?.focus()}
              />
            </S.TitleContainer>
            
            <S.ContentArea onPress={() => {
              contentInputRef.current?.focus();
            }}>
              <S.NoteLinesContainer>
                {Array.from({ length: numberOfLines }, (_, index) => (
                  <S.NoteLine key={index} />
                ))}
              </S.NoteLinesContainer>
              <S.ContentInput
                ref={contentInputRef}
                value={content}
                onChangeText={setContent}
                placeholder="오늘 하루 어땠나요? 자유롭게 써보세요."
                placeholderTextColor="#717171"
                multiline
                scrollEnabled={false}
                textAlignVertical="top"
              />
            </S.ContentArea>
          </S.ContentContainer>
        </ScrollView>
        
        <S.ButtonContainer>
          <S.SubmitButton 
            onPress={handleSubmit} 
            disabled={!canSubmit}
          >
            <S.SubmitButtonText disabled={!canSubmit}>
              {isSubmitting ? '저장 중...' : '완료'}
            </S.SubmitButtonText>
            <S.SubmitButtonIcon 
              source={require('@/assets/icons/next.svg')}
              disabled={!canSubmit} />
          </S.SubmitButton>
        </S.ButtonContainer>
      </KeyboardAvoidingView>
    </S.Container>
  );
}
