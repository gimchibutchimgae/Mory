export interface EmotionData {
  [day: string]: 'RED' | 'BLUE' | 'YELLOW' | 'GREEN' | 'YET' | null;
}

export interface DiaryData {
  title: string;
  content: string;
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

export const diaryAPI = {
  saveDiary: async (diaryData: DiaryData, token: string): Promise<any> => {
    const url = `https://mory-backend-production.up.railway.app/diary`;
    
    if (!token) {
      throw new Error('No authentication token provided');
    }
    
    console.log(`📝 Saving diary:`, diaryData);
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(diaryData),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ Diary save error: ${response.status} - ${errorText}`);
      throw new Error(`Diary save error: ${response.status} - ${errorText}`);
    }
    
    const data = await response.json();
    console.log(`✅ Diary saved successfully:`, data);
    return data;
  },
};