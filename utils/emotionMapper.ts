type APIEmotion = 'RED' | 'BLUE' | 'YELLOW' | 'GREEN' | 'YET' | null;
type DayState = 'gray' | 'red' | 'yellow' | 'green' | 'blue';

export function mapAPIEmotionToDayState(apiEmotion: APIEmotion): DayState {
  switch (apiEmotion) {
    case 'RED': return 'red';
    case 'BLUE': return 'blue';
    case 'YELLOW': return 'yellow';
    case 'GREEN': return 'green';
    case 'YET': return 'gray'; // 분석 중
    case null: return 'gray'; // 일기 없음
    default: return 'gray';
  }
}