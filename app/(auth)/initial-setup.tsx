import { useRouter } from 'expo-router';
import { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import ProgressBar from '@/components/ProgressBar';
import BackButton from '@/components/BackButton';
import CharacterSelection from '@/components/CharacterSelection';
import { useAuth } from '@/app/context/AuthContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Themes } from '@/constants/Themes';

const TOTAL_STEPS = 4;

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
    } else {
      signIn();
      router.replace('/(tabs)/');
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      router.back(); // 1단계일 경우 회원가입 화면으로 돌아감
    }
  };

  return (
    <View style={styles.container}>
      <ProgressBar currentStep={step} totalSteps={TOTAL_STEPS} />
      <View style={styles.header}>
        <BackButton onPress={handleBack} />{/* onPress prop 추가 */}
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
            placeholderTextColor={Themes.lightGray}
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
              label="활발"
              onPress={() => setPersonality1('활발')}
              isSelected={personality1 === '활발'}
            />
            <CharacterSelection
              label="소심"
              onPress={() => setPersonality1('소심')}
              isSelected={personality1 === '소심'}
            />
          </View>
        </View>
      )}

      {step === 3 && (
        <View style={styles.stepContent}>
          <Text style={styles.stepTitle}>성격</Text>
          <Text style={styles.stepSubtitle}>너의 성격을 알려줘</Text>
          <Text style={styles.label}>너는 어느 쪽에 가까워?</Text>
          <View style={styles.characterSelectionContainer}>
            <CharacterSelection
              label="감성적"
              onPress={() => setPersonality2('감성적')}
              isSelected={personality2 === '감성적'}
            />
            <CharacterSelection
              label="이성적"
              onPress={() => setPersonality2('이성적')}
              isSelected={personality2 === '이성적'}
            />
          </View>
        </View>
      )}

      {step === 4 && (
        <View style={styles.stepContent}>
          <Text style={styles.stepTitle}>너의 감정을 가지고</Text>
          <Text style={styles.stepSubtitle}>모리가 어떤 모습으로 성장할까</Text>
          <Text style={styles.label}>감정 일기 시작해보자</Text>
          <MaterialCommunityIcons name="star-circle" size={150} color={Themes.white} style={styles.characterPlaceholder} />
        </View>
      )}

      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>{step === TOTAL_STEPS ? 'Finish' : 'Next'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Themes.primaryBackground,
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
    color: Themes.white,
  },
  stepContent: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  stepTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Themes.white,
    marginBottom: 10,
  },
  stepSubtitle: {
    fontSize: 18,
    color: Themes.white,
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    color: Themes.white,
    marginBottom: 10,
  },
  input: {
    height: 50,
    width: '100%',
    backgroundColor: Themes.white,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    color: Themes.black,
  },
  characterSelectionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    width: '100%',
  },
  nextButton: {
    backgroundColor: Themes.secondaryBackground,
    width: '100%',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 30,
  },
  nextButtonText: {
    color: Themes.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  characterPlaceholder: {
    marginTop: 50,
  },
});
