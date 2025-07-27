import React from 'react';
import { Image, ImageStyle } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import ChartIcon from '@/assets/icons/chartIcon.png';
import NavBarMory from '@/assets/icons/navBarMory.png';
import UserIcon from '@/assets/icons/userIcon.png';

type IconSvgProps = {
  name: 'home' | 'record' | 'profile';
  size?: number;
  color?: string; // color prop 추가
};

export function IconSvg({ name, size = 28, color = 'white' }: IconSvgProps) {
  if (name === 'home') {
    return <MaterialCommunityIcons name="star" size={size} color={color} />;
  }

  let source;
  switch (name) {
    case 'record':
      source = ChartIcon;
      break;
    case 'profile':
      source = UserIcon;
      break;
    default:
      return null;
  }
  return (
    <Image
      source={source}
      style={{ width: size, height: size } as ImageStyle}
      tintColor={color} // tintColor 적용
      resizeMode="contain"
    />
  );
}
