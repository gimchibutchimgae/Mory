import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { IconSvg } from '@/components/ui/IconPng';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.yellow,
        headerShown: false,
        tabBarBackground: TabBarBackground,
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
  );
}