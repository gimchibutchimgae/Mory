export interface EmotionItem {
  id: number;
  name: string;
  description: string; // 감정에 대한 설명
  x: number; // 0-9 (가로 위치)
  y: number; // 0-9 (세로 위치)
  color: string; // 단색 배경
  category: 'red' | 'yellow' | 'blue' | 'green'; 
}

// 첨부된 이미지의 10x10 감정 그리드와 정확히 동일한 배치
export const emotionData: EmotionItem[] = [
  // 첫 번째 행 (y: 0) - 빨간색/노란색 계열
  { id: 1, name: '격분한', description: '참을 수 없을 정도로 분노가 폭발한 느낌', x: 0, y: 0, color: '#FE4536', category: 'red' },
  { id: 2, name: '공황에 빠진', description: '감당 못할 불안과 혼란에 휩싸인 상태', x: 1, y: 0, color: '#FF5E48', category: 'red' },
  { id: 3, name: '스트레스 받는', description: '계속되는 압박에 지치고 짜증나는 상태', x: 2, y: 0, color: '#FF6C53', category: 'red' },
  { id: 4, name: '초조한', description: '불안해서 가만히 있지 못하는 느낌', x: 3, y: 0, color: '#FF795B', category: 'red' },
  { id: 5, name: '충격받은', description: '믿기 힘든 일을 접하고 멍해진 상태', x: 4, y: 0, color: '#FF8763', category: 'yellow' },
  { id: 6, name: '놀란', description: '예상치 못한 일에 깜짝 놀라는 반응', x: 5, y: 0, color: '#FBE471', category: 'yellow' },
  { id: 7, name: '긍정적인', description: '밝고 희망적으로 생각하고 느끼는 상태', x: 6, y: 0, color: '#FCDA62', category: 'yellow' },
  { id: 8, name: '흥겨운', description: '분위기에 취해 즐겁고 신나는 상태', x: 7, y: 0, color: '#FCCE55', category: 'yellow' },
  { id: 9, name: '아주 신나는', description: '몸을 가만히 두기 힘들 만큼 들뜬 상태', x: 8, y: 0, color: '#FFBD41', category: 'yellow' },
  { id: 10, name: '황홀한', description: '너무 좋아서 현실감이 없을 만큼 취한 듯한 기분', x: 9, y: 0, color: '#FFA529', category: 'yellow' },

  // 두 번째 행 (y: 1)
  { id: 11, name: '격노한', description: '이성을 잃을 정도로 극도로 화가 난 상태', x: 0, y: 1, color: '#FE4536', category: 'red' },
  { id: 12, name: '몹시 화가 난', description: '감정을 주체할 수 없을 만큼 분노한 상태', x: 1, y: 1, color: '#FF5E48', category: 'red' },
  { id: 13, name: '좌절한', description: '기대가 무너져 낙심하고 의욕을 잃은 느낌', x: 2, y: 1, color: '#FF6C53', category: 'red' },
  { id: 14, name: '신경이 날카로운', description: '작은 일에도 예민하게 반응하는 상태', x: 3, y: 1, color: '#FF795B', category: 'red' },
  { id: 15, name: '망연자실한', description: '너무 놀라거나 실망해서 아무 생각이 안 나는 상태', x: 4, y: 1, color: '#FF8763', category: 'red' },
  { id: 16, name: '들뜬', description: '기대와 흥분으로 마음이 붕 뜬 상태', x: 5, y: 1, color: '#FBE471', category: 'yellow' },
  { id: 17, name: '쾌활한', description: '명랑하고 생기 넘치는 분위기', x: 6, y: 1, color: '#FCDA62', category: 'yellow' },
  { id: 18, name: '동기부여된', description: '무언가를 해내고 싶은 열정이 솟아오른 느낌', x: 7, y: 1, color: '#FCCE55', category: 'yellow' },
  { id: 19, name: '영감을 받은', description: '무언가에 감동받아 창의적 에너지가 샘솟는 느낌', x: 8, y: 1, color: '#FFBD41', category: 'yellow' },
  { id: 20, name: '의기양양한', description: '자신감 넘치고 우쭐한 상태', x: 9, y: 1, color: '#FFA529', category: 'yellow' },

  // 세 번째 행 (y: 2)
  { id: 21, name: '화가 치밀어 오른', description: '분노가 속에서 확 끓어오르는 느낌', x: 0, y: 2, color: '#FE4536', category: 'red' },
  { id: 22, name: '겁먹은', description: '두렵고 위축되어 도망치고 싶은 느낌', x: 1, y: 2, color: '#FF5E48', category: 'red' },
  { id: 23, name: '화난', description: '누군가나 무언가에 분노를 느끼는 상태', x: 2, y: 2, color: '#FF6C53', category: 'red' },
  { id: 24, name: '초조한', description: '무언가 기다릴 때 마음이 급하고 불안한 상태', x: 3, y: 2, color: '#FF795B', category: 'red' },
  { id: 25, name: '안절부절못하는', description: '불안하고 조급해서 가만히 못 있는 상태', x: 4, y: 2, color: '#FF8763', category: 'red' },
  { id: 26, name: '기운이 넘치는', description: '에너지와 활기가 넘치는 상태', x: 5, y: 2, color: '#FBE471', category: 'yellow' },
  { id: 27, name: '활발한', description: '움직임이나 에너지가 넘치고 적극적인 상태', x: 6, y: 2, color: '#FCDA62', category: 'yellow' },
  { id: 28, name: '흥분한', description: '감정이 고조되어 가슴이 두근거리는 상태', x: 7, y: 2, color: '#FCCE55', category: 'yellow' },
  { id: 29, name: '낙관적인', description: '일의 결과나 미래를 밝게 내다보는 태도', x: 8, y: 2, color: '#FFBD41', category: 'yellow' },
  { id: 30, name: '열광하는', description: '매우 좋아하거나 환호하며 감정이 폭발하는 상태', x: 9, y: 2, color: '#FFA529', category: 'yellow' },

  // 네 번째 행 (y: 3)
  { id: 31, name: '불안한', description: '이유 없이 마음이 불편하고 조마조마한 상태', x: 0, y: 3, color: '#FE4536', category: 'red' },
  { id: 32, name: '우려하는', description: '일이 잘못될까 걱정스러운 마음', x: 1, y: 3, color: '#FF5E48', category: 'red' },
  { id: 33, name: '근심하는', description: '마음속으로 걱정이 가득한 상태', x: 2, y: 3, color: '#FF6C53', category: 'red' },
  { id: 34, name: '짜증나는', description: '귀찮고 신경을 건드리는 느낌', x: 3, y: 3, color: '#FF795B', category: 'red' },
  { id: 35, name: '거슬리는', description: '눈에 띄고 신경 쓰여서 불편한 느낌', x: 4, y: 3, color: '#FF8763', category: 'red' },
  { id: 36, name: '만족스러운', description: '원하는 대로 되어 마음이 편하고 흐뭇한 느낌', x: 5, y: 3, color: '#FBE471', category: 'yellow' },
  { id: 37, name: '집중하는', description: '한 가지에 온 신경을 쏟는 몰입된 상태', x: 6, y: 3, color: '#FCDA62', category: 'yellow' },
  { id: 38, name: '행복한', description: '마음이 충만하고 모든 게 만족스러운 느낌', x: 7, y: 3, color: '#FCCE55', category: 'yellow' },
  { id: 39, name: '자랑스러운', description: '스스로나 누군가가 대견하고 뿌듯한 느낌', x: 8, y: 3, color: '#FFBD41', category: 'yellow' },
  { id: 40, name: '짜릿한', description: '짧고 강하게 전율처럼 느껴지는 기쁨', x: 9, y: 3, color: '#FFA529', category: 'yellow' },

  // 다섯 번째 행 (y: 4)
  { id: 41, name: '불쾌한', description: '기분이 나쁘고 마주하고 싶지 않은 느낌', x: 0, y: 4, color: '#FE4536', category: 'red' },
  { id: 42, name: '골치 아픈', description: '복잡하고 해결하기 힘들어 머리가 아픈 상태', x: 1, y: 4, color: '#FF5E48', category: 'red' },
  { id: 43, name: '염려하는', description: '다른 사람이나 상황을 걱정하고 신경 쓰는 상태', x: 2, y: 4, color: '#FF6C53', category: 'red' },
  { id: 44, name: '마음이 불편한', description: '뭔가 꺼림칙하고 편하지 않은 상태', x: 3, y: 4, color: '#FF795B', category: 'red' },
  { id: 45, name: '언짢은', description: '기분이 나빠서 말하기도 싫은 상태', x: 4, y: 4, color: '#FF8763', category: 'red' },
  { id: 46, name: '유쾌한', description: '기분이 상쾌하고 즐거운 상태', x: 5, y: 4, color: '#FBE471', category: 'yellow' },
  { id: 47, name: '기쁜', description: '마음이 환해지고 좋은 일이 생겨 웃음 나는 느낌', x: 6, y: 4, color: '#FCDA62', category: 'yellow' },
  { id: 48, name: '희망찬', description: '앞날이 기대되고 긍정적인 에너지가 넘치는 상태', x: 7, y: 4, color: '#FCCE55', category: 'yellow' },
  { id: 49, name: '재미있는', description: '웃기거나 흥미로워서 시간 가는 줄 모르는 상태', x: 8, y: 4, color: '#FFBD41', category: 'yellow' },
  { id: 50, name: '더없이 행복한', description: '이보다 좋을 수 없을 만큼 충만한 기쁨', x: 9, y: 4, color: '#FFA529', category: 'yellow' },

  // 여섯 번째 행 (y: 5) - 파란색/초록색 계열 전환
  { id: 51, name: '역겨운', description: '몸서리칠 정도로 불쾌하고 거북한 느낌', x: 0, y: 5, color: '#7794FE', category: 'blue' },
  { id: 52, name: '침울한', description: '무겁고 어두운 분위기에 잠긴 우울한 느낌', x: 1, y: 5, color: '#74A8FA', category: 'blue' },
  { id: 53, name: '실망스러운', description: '기대에 못 미쳐 마음이 푹 꺾인 상태', x: 2, y: 5, color: '#4FD1FF', category: 'blue' },
  { id: 54, name: '의욕 없는', description: '뭘 해도 흥미나 에너지가 없는 상태', x: 3, y: 5, color: '#68D3FF', category: 'blue' },
  { id: 55, name: '냉담한', description: '무관심하고 차가운 태도, 쌀쌀맞은 느낌', x: 4, y: 5, color: '#81D6FF', category: 'green' },
  { id: 56, name: '속편한', description: '걱정 없이 마음이 가벼운 상태', x: 5, y: 5, color: '#97FFAF', category: 'green' },
  { id: 57, name: '태평한', description: '아무 걱정 없이 느긋한 태도', x: 6, y: 5, color: '#78FCB5', category: 'green' },
  { id: 58, name: '자족하는', description: '있는 그대로에 만족하고 감사한 마음', x: 7, y: 5, color: '#59F7BC', category: 'green' },
  { id: 59, name: '다정한', description: '따뜻하고 애정 어린 태도', x: 8, y: 5, color: '#62DE98', category: 'green' },
  { id: 60, name: '충만한', description: '마음속이 기쁨이나 만족으로 가득 찬 상태', x: 9, y: 5, color: '#53D793', category: 'green' },

  // 일곱 번째 행 (y: 6)
  { id: 61, name: '비관적인', description: '모든 걸 부정적으로 보고 희망이 없다고 느끼는 상태', x: 0, y: 6, color: '#7794FE', category: 'blue' },
  { id: 62, name: '시무룩한', description: '말 없이 삐친 듯한 기분 나쁜 상태', x: 1, y: 6, color: '#74A8FA', category: 'blue' },
  { id: 63, name: '낙담한', description: '용기나 희망을 잃고 풀이 죽은 상태', x: 2, y: 6, color: '#4FD1FF', category: 'blue' },
  { id: 64, name: '슬픈', description: '가슴이 아프고 눈물이 날 듯한 감정', x: 3, y: 6, color: '#68D3FF', category: 'blue' },
  { id: 65, name: '지루한', description: '흥미 없고 시간이 느리게 가는 따분한 느낌', x: 4, y: 6, color: '#81D6FF', category: 'blue' },
  { id: 66, name: '평온한', description: '조용하고 흔들림 없는 마음 상태', x: 5, y: 6, color: '#97FFAF', category: 'green' },
  { id: 67, name: '안전한', description: '위협 없이 보호받고 있는 안정감', x: 6, y: 6, color: '#78FCB5', category: 'green' },
  { id: 68, name: '만족스러운', description: '원하는 만큼 충족되어 기분 좋은 상태', x: 7, y: 6, color: '#59F7BC', category: 'green' },
  { id: 69, name: '감사하는', description: '누군가나 무언가에 고마움을 느끼는 상태', x: 8, y: 6, color: '#62DE98', category: 'green' },
  { id: 70, name: '감동적인', description: '깊이 울림을 주는 따뜻한 느낌', x: 9, y: 6, color: '#53D793', category: 'green' },

  // 여덟 번째 행 (y: 7)
  { id: 71, name: '소외된', description: '무리에서 따돌려져 혼자라고 느끼는 상태', x: 0, y: 7, color: '#7794FE', category: 'blue' },
  { id: 72, name: '비참한', description: '너무 초라하고 불쌍해서 눈물이 날 것 같은 상태', x: 1, y: 7, color: '#74A8FA', category: 'blue' },
  { id: 73, name: '쓸쓸한', description: '마음이 허전하고 외로움이 스며드는 느낌', x: 2, y: 7, color: '#4FD1FF', category: 'blue' },
  { id: 74, name: '기죽은', description: '자신감이 꺾이고 작아진 듯한 느낌', x: 3, y: 7, color: '#68D3FF', category: 'blue' },
  { id: 75, name: '피곤한', description: '몸과 마음이 축 처지고 쉬고 싶은 상태', x: 4, y: 7, color: '#81D6FF', category: 'blue' },
  { id: 76, name: '여유로운', description: '시간과 마음에 넉넉함이 있는 느낌', x: 5, y: 7, color: '#97FFAF', category: 'green' },
  { id: 77, name: '차분한', description: '감정이 가라앉고 조용히 집중된 상태', x: 6, y: 7, color: '#78FCB5', category: 'green' },
  { id: 78, name: '편안한', description: '몸과 마음이 긴장 없이 편한 상태', x: 7, y: 7, color: '#59F7BC', category: 'green' },
  { id: 79, name: '축복받은', description: '특별하고 소중한 행운을 누리는 느낌', x: 8, y: 7, color: '#62DE98', category: 'green' },
  { id: 80, name: '안정적인', description: '변화 없이 안정되어 믿음직한 상태', x: 9, y: 7, color: '#53D793', category: 'green' },

  // 아홉 번째 행 (y: 8)
  { id: 81, name: '의기소침한', description: '기운 없고 자신감이 바닥난 상태', x: 0, y: 8, color: '#7794FE', category: 'blue' },
  { id: 82, name: '우울한', description: '기분이 처지고 슬프며 아무것도 하기 싫은 상태', x: 1, y: 8, color: '#74A8FA', category: 'blue' },
  { id: 83, name: '뚱한', description: '기분이 상해서 말을 안 하고 무표정한 상태', x: 2, y: 8, color: '#4FD1FF', category: 'blue' },
  { id: 84, name: '기진맥진한', description: '탈진할 만큼 지쳐서 아무 힘도 남지 않은 상태', x: 3, y: 8, color: '#68D3FF', category: 'blue' },
  { id: 85, name: '지친', description: '반복된 일이나 감정으로 심하게 피로한 상태', x: 4, y: 8, color: '#81D6FF', category: 'blue' },
  { id: 86, name: '한가로운', description: '할 일 없이 느긋하고 편한 상태', x: 5, y: 8, color: '#97FFAF', category: 'green' },
  { id: 87, name: '생각에 잠긴', description: '조용히 사색에 빠져 있는 상태', x: 6, y: 8, color: '#78FCB5', category: 'green' },
  { id: 88, name: '평화로운', description: '다툼이나 소란 없이 조화로운 분위기', x: 7, y: 8, color: '#59F7BC', category: 'green' },
  { id: 89, name: '편한', description: '몸과 마음이 긴장 없이 안정되고 느긋한 상태', x: 8, y: 8, color: '#62DE98', category: 'green' },
  { id: 90, name: '근심 걱정 없는', description: '불안 요소 없이 온전히 편한 상태', x: 9, y: 8, color: '#53D793', category: 'green' },

  // 열 번째 행 (y: 9)
  { id: 91, name: '절망한', description: '아무런 희망도 없이 모든 걸 포기하고 싶은 상태', x: 0, y: 9, color: '#7794FE', category: 'blue' },
  { id: 92, name: '가망없는', description: '나아질 가능성조차 보이지 않아 포기하고 싶은 느낌', x: 1, y: 9, color: '#74A8FA', category: 'blue' },
  { id: 93, name: '고독한', description: '혼자 있는 것이 익숙하지만, 마음 한켠이 허전한 상태', x: 2, y: 9, color: '#4FD1FF', category: 'blue' },
  { id: 94, name: '소모된', description: '에너지와 감정이 모두 바닥난 느낌', x: 3, y: 9, color: '#68D3FF', category: 'blue' },
  { id: 95, name: '진이 빠진', description: '모든 기운이 빠져 나가 아무것도 하기 싫은 상태', x: 4, y: 9, color: '#81D6FF', category: 'blue' },
  { id: 96, name: '나른한', description: '졸릴 듯 힘 빠지지만 기분 좋게 느슨한 상태', x: 5, y: 9, color: '#97FFAF', category: 'green' },
  { id: 97, name: '흐뭇한', description: '마음에 들어 미소가 지어지는 기분', x: 6, y: 9, color: '#78FCB5', category: 'green' },
  { id: 98, name: '고요한', description: '소리 없이 조용하고 안정된 느낌', x: 7, y: 9, color: '#59F7BC', category: 'green' },
  { id: 99, name: '안락한', description: '편리하고 따뜻하게 안정된 환경에 있는 느낌', x: 8, y: 9, color: '#62DE98', category: 'green' },
  { id: 100, name: '안온한', description: '따뜻하고 평화로운 안식 속에 있는 상태', x: 9, y: 9, color: '#53D793', category: 'green' }
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
