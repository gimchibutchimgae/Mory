import { Tabs } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

import { IconSvg } from '@/components/ui/IconPng';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Themes } from '@/constants/Themes';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Themes.white,
        tabBarInactiveTintColor: Themes.gray,
        headerShown: false,
        tabBarBackground: () => <TabBarBackground />,
        tabBarStyle: {
          backgroundColor: Themes.darkPrimaryBackground,
          borderTopWidth: 0,
          elevation: 0,
          height: 100,
          paddingTop: 15,
          paddingBottom: 15,
        },
        tabBarLabelStyle: {
          fontSize: 16,
          fontWeight: 'bold',
          marginTop: 10, // 아이콘과 텍스트 사이 간격 더 주기
        },
        tabBarIconStyle: {
          // marginBottom 제거 유지
        },
      }}>
      <Tabs.Screen
        name="chart"
        options={{
          title: '기록',
          tabBarIcon: ({ color }) => <IconSvg name="record" color={color} size={35} />,
          }}
        />
      <Tabs.Screen
        name="index"
        options={{
          title: '홈',
          tabBarIcon: ({ color }) => <IconSvg name="home" color={color} size={40} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: '프로필',
          tabBarIcon: ({ color }) => <IconSvg name="profile" color={color} size={35} />,
        }}
      />
    </Tabs>
  );
}
