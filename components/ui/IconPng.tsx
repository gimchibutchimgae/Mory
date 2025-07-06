import React from 'react';
import { Image, ImageStyle } from 'react-native';

import ChartIcon from '@/assets/icons/chartIcon.png';
import NavBarMory from '@/assets/icons/navBarMory.png';
import UserIcon from '@/assets/icons/userIcon.png';

type IconSvgProps = {
  name: 'home' | 'record' | 'profile';
  size?: number;
};

export function IconSvg({ name, size = 28 }: IconSvgProps) {
  let source;
  switch (name) {
    case 'home':
      source = NavBarMory;
      break;
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
      resizeMode="contain"
    />
  );
}