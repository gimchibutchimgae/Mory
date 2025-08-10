export interface EmotionItem {
  id: number;
  name: string;
  x: number; // 0-9 (가로 위치)
  y: number; // 0-9 (세로 위치)
  color: string; // 단색 배경
  category: 'red' | 'yellow' | 'blue' | 'green'; 
}

// 첨부된 이미지의 10x10 감정 그리드와 정확히 동일한 배치
export const emotionData: EmotionItem[] = [
  // 첫 번째 행 (y: 0) - 빨간색/노란색 계열
  { id: 1, name: '격분한', x: 0, y: 0, color: '#FE4536', category: 'red' },
  { id: 2, name: '공황에 빠진', x: 1, y: 0, color: '#FF5E48', category: 'red' },
  { id: 3, name: '스트레스 받는', x: 2, y: 0, color: '#FF6C53', category: 'red' },
  { id: 4, name: '초조한', x: 3, y: 0, color: '#FF795B', category: 'red' },
  { id: 5, name: '충격받은', x: 4, y: 0, color: '#FF8763', category: 'yellow' },
  { id: 6, name: '놀란', x: 5, y: 0, color: '#FBE471', category: 'yellow' },
  { id: 7, name: '긍정적인', x: 6, y: 0, color: '#FCDA62', category: 'yellow' },
  { id: 8, name: '흥겨운', x: 7, y: 0, color: '#FCCE55', category: 'yellow' },
  { id: 9, name: '아주 신나는', x: 8, y: 0, color: '#FFBD41', category: 'yellow' },
  { id: 10, name: '황홀한', x: 9, y: 0, color: '#FFA529', category: 'yellow' },

  // 두 번째 행 (y: 1)
  { id: 11, name: '격노한', x: 0, y: 1, color: '#FE4536', category: 'red' },
  { id: 12, name: '몹시 화가 난', x: 1, y: 1, color: '#FF5E48', category: 'red' },
  { id: 13, name: '좌절한', x: 2, y: 1, color: '#FF6C53', category: 'red' },
  { id: 14, name: '신경이 날카로운', x: 3, y: 1, color: '#FF795B', category: 'red' },
  { id: 15, name: '망연자실한', x: 4, y: 1, color: '#FF8763', category: 'red' },
  { id: 16, name: '들뜬', x: 5, y: 1, color: '#FBE471', category: 'yellow' },
  { id: 17, name: '쾌활한', x: 6, y: 1, color: '#FCDA62', category: 'yellow' },
  { id: 18, name: '동기부여된', x: 7, y: 1, color: '#FCCE55', category: 'yellow' },
  { id: 19, name: '영감을 받은', x: 8, y: 1, color: '#FFBD41', category: 'yellow' },
  { id: 20, name: '의기양양한', x: 9, y: 1, color: '#FFA529', category: 'yellow' },

  // 세 번째 행 (y: 2)
  { id: 21, name: '화가 치밀어 오른', x: 0, y: 2, color: '#FE4536', category: 'red' },
  { id: 22, name: '겁먹은', x: 1, y: 2, color: '#FF5E48', category: 'red' },
  { id: 23, name: '화난', x: 2, y: 2, color: '#FF6C53', category: 'red' },
  { id: 24, name: '초조한', x: 3, y: 2, color: '#FF795B', category: 'red' },
  { id: 25, name: '안절부절못하는', x: 4, y: 2, color: '#FF8763', category: 'red' },
  { id: 26, name: '기운이 넘치는', x: 5, y: 2, color: '#FBE471', category: 'yellow' },
  { id: 27, name: '활발한', x: 6, y: 2, color: '#FCDA62', category: 'yellow' },
  { id: 28, name: '흥분한', x: 7, y: 2, color: '#FCCE55', category: 'yellow' },
  { id: 29, name: '낙관적인', x: 8, y: 2, color: '#FFBD41', category: 'yellow' },
  { id: 30, name: '열광하는', x: 9, y: 2, color: '#FFA529', category: 'yellow' },

  // 네 번째 행 (y: 3)
  { id: 31, name: '불안한', x: 0, y: 3, color: '#FE4536', category: 'red' },
  { id: 32, name: '우려하는', x: 1, y: 3, color: '#FF5E48', category: 'red' },
  { id: 33, name: '근심하는', x: 2, y: 3, color: '#FF6C53', category: 'red' },
  { id: 34, name: '짜증나는', x: 3, y: 3, color: '#FF795B', category: 'red' },
  { id: 35, name: '거슬리는', x: 4, y: 3, color: '#FF8763', category: 'red' },
  { id: 36, name: '만족스러운', x: 5, y: 3, color: '#FBE471', category: 'yellow' },
  { id: 37, name: '집중하는', x: 6, y: 3, color: '#FCDA62', category: 'yellow' },
  { id: 38, name: '행복한', x: 7, y: 3, color: '#FCCE55', category: 'yellow' },
  { id: 39, name: '자랑스러운', x: 8, y: 3, color: '#FFBD41', category: 'yellow' },
  { id: 40, name: '짜릿한', x: 9, y: 3, color: '#FFA529', category: 'yellow' },

  // 다섯 번째 행 (y: 4)
  { id: 41, name: '불쾌한', x: 0, y: 4, color: '#FE4536', category: 'red' },
  { id: 42, name: '골치 아픈', x: 1, y: 4, color: '#FF5E48', category: 'red' },
  { id: 43, name: '염려하는', x: 2, y: 4, color: '#FF6C53', category: 'red' },
  { id: 44, name: '마음이 불편한', x: 3, y: 4, color: '#FF795B', category: 'red' },
  { id: 45, name: '언짢은', x: 4, y: 4, color: '#FF8763', category: 'red' },
  { id: 46, name: '유쾌한', x: 5, y: 4, color: '#FBE471', category: 'yellow' },
  { id: 47, name: '기쁜', x: 6, y: 4, color: '#FCDA62', category: 'yellow' },
  { id: 48, name: '희망찬', x: 7, y: 4, color: '#FCCE55', category: 'yellow' },
  { id: 49, name: '재미있는', x: 8, y: 4, color: '#FFBD41', category: 'yellow' },
  { id: 50, name: '더없이 행복한', x: 9, y: 4, color: '#FFA529', category: 'yellow' },

  // 여섯 번째 행 (y: 5) - 파란색/초록색 계열 전환
  { id: 51, name: '역겨운', x: 0, y: 5, color: '#7794FE', category: 'blue' },
  { id: 52, name: '침울한', x: 1, y: 5, color: '#74A8FA', category: 'blue' },
  { id: 53, name: '실망스러운', x: 2, y: 5, color: '#4FD1FF', category: 'blue' },
  { id: 54, name: '의욕 없는', x: 3, y: 5, color: '#68D3FF', category: 'blue' },
  { id: 55, name: '냉담한', x: 4, y: 5, color: '#81D6FF', category: 'green' },
  { id: 56, name: '속편한', x: 5, y: 5, color: '#97FFAF', category: 'green' },
  { id: 57, name: '태평한', x: 6, y: 5, color: '#78FCB5', category: 'green' },
  { id: 58, name: '자촉하는', x: 7, y: 5, color: '#59F7BC', category: 'green' },
  { id: 59, name: '다정한', x: 8, y: 5, color: '#62DE98', category: 'green' },
  { id: 60, name: '충만한', x: 9, y: 5, color: '#53D793', category: 'green' },

  // 일곱 번째 행 (y: 6)
  { id: 61, name: '비관적인', x: 0, y: 6, color: '#7794FE', category: 'blue' },
  { id: 62, name: '시무룩한', x: 1, y: 6, color: '#74A8FA', category: 'blue' },
  { id: 63, name: '낙담한', x: 2, y: 6, color: '#4FD1FF', category: 'blue' },
  { id: 64, name: '슬픈', x: 3, y: 6, color: '#68D3FF', category: 'blue' },
  { id: 65, name: '지루한', x: 4, y: 6, color: '#81D6FF', category: 'blue' },
  { id: 66, name: '평온한', x: 5, y: 6, color: '#97FFAF', category: 'green' },
  { id: 67, name: '안전한', x: 6, y: 6, color: '#78FCB5', category: 'green' },
  { id: 68, name: '만족스러운', x: 7, y: 6, color: '#59F7BC', category: 'green' },
  { id: 69, name: '감사하는', x: 8, y: 6, color: '#62DE98', category: 'green' },
  { id: 70, name: '감동적인', x: 9, y: 6, color: '#53D793', category: 'green' },

  // 여덟 번째 행 (y: 7)
  { id: 71, name: '소외된', x: 0, y: 7, color: '#7794FE', category: 'blue' },
  { id: 72, name: '비참한', x: 1, y: 7, color: '#74A8FA', category: 'blue' },
  { id: 73, name: '쓸쓸한', x: 2, y: 7, color: '#4FD1FF', category: 'blue' },
  { id: 74, name: '기죽은', x: 3, y: 7, color: '#68D3FF', category: 'blue' },
  { id: 75, name: '피곤한', x: 4, y: 7, color: '#81D6FF', category: 'blue' },
  { id: 76, name: '여유로운', x: 5, y: 7, color: '#97FFAF', category: 'green' },
  { id: 77, name: '차분한', x: 6, y: 7, color: '#78FCB5', category: 'green' },
  { id: 78, name: '편안한', x: 7, y: 7, color: '#59F7BC', category: 'green' },
  { id: 79, name: '축복받은', x: 8, y: 7, color: '#62DE98', category: 'green' },
  { id: 80, name: '안정적인', x: 9, y: 7, color: '#53D793', category: 'green' },

  // 아홉 번째 행 (y: 8)
  { id: 81, name: '의기소침한', x: 0, y: 8, color: '#7794FE', category: 'blue' },
  { id: 82, name: '우울한', x: 1, y: 8, color: '#74A8FA', category: 'blue' },
  { id: 83, name: '뚱한', x: 2, y: 8, color: '#4FD1FF', category: 'blue' },
  { id: 84, name: '기진맥진한', x: 3, y: 8, color: '#68D3FF', category: 'blue' },
  { id: 85, name: '지친', x: 4, y: 8, color: '#81D6FF', category: 'blue' },
  { id: 86, name: '한가로운', x: 5, y: 8, color: '#97FFAF', category: 'green' },
  { id: 87, name: '생각에 잠긴', x: 6, y: 8, color: '#78FCB5', category: 'green' },
  { id: 88, name: '평화로운', x: 7, y: 8, color: '#59F7BC', category: 'green' },
  { id: 89, name: '편한', x: 8, y: 8, color: '#62DE98', category: 'green' },
  { id: 90, name: '근심 걱정 없는', x: 9, y: 8, color: '#53D793', category: 'green' },

  // 열 번째 행 (y: 9)
  { id: 91, name: '절망한', x: 0, y: 9, color: '#7794FE', category: 'blue' },
  { id: 92, name: '가망없는', x: 1, y: 9, color: '#74A8FA', category: 'blue' },
  { id: 93, name: '고독한', x: 2, y: 9, color: '#4FD1FF', category: 'blue' },
  { id: 94, name: '소모된', x: 3, y: 9, color: '#68D3FF', category: 'blue' },
  { id: 95, name: '진이 빠진', x: 4, y: 9, color: '#81D6FF', category: 'blue' },
  { id: 96, name: '나들한', x: 5, y: 9, color: '#97FFAF', category: 'green' },
  { id: 97, name: '흐뭇한', x: 6, y: 9, color: '#78FCB5', category: 'green' },
  { id: 98, name: '고요한', x: 7, y: 9, color: '#59F7BC', category: 'green' },
  { id: 99, name: '안락한', x: 8, y: 9, color: '#62DE98', category: 'green' },
  { id: 100, name: '안온한', x: 9, y: 9, color: '#53D793', category: 'green' }
];

export type EmotionCategory = 'red' | 'yellow' | 'blue' | 'green';

// 카테고리별 중심 좌표 (emotions.tsx에서 선택 시 이동할 위치)
export const categoryFocus = {
  red: { x: 2, y: 2 },    // 빨간색 계열 중심
  yellow: { x: 7, y: 2 }, // 노란색 계열 중심  
  blue: { x: 2, y: 7 },   // 파란색 계열 중심
  green: { x: 7, y: 7 }   // 초록색 계열 중심
};

// 카테고리별 감정들 필터링 함수
export const getEmotionsByCategory = (category: string): EmotionItem[] => {
  return emotionData.filter(emotion => emotion.category === category);
};

// 특정 좌표 주변 9개 감정 가져오기 (3x3 영역)
export const getEmotionsAroundPoint = (centerX: number, centerY: number): EmotionItem[] => {
  const result: EmotionItem[] = [];
  
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      const x = centerX + dx;
      const y = centerY + dy;
      
      if (x >= 0 && x < 10 && y >= 0 && y < 10) {
        const emotion = emotionData.find(e => e.x === x && e.y === y);
        if (emotion) {
          result.push(emotion);
        }
      }
    }
  }
  
  return result;
};
