export interface EmotionData {
  [day: string]: 'RED' | 'BLUE' | 'YELLOW' | 'GREEN' | 'YET' | null;
}

export const calendarAPI = {
  getMonthSummary: async (month: number, token: string): Promise<EmotionData> => {
    const url = `https://mory-backend-production.up.railway.app/diary/summary/${month}`;

    if (!token) {
      throw new Error('No authentication token provided');
    }

    console.log(`📅 Fetching calendar data for month: ${month}`);
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ API Error: ${response.status} - ${errorText}`);
      throw new Error(`API Error: ${response.status} - ${errorText}`);
    }
    const data = await response.json();
    console.log(`✅ Calendar data received for month ${month}:`, Object.keys(data).length, 'days');
    return data;
  },
};