import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Svg, { Path, Defs, LinearGradient as SvgLinearGradient, Stop } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';
import { gradientColors } from '@/components/calendar/monthCalendar/style';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AuthContext } from '@/app/context/AuthContext';

// --- Helper Functions for Semi-circle Chart ---
const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = (angleInDegrees) * Math.PI / 180.0;
    return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
    };
}

const describeArc = (x: number, y: number, radius: number, startAngle: number, endAngle: number) => {
    const start = polarToCartesian(x, y, radius, endAngle);
    const end = polarToCartesian(x, y, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    const d = [
        "M", start.x, start.y,
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");
    return d;
}

// --- Semi-circle Chart Component ---
const SemiCircleChart = ({ data, size, strokeWidth }: { data: { value: number, emotion: keyof typeof gradientColors }[], size: number, strokeWidth: number }) => {
    const totalValue = data.reduce((acc, item) => acc + item.value, 0);
    const radius = (size - strokeWidth) / 2;
    let startAngle = 180;

    return (
        <Svg width={size} height={size / 2 + strokeWidth} viewBox={`0 0 ${size} ${size / 2 + strokeWidth}`}>
            <Defs>
                {data.map((item, index) => {
                    const gradientId = `grad${index}`;
                    const colors = gradientColors[item.emotion];
                    return (
                        <SvgLinearGradient key={gradientId} id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
                            <Stop offset="0%" stopColor={colors[0]} />
                            <Stop offset="100%" stopColor={colors[1]} />
                        </SvgLinearGradient>
                    );
                })}
            </Defs>
            <Path
                d={describeArc(size / 2, size / 2, radius, 180, 360)}
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth={strokeWidth}
                fill="none"
            />
            {data.map((item, index) => {
                const angle = (item.value / totalValue) * 180;
                const endAngle = startAngle + angle;
                const path = describeArc(size / 2, size / 2, radius, startAngle, endAngle);
                startAngle = endAngle;
                return (
                    <Path
                        key={index}
                        d={path}
                        stroke={`url(#grad${index})`}
                        strokeWidth={strokeWidth}
                        fill="none"
                    />
                );
            })}
        </Svg>
    );
};

interface AnalysisData {
  primary_emotion_type: string;
  emotions: {
    RED: string[];
    YELLOW: string[];
    GREEN: string[];
    BLUE: string[];
  };
  ratio: [string, number][];
  diary: {
    year: number;
    month: number;
    day: number;
  };
}

export default function RecordDetailScreen() {
  const router = useRouter();
  const { year, month, day } = useLocalSearchParams();
  const { token } = useContext(AuthContext);
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalysis = async () => {
      if (!token || !year || !month || !day) {
        console.log('📊 [RecordDetail] Missing parameters:', { token: !!token, year, month, day });
        setLoading(false);
        return;
      }

      try {
        console.log('📊 [RecordDetail] Fetching analysis for:', { year, month, day });

        // 모든 일기를 가져와서 해당 날짜의 일기 찾기
        const diariesUrl = `https://mory-backend-production.up.railway.app/diary`;
        console.log('📊 [RecordDetail] Fetching all diaries from:', diariesUrl);

        const diariesResponse = await fetch(diariesUrl, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        console.log('📊 [RecordDetail] Diaries response status:', diariesResponse.status);

        if (!diariesResponse.ok) {
          const errorText = await diariesResponse.text();
          console.error('📊 [RecordDetail] Diaries fetch error:', errorText);
          throw new Error(`Diaries fetch failed: ${diariesResponse.status} - ${errorText}`);
        }

        const diariesData = await diariesResponse.json();
        console.log('📊 [RecordDetail] All diaries received:', diariesData);

        // 해당 날짜의 일기 찾기
        const targetYear = parseInt(year as string);
        const targetMonth = parseInt(month as string);
        const targetDay = parseInt(day as string);

        const targetDiary = diariesData.find((diary: any) =>
          diary.year === targetYear &&
          diary.month === targetMonth &&
          diary.day === targetDay
        );

        console.log('📊 [RecordDetail] Target diary found:', targetDiary);

        if (!targetDiary) {
          console.log('📊 [RecordDetail] No diary found for this date');
          setAnalysisData(null);
          return;
        }

        // 해당 일기의 상세 정보 가져오기 (분석 데이터 포함)
        const diaryDetailUrl = `https://mory-backend-production.up.railway.app/diary/view/${targetDiary.id}`;
        console.log('📊 [RecordDetail] Fetching diary detail from:', diaryDetailUrl);

        const diaryDetailResponse = await fetch(diaryDetailUrl, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!diaryDetailResponse.ok) {
          const errorText = await diaryDetailResponse.text();
          console.error('📊 [RecordDetail] Diary detail fetch error:', errorText);
          throw new Error(`Diary detail fetch failed: ${diaryDetailResponse.status} - ${errorText}`);
        }

        const diaryDetail = await diaryDetailResponse.json();
        console.log('📊 [RecordDetail] Diary detail received:', diaryDetail);

        // 분석 데이터가 없는 경우 분석 요청
        if (!diaryDetail.analysis) {
          console.log('📊 [RecordDetail] No analysis data found, requesting analysis generation');

          const analysisGenerateResponse = await fetch(`https://mory-backend-production.up.railway.app/analysis/gpt`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              diaryId: targetDiary.id
            })
          });

          if (!analysisGenerateResponse.ok) {
            const errorText = await analysisGenerateResponse.text();
            console.error('📊 [RecordDetail] Analysis generation error:', errorText);
            throw new Error(`Analysis generation failed: ${analysisGenerateResponse.status} - ${errorText}`);
          }

          const analysisResult = await analysisGenerateResponse.json();
          console.log('📊 [RecordDetail] Analysis generated:', analysisResult);

          // 분석이 완료되면 다시 일기 상세 정보를 가져와서 분석 데이터 확인
          const updatedDiaryResponse = await fetch(diaryDetailUrl, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });

          if (updatedDiaryResponse.ok) {
            const updatedDiary = await updatedDiaryResponse.json();
            console.log('📊 [RecordDetail] Updated diary with analysis:', updatedDiary);

            if (updatedDiary.analysis) {
              const transformedData: AnalysisData = {
                primary_emotion_type: updatedDiary.analysis.primary_emotion_type,
                emotions: updatedDiary.analysis.feel || {
                  RED: [],
                  YELLOW: [],
                  GREEN: [],
                  BLUE: []
                },
                ratio: Object.entries(updatedDiary.analysis.ratio || {}).map(([emotion, value]) => [emotion, value as number]),
                diary: {
                  year: targetYear,
                  month: targetMonth,
                  day: targetDay,
                }
              };
              setAnalysisData(transformedData);
              return;
            }
          }

          // 여전히 분석 데이터가 없으면 에러
          console.log('📊 [RecordDetail] Still no analysis data after generation');
          setAnalysisData(null);
          return;
        }

        // 분석 데이터가 있는 경우 변환
        const transformedData: AnalysisData = {
          primary_emotion_type: diaryDetail.analysis.primary_emotion_type,
          emotions: diaryDetail.analysis.feel || {
            RED: [],
            YELLOW: [],
            GREEN: [],
            BLUE: []
          },
          ratio: Object.entries(diaryDetail.analysis.ratio || {}).map(([emotion, value]) => [emotion, value as number]),
          diary: {
            year: targetYear,
            month: targetMonth,
            day: targetDay,
          }
        };

        console.log('📊 [RecordDetail] Transformed analysis data:', transformedData);
        setAnalysisData(transformedData);
      } catch (error) {
        console.error('📊 [RecordDetail] Failed to fetch analysis data:', error);
        setAnalysisData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, [year, month, day, token]);

  const getEmotionGradient = (emotion: string): string[] => {
    const emotionKey = emotion.toLowerCase() as keyof typeof gradientColors;
    return gradientColors[emotionKey] || gradientColors.gray;
  };

  const getEmotionText = (emotion: string) => {
    switch (emotion) {
      case 'RED': return '화남';
      case 'YELLOW': return '기쁨';
      case 'GREEN': return '평온';
      case 'BLUE': return '슬픔';
      default: return '';
    }
  };

  if (loading) {
    return <View style={styles.loadingContainer}><ActivityIndicator size="large" color="#fff" /></View>;
  }

  if (!analysisData) {
    return (
        <View style={styles.loadingContainer}>
            <TouchableOpacity style={styles.closeBtn} onPress={() => router.back()}>
                <MaterialCommunityIcons name="close" size={28} color="#E6F1FF" />
            </TouchableOpacity>
            <Text style={styles.date}>분석 데이터가 없습니다.</Text>
        </View>
    );
  }

  const primaryEmotionGradient = getEmotionGradient(analysisData.primary_emotion_type);
  const primaryEmotionText = getEmotionText(analysisData.primary_emotion_type);

  const semiCircleData = analysisData.ratio.map(([emotion, value]) => ({
    value: value * 100,
    emotion: emotion.toLowerCase() as keyof typeof gradientColors,
  }));

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <TouchableOpacity style={styles.closeBtn} onPress={() => router.back()}>
        <MaterialCommunityIcons name="close" size={28} color="#E6F1FF" />
      </TouchableOpacity>

      <Text style={styles.date}>{`${analysisData.diary.year}년 ${analysisData.diary.month}월 ${analysisData.diary.day}일`}</Text>

      <View style={styles.chartBox}>
        <SemiCircleChart data={semiCircleData} size={280} strokeWidth={45} />
      </View>

      <View style={styles.emotionRow}>
        {analysisData.ratio.map(([emotion, value]) => (
          <View key={emotion} style={styles.emotionItem}>
            <LinearGradient
              colors={getEmotionGradient(emotion)}
              style={styles.circle}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            />
            <Text style={styles.emotionPercent}>{`${Math.round(value * 100)}%`}</Text>
          </View>
        ))}
      </View>

      <View style={styles.bubbleBox}>
        <LinearGradient
          colors={primaryEmotionGradient}
          style={styles.bubbleIcon}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
        <Text style={styles.bubbleText}>이 날은 굉장히 <Text style={{ color: primaryEmotionGradient[1], fontWeight: 'bold' }}>{primaryEmotionText}</Text> 하루였군요!!</Text>
      </View>

      <Text style={styles.sectionTitle}>감정이 드러난 단어들</Text>

      {Object.entries(analysisData.emotions)
        .sort(([emotionA], [emotionB]) => {
          const ratioA = analysisData.ratio.find(r => r[0] === emotionA)?.[1] || 0;
          const ratioB = analysisData.ratio.find(r => r[0] === emotionB)?.[1] || 0;
          return ratioB - ratioA;
        })
        .map(([emotion, words]) => {
          if (words.length === 0) return null;
          const gradient = getEmotionGradient(emotion);
          const emotionRatio = analysisData.ratio.find(r => r[0] === emotion);
          return (
            <View key={emotion} style={styles.wordBox}>
              <View style={styles.wordHeader}>
                <Text style={[styles.wordTitle, { color: gradient[1] }]}>{getEmotionText(emotion)}</Text>
                <Text style={styles.wordPercent}>{emotionRatio ? `${Math.round(emotionRatio[1] * 100)}%` : ''}</Text>
              </View>
              <View style={styles.wordList}>
                {words.map((word, index) => (
                  <LinearGradient
                    key={index}
                    colors={gradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.wordTag}
                  >
                    <Text style={styles.wordItem}>{word}</Text>
                  </LinearGradient>
                ))}
              </View>
            </View>
          );
        })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A192F',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#0A192F',
    justifyContent: 'center',
  },
  contentContainer: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 48,
  },
  closeBtn: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
    padding: 8,
  },
  date: {
    color: '#E6F1FF',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
    fontFamily: 'Pretendard',
  },
  chartBox: {
    backgroundColor: 'rgba(20, 39, 64, 0.6)',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingTop: 24,
    paddingHorizontal: 16,
    marginBottom: 24,
    overflow: 'hidden',
  },
  emotionRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 32,
    paddingHorizontal: 16,
  },
  emotionItem: {
    alignItems: 'center',
  },
  circle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginBottom: 8,
  },
  emotionPercent: {
    color: '#E6F1FF',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Pretendard',
  },
  bubbleBox: {
    backgroundColor: 'rgba(20, 39, 64, 0.6)',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    marginBottom: 40,
  },
  bubbleIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bubbleText: {
    flex: 1,
    color: '#E6F1FF',
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Pretendard',
    lineHeight: 24,
  },
  sectionTitle: {
    color: '#E6F1FF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    fontFamily: 'Pretendard',
  },
  wordBox: {
    backgroundColor: 'rgba(20, 39, 64, 0.6)',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
  },
  wordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  wordTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Pretendard',
  },
  wordPercent: {
    color: '#E6F1FF',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Pretendard',
  },
  wordList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  wordItem: {
    color: '#0A192F',
    fontSize: 15,
    fontWeight: '600',
    fontFamily: 'Pretendard',
  },
  wordTag: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 16,
    overflow: 'hidden',
  },
});