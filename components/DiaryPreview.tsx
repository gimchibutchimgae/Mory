import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

// 예시 데이터
const diaryData = [
  {
    id: '1',
    date: '2025-08-07',
    written: true,
    preview: '오늘은 정말 즐거운 하루였다!'
  },
  {
    id: '2',
    date: '2025-08-06',
    written: false,
    preview: ''
  },
  {
    id: '3',
    date: '2025-08-05',
    written: true,
    preview: '비가 와서 조금 우울했지만, 따뜻한 차 한잔에 위로받았다.'
  },
];

const DiaryPreview = () => {
  const renderItem = ({ item }: any) => (
    <TouchableOpacity style={styles.card} activeOpacity={item.written ? 0.7 : 1}>
      <Image
        source={item.written ? require('@/assets/images/diary_written.png') : require('@/assets/images/diary_not_written.png')}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={styles.infoContainer}>
        <Text style={styles.date}>{item.date}</Text>
        {item.written ? (
          <Text style={styles.preview} numberOfLines={2}>{item.preview}</Text>
        ) : (
          <Text style={styles.notWritten}>아직 작성하지 않았어요</Text>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>다이어리 둘러보기</Text>
      <FlatList
        data={diaryData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={{ gap: 16 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e3a5f',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 56,
    height: 56,
    marginRight: 16,
  },
  infoContainer: {
    flex: 1,
  },
  date: {
    fontSize: 16,
    color: '#f5c463',
    fontWeight: '600',
    marginBottom: 4,
  },
  preview: {
    fontSize: 15,
    color: '#fff',
  },
  notWritten: {
    fontSize: 15,
    color: '#b0b0b0',
    fontStyle: 'italic',
  },
});

export default DiaryPreview;

