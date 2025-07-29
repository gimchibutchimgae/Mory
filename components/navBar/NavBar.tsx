import { IconSvg } from '@/components/ui/IconPng';
import { useRouter, useSegments } from 'expo-router';
import React from 'react';
import * as S from './style';

export function NaviBar() {
  const router = useRouter();
  const segments = useSegments();
  const current = segments[segments.length - 1];

  const tabs = [
    { name: 'chart', label: '기록', icon: 'record' },
    { name: '/', label: '홈', icon: 'home' }, // 홈은 '/'
    { name: 'profile', label: '프로필', icon: 'profile' },
  ];

  return (
    <S.Container>
      {tabs.map(tab => {
        const focused =
          (tab.name === '/' && (current === 'index' || current === '')) ||
          current === tab.name;
        return (
          <S.TabButton
            key={tab.name}
            focused={!!focused}
            onPress={() => router.navigate(tab.name)}
            activeOpacity={0.8}
          >
            <IconSvg name={tab.icon as any} />
            <S.Label focused={!!focused}>{tab.label}</S.Label>
          </S.TabButton>
        );
      })}
    </S.Container>
  );
}