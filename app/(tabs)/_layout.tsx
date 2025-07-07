import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSvg } from '@/components/ui/IconPng';
import { TabBarContainer } from '@/components/ui/StyledTabBar';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: () => <TabBarContainer />,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="chart"
        options={{
          title: '기록',
          tabBarIcon: () => <IconSvg name="record" />,
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: '홈',
          tabBarIcon: () => <IconSvg name="home" />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: '프로필',
          tabBarIcon: () => <IconSvg name="profile" />,
        }}
      />
    </Tabs>
  );
}
