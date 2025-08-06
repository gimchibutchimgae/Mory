import { useRouter, useLocalSearchParams } from 'expo-router';
import { useState, useEffect } from 'react';
import { View, Button, StyleSheet, TextInput, TouchableOpacity, Image, Animated, Alert } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import ProgressBar from '@/components/ProgressBar';
import BackButton from '@/components/BackButton';
import CharacterSelection from '@/components/CharacterSelection';
import { useAuth } from '@/app/context/AuthContext';
import { Colors } from '@/constants/Colors';
import { registerApi, loginApi } from '@/api/auth';

const TOTAL_STEPS = 3;

export default function InitialSetupScreen() {
  const router = useRouter();
  const { signIn } = useAuth();
  const params = useLocalSearchParams();
  const { email: paramEmail, name: paramName, provider: paramProvider } = params;

  const [step, setStep] = useState(1);
  const [name, setName] = useState(paramName ? String(paramName) : '');
  const [personality1, setPersonality1] = useState<'활발' | '소심' | null>(null);
  const [personality2, setPersonality2] = useState<'감성적' | '이성적' | null>(null);

  const opacity1 = new Animated.Value(0);
  const opacity2 = new Animated.Value(0);
  const opacity3 = new Animated.Value(0);

  useEffect(() => {
    if (step === TOTAL_STEPS) {
      Animated.sequence([
        Animated.timing(opacity1, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(opacity2, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(opacity3, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [step]);

  const handleNext = async () => {
    if (step < TOTAL_STEPS) {
      setStep(step + 1);
    } else {
      // 마지막 단계에서 회원가입 처리
      if (!paramEmail || !name || !personality1 || !personality2 || !paramProvider) {
        Alert.alert('오류', '모든 정보를 입력해주세요.');
        return;
      }

      const mbti = `${personality1 === '활발' ? 'E' : 'I'}${personality2 === '감성적' ? 'F' : 'T'}`;
      const tempPassword = Math.random().toString(36).substring(2, 15); // 임시 비밀번호 생성

      try {
        const response = await registerApi(String(paramEmail), name, tempPassword, mbti, String(paramProvider));
        if (response) {
          // 회원가입 성공 후 로그인 처리 (백엔드에서 토큰을 바로 주지 않으므로, 로그인 API를 호출해야 함)
          // 현재는 Google 로그인 후 바로 토큰을 받는 시나리오이므로, 이 부분은 추후 백엔드 응답에 따라 수정 필요
          // 여기서는 일단 signIn()을 호출하여 AuthContext에 로그인 상태를 설정하고 메인으로 이동
          const loginResponse = await loginApi(String(paramEmail), tempPassword);
          if (loginResponse && loginResponse.accessToken) {
            signIn(loginResponse.accessToken);
            router.replace('/(tabs)/');
          } else {
            Alert.alert('로그인 실패', '토큰을 받아오지 못했습니다.');
          }
        }
      } catch (error: any) {
        Alert.alert('회원가입 실패', error.message || '알 수 없는 오류가 발생했습니다.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <ProgressBar currentStep={step} totalSteps={TOTAL_STEPS} />
      <View style={styles.header}>
        <BackButton />
        <ThemedText style={styles.title}>Initial Setup</ThemedText>
        <View style={{ width: 24 }} />{/* Placeholder for alignment */}
      </View>

      {step === 1 && (
        <View style={styles.stepContent}>
          <ThemedText style={styles.stepTitle}>이름</ThemedText>
          <ThemedText style={styles.stepSubtitle}>내가 부를 너의 이름을 알려줘</ThemedText>
          <ThemedText style={styles.label}>나의 이름은</ThemedText>
          <TextInput
            style={styles.input}
            placeholder="이름을 입력하세요"
            placeholderTextColor={Colors.lightGray}
            value={name}
            onChangeText={setName}
          />
        </View>
      )}

      {step === 2 && (
        <View style={styles.stepContent}>
          <ThemedText style={styles.stepTitle}>성격</ThemedText>
          <ThemedText style={styles.stepSubtitle}>너의 성격을 알려줘</ThemedText>
          <ThemedText style={styles.label}>너는 어느 쪽에 가까워?</ThemedText>
          <View style={styles.characterSelectionContainer}>
            <CharacterSelection
              onPress={() => setPersonality1('활발')}
              isSelected={personality1 === '활발'}
              image={require('@/assets/images/emotion_active.png')}
            />
            <CharacterSelection
              onPress={() => setPersonality1('소심')}
              isSelected={personality1 === '소심'}
              image={require('@/assets/images/emotion_intimidate.png')}
            />
          </View>
          <View style={{ height: 40 }} />
          <ThemedText style={styles.label}>너는 어느 쪽에 가까워?</ThemedText>
          <View style={styles.characterSelectionContainer}>
            <CharacterSelection
              onPress={() => setPersonality2('감성적')}
              isSelected={personality2 === '감성적'}
              image={require('@/assets/images/ideology_emotional.png')}
            />
            <CharacterSelection
              onPress={() => setPersonality2('이성적')}
              isSelected={personality2 === '이성적'}
              image={require('@/assets/images/ideology_reasoning.png')}
            />
          </View>
        </View>
      )}

      {step === 3 && (
        <View style={styles.stepContentFinal}>
          <Animated.Text style={[styles.finalText, styles.alignLeft, { opacity: opacity1 }]}>너의 감정을 가지고</Animated.Text>
          <Animated.Text style={[styles.finalText, styles.alignRight, { opacity: opacity2 }]}>모리가 어떤 모습으로 성장할까</Animated.Text>
          <Animated.Text style={[styles.finalText, styles.alignLeft, { opacity: opacity3 }]}>감정 일기 시작해보자</Animated.Text>
          <Image source={require('@/assets/images/mory_initial.png')} style={styles.characterPlaceholder} />
        </View>
      )}

      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <ThemedText style={styles.nextButtonText}>{step === TOTAL_STEPS ? '시작하기' : '다음으로'}</ThemedText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.primaryBackground,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.white,
  },
  stepContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  stepContentFinal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 60, // 상단 여백 추가
  },
  stepTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.white,
    marginBottom: 10,
  },
  finalText: {
    fontSize: 20,
    color: Colors.white,
    fontWeight: '500',
    textAlign: 'center',
    alignSelf: 'center',
    marginBottom: 18, // 줄 간격 조정
  },
  alignLeft: {
    alignSelf: 'flex-start',
    textAlign: 'left',
    width: '100%',
  },
  alignCenter: {
    alignSelf: 'center',
    textAlign: 'center',
    width: '100%',
  },
  alignRight: {
    alignSelf: 'flex-end',
    textAlign: 'right',
    width: '100%',
  },
  stepSubtitle: {
    fontSize: 18,
    color: Colors.white,
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    color: Colors.white,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  input: {
    height: 50,
    width: '100%',
    backgroundColor: Colors.white,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    color: Colors.black,
  },
  characterSelectionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    width: '100%',
  },
  nextButton: {
    backgroundColor: Colors.secondaryBackground,
    width: '100%',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 30,
  },
  nextButtonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  characterPlaceholder: {
    width: 400,
    height: 400,
    resizeMode: 'contain',
    marginTop: 50,
  },
});