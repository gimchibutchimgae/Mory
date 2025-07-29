/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

export const Themes = {
  primaryBackground: '#1a2a4a',
  darkPrimaryBackground: '#15253a', // 네비게이션 바를 위한 더 어두운 배경색
  secondaryBackground: '#2a3a5a',
  white: '#FFFFFF',
  black: '#000000',
  yellow: '#FFFF00',
  gray: '#808080',
  lightGray: '#AAAAAA',
  darkGray: '#555555',
  googleRed: '#DB4437',
  red: '#FF9A9A'
};

export const Theme = {
  colors: {
    primaryBackground: Themes.primaryBackground,
    darkPrimaryBackground: Themes.darkPrimaryBackground,
    secondaryBackground: Themes.secondaryBackground,
    white: Themes.white,
    black: Themes.black,
    yellow: Themes.yellow,
    gray: Themes.gray,
    lightGray: Themes.lightGray,
    darkGray: Themes.darkGray,
    googleRed: Themes.googleRed,
    red: Themes.red,
    error: 'red',
  },
  fontSizes: {
    small: 12,
    medium: 16,
    large: 20,
    xLarge: 28,
    title: 24,
    header: 28,
  },
  spacing: {
    small: 8,
    medium: 16,
    large: 24,
  },
  borderRadius: {
    small: 4,
    medium: 8,
    large: 12,
  },
};
