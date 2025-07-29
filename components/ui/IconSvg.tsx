import React from 'react';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

type IconSvgProps = {
  name: 'home' | 'record' | 'profile';
  size?: number;
  color?: string;
};

export function IconSvg({ name, size = 28, color = '#FFFFFF' }: IconSvgProps) {
  switch (name) {
    case 'home':
      return (
        <Svg width={size} height={size} viewBox="0 0 39 37" fill="none">
          <Path
            d="M19.6433 0.123897C24.361 0.245263 27.1052 6.96804 28.3917 8.4606C29.6783 9.95317 36.9453 9.20345 38.5351 13.8496C40.1249 18.4957 34.2583 22.4816 33.4349 24.5541C32.6115 26.6266 35.0677 33.4478 31.3191 36.0582C27.5098 38.7109 21.6503 33.8826 19.6433 33.831C17.6363 33.7793 12.6564 38.7999 7.96754 36.0582C3.27868 33.3165 5.85172 24.5541 5.85172 24.5541C5.85172 24.5541 -1.9189 18.8558 0.751517 13.8496C3.42194 8.84341 7.96754 10.159 10.4318 8.4606C12.896 6.76219 14.7931 -0.000878446 19.6433 0.123897Z"
            fill={color}
          />
          <Path
            d="M10.9995 15.5605C11.2829 16.7952 12.1596 17.5786 13.4182 17.7219C14.7061 17.8685 15.8239 17.0018 16.3515 15.8179"
            stroke="#00233F"
            strokeLinecap="round"
          />
          <Path
            d="M18.616 17.7219C18.7304 18.1888 19.0845 18.485 19.5927 18.5392C20.1128 18.5946 20.5643 18.2669 20.7773 17.8192"
            stroke="#00233F"
            strokeWidth="0.5"
            strokeLinecap="round"
          />
          <Path
            d="M22.8357 15.5605C23.119 16.7952 23.9958 17.5786 25.2544 17.7219C26.5423 17.8685 27.6601 17.0018 28.1877 15.8179"
            stroke="#00233F"
            strokeLinecap="round"
          />
        </Svg>
      );
    
    case 'record':
      return (
        <Svg width={size} height={size} viewBox="0 0 28 25" fill="none">
          <Circle cx="3.5" cy="15.5" r="3.5" fill={color} />
          <Circle cx="14.5" cy="21.5" r="3.5" fill={color} />
          <Circle cx="14.5" cy="9.5" r="3.5" fill={color} />
          <Circle cx="3.5" cy="21.5" r="3.5" fill={color} />
          <Circle cx="24.5" cy="21.5" r="3.5" fill={color} />
          <Circle cx="24.5" cy="3.5" r="3.5" fill={color} />
          <Rect x="0" y="15" width="7" height="7" fill={color} />
          <Rect x="11" y="9" width="7" height="13" fill={color} />
          <Rect x="21" y="3" width="7" height="19" fill={color} />
        </Svg>
      );
    
    case 'profile':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 25" fill="none">
          <Circle cx="12.5" cy="5.75" r="5.5" fill={color} />
          <Path
            d="M12 15.25C6.4 15.25 0 17.75 0 20.25V23.75C0 24.55 1 24.75 1.5 24.75H23C23.8 24.75 24 24.0833 24 23.75V20.25C24 17.75 17.6 15.25 12 15.25Z"
            fill={color}
          />
        </Svg>
      );
    
    default:
      return null;
  }
}
