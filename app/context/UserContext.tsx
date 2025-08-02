import React, { createContext, useState, useContext, ReactNode } from 'react';

interface UserContextType {
  userName: string;
  setUserName: (name: string) => void;
  userPersonality1: '활발' | '소심' | null;
  setUserPersonality1: (personality: '활발' | '소심' | null) => void;
  userPersonality2: '감성적' | '이성적' | null;
  setUserPersonality2: (personality: '감성적' | '이성적' | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userName, setUserName] = useState<string>('');
  const [userPersonality1, setUserPersonality1] = useState<'활발' | '소심' | null>(null);
  const [userPersonality2, setUserPersonality2] = useState<'감성적' | '이성적' | null>(null);

  return (
    <UserContext.Provider
      value={{
        userName,
        setUserName,
        userPersonality1,
        setUserPersonality1,
        userPersonality2,
        setUserPersonality2,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
