import React from 'react';
import * as S from './style';

export interface SpeechBubbleProps {
  message: string;
  position?: {
    bottom?: number;
    right?: number;
    left?: number;
    top?: number;
  };
  theme?: 'default' | 'home';
}

const SpeechBubble = ({ 
  message, 
  position = { bottom: 110, right: 50 },
  theme = 'default'
}: SpeechBubbleProps) => (
  <S.BubbleContainer position={position} theme={theme}>
    <S.BubbleText theme={theme}>
      {message}
    </S.BubbleText>
    {/* 말풍선 꼬리 */}
    <S.BubbleTail theme={theme} />
  </S.BubbleContainer>
);

export default SpeechBubble;
