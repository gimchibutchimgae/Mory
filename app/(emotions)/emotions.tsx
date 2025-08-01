import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export const options = { headerShown: false };

const emotions = [
  { id: 1, name: '활력 높음', color: ['#FF7342', '#FE2C4D'] as const, category: 'red' },
  { id: 2, name: '활력 높음', color: ['#FCDD63', '#FEB821'] as const, category: 'yellow' },
  { id: 3, name: '활력 낮음', color: ['#85B7FC', '#748CFE'] as const, category: 'blue' },
  { id: 4, name: '활력 낮음', color: ['#7AE9A0', '#4ED491'] as const, category: 'green' },
];

export default function EmotionsScreen() {
  const router = useRouter();

  const handleEmotionSelect = (emotion: any) => {
    // 다음 화면으로 이동하는 로직 (나중에 구현)
    console.log('Selected emotion:', emotion);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>×</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.searchButton}>
          <Text style={styles.searchButtonText}>🔍</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>
          다양한 감정을 선택하여{'\n'}살펴보아요
        </Text>

        <View style={styles.emotionGrid}>
          {emotions.map((emotion) => (
            <TouchableOpacity
              key={emotion.id}
              style={styles.emotionButton}
              onPress={() => handleEmotionSelect(emotion)}
            >
              <LinearGradient
                colors={emotion.color}
                style={styles.emotionCircle}
              >
                <Text style={styles.emotionTitle}>{emotion.name.split(' ')[0]}</Text>
                <Text style={styles.emotionSubtitle}>{emotion.name.split(' ')[1]}</Text>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  closeButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '300',
  },
  searchButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchButtonText: {
    fontSize: 20,
  },
  content: {
    flex: 1,
    paddingHorizontal: 40,
    justifyContent: 'center',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 24,
    fontFamily: 'Pretendard',
    textAlign: 'center',
    marginBottom: 60,
    lineHeight: 32,
  },
  emotionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  emotionButton: {
    width: '45%',
    marginBottom: 30,
    alignItems: 'center',
  },
  emotionCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emotionTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Pretendard',
    fontWeight: '600',
    textAlign: 'center',
  },
  emotionSubtitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Pretendard',
    fontWeight: '400',
    textAlign: 'center',
    marginTop: 2,
  },
});
