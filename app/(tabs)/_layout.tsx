import { Tabs } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

import NavBar from '@/components/navBar/NavBar';
import { IconSvg } from '@/components/ui/IconSvg';
import { Colors } from '@/constants/Colors';

export default function TabLayout() {
  return (
    <View style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors.yellow,
          headerShown: false,
          tabBarStyle: { display: 'none' }, // 기본 탭바 숨김
        }}>
        <Tabs.Screen
          name="chart"
          options={{
            title: '기록',
            tabBarIcon: ({ color }) => <IconSvg name="record" />,
            }}
          />
        <Tabs.Screen
          name="index"
          options={{
            title: '홈',
            tabBarIcon: ({ color }) => <IconSvg name="home" />,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: '프로필',
            tabBarIcon: ({ color }) => <IconSvg name="profile" />,
          }}
        />
      </Tabs>
      <NavBar />
    </View>
  );
}