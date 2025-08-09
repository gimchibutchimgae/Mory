import { IconSvg } from '@/components/ui/IconSvg';
import { usePathname, useRouter } from 'expo-router';
import React from 'react';
import * as S from './style';

export default function NavBar() {
  const router = useRouter();
  const pathname = usePathname();

  const tabs = [
    { name: 'record', title: '기록', route: '/(tabs)/record', icon: 'record' },
    { name: 'index', title: '홈', route: '/(tabs)/', icon: 'home' },
    { name: 'profile', title: '프로필', route: '/(tabs)/profile', icon: 'profile' },
  ];

  return (
    <S.Container>
      {tabs.map((tab) => {
        const isActive = pathname.includes(tab.name) || (tab.name === 'index' && pathname === '/(tabs)');
        
        return (
          <S.TabButton 
            key={tab.name}
            focused={isActive}
            onPress={() => router.navigate(tab.route as any)}
          >
            <IconSvg 
              name={tab.icon as any} 
              color={isActive ? '#fff' : '#FFFFFF66'}
              size={33.6}
            />
            <S.Label focused={isActive}>{tab.title}</S.Label>
          </S.TabButton>
        );
      })}
    </S.Container>
  );
}
