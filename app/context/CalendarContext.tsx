// context/CalendarContext.tsx (새로 생성 필요)
import { calendarAPI, EmotionData } from '@/services/api';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';

interface CalendarContextType {
  monthData: EmotionData | null;
  loading: boolean;
  error: string | null;
  fetchMonthData: (month: number) => Promise<void>;
}

export const CalendarContext = createContext<CalendarContextType | null>(null);

export function useCalendar() {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error('useCalendar must be used within CalendarProvider');
  }
  return context;
}

export function CalendarProvider({ children }: { children: React.ReactNode }) {
  const { token } = useAuth();
  const [monthData, setMonthData] = useState<EmotionData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Clear data when token becomes null (user logs out)
  useEffect(() => {
    if (!token) {
      console.log('🔐 Token cleared - resetting calendar data');
      setMonthData(null);
      setError(null);
      setLoading(false);
    }
  }, [token]);

  const fetchMonthData = useCallback(async (month: number) => {
    if (!token) {
      setMonthData(null);
      setError(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await calendarAPI.getMonthSummary(month, token);
      setMonthData(data);
    } catch (err) {
      setError('Failed to fetch calendar data');
      setMonthData(null); // Clear data on error
    } finally {
      setLoading(false);
    }
  }, [token]);

  return (
    <CalendarContext.Provider value={{ monthData, loading, error, fetchMonthData }}>
      {children}
    </CalendarContext.Provider>
  );
}