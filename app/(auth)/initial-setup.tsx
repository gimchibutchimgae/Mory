import { useRouter } from 'expo-router';
import { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import ProgressBar from '@/components/ProgressBar';
import BackButton from '@/components/BackButton';
import CharacterSelection from '@/components/CharacterSelection';
import { useAuth } from '@/app/context/AuthContext';
import { Colors } from '@/constants/Colors';

const TOTAL_STEPS = 3;

export default function InitialSetupScreen() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [personality1, setPersonality1] = useState<'활발' | '소심' | null>(null);
  const [personality2, setPersonality2] = useState<'감성적' | '이성적' | null>(null);

  const handleNext = () => {
    if (step < TOTAL_STEPS) {
      setStep(step + 1);
    }
    else {
      signIn();
      router.replace('/(tabs)/');
    }
  };

  return (
    <View style={styles.container}>
      <ProgressBar currentStep={step} totalSteps={TOTAL_STEPS} />
      <View style={styles.header}>
        <BackButton />
        <Text style={styles.title}>Initial Setup</Text>
        <View style={{ width: 24 }} />{/* Placeholder for alignment */}
      </View>

      {step === 1 && (
        <View style={styles.stepContent}>
          <Text style={styles.stepTitle}>이름</Text>
          <Text style={styles.stepSubtitle}>내가 부를 너의 이름을 알려줘</Text>
          <Text style={styles.label}>나의 이름은</Text>
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
          <Text style={styles.stepTitle}>성격</Text>
          <Text style={styles.stepSubtitle}>너의 성격을 알려줘</Text>
          <Text style={styles.label}>너는 어느 쪽에 가까워?</Text>
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
          <Text style={styles.label}>너는 어느 쪽에 가까워?</Text>
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
          <Text style={[styles.finalText, styles.alignLeft]}>너의 감정을 가지고</Text>
          <Text style={[styles.finalText, styles.alignRight]}>모리가 어떤 모습으로 성장할까</Text>
          <Text style={[styles.finalText, styles.alignLeft]}>감정 일기 시작해보자</Text>
          <Image source={require('@/assets/images/mory_initial.png')} style={styles.characterPlaceholder} />
        </View>
      )}

      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>{step === TOTAL_STEPS ? '시작하기' : '다음으로'}</Text>
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