import { useRouter } from 'expo-router';
import { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import ProgressBar from '@/components/ProgressBar';
import BackButton from '@/components/BackButton';
import CharacterSelection from '@/components/CharacterSelection';
import { useUser } from '@/app/context/UserContext';
import { Colors } from '@/constants/Colors';

const TOTAL_STEPS = 1; // 성격만 변경하므로 1단계

export default function PersonalitySelectionScreen() {
  const router = useRouter();
  const { userPersonality1, setUserPersonality1, userPersonality2, setUserPersonality2 } = useUser();
  const [step, setStep] = useState(1);
  const [personality1, setPersonality1State] = useState<'활발' | '소심' | null>(userPersonality1);
  const [personality2, setPersonality2State] = useState<'감성적' | '이성적' | null>(userPersonality2);

  const handleSave = () => {
    setUserPersonality1(personality1);
    setUserPersonality2(personality2);
    router.back(); // 이전 화면으로 돌아가기
  };

  return (
    <View style={styles.container}>
      <ProgressBar currentStep={step} totalSteps={TOTAL_STEPS} />
      <View style={styles.header}>
        <BackButton />
        <ThemedText style={styles.title}>성격 변경</ThemedText>
        <View style={{ width: 24 }} />{/* Placeholder for alignment */}
      </View>

      {step === 1 && (
        <View style={styles.stepContent}>
          <ThemedText style={styles.stepTitle}>성격</ThemedText>
          <ThemedText style={styles.stepSubtitle}>너의 성격을 알려줘</ThemedText>
          <ThemedText style={styles.label}>너는 어느 쪽에 가까워?</ThemedText>
          <View style={styles.characterSelectionContainer}>
            <CharacterSelection
              onPress={() => setPersonality1State('활발')}
              isSelected={personality1 === '활발'}
              image={require('@/assets/images/emotion_active.png')}
            />
            <CharacterSelection
              onPress={() => setPersonality1State('소심')}
              isSelected={personality1 === '소심'}
              image={require('@/assets/images/emotion_intimidate.png')}
            />
          </View>
          <View style={{ height: 40 }} />
          <ThemedText style={styles.label}>너는 어느 쪽에 가까워?</ThemedText>
          <View style={styles.characterSelectionContainer}>
            <CharacterSelection
              onPress={() => setPersonality2State('감성적')}
              isSelected={personality2 === '감성적'}
              image={require('@/assets/images/ideology_emotional.png')}
            />
            <CharacterSelection
              onPress={() => setPersonality2State('이성적')}
              isSelected={personality2 === '이성적'}
              image={require('@/assets/images/ideology_reasoning.png')}
            />
          </View>
        </View>
      )}

      <TouchableOpacity style={styles.nextButton} onPress={handleSave}>
        <ThemedText style={styles.nextButtonText}>저장하기</ThemedText>
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
  stepTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.white,
    marginBottom: 10,
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
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginTop: 50,
  },
});
