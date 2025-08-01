import styled from 'styled-components/native';

export interface BubblePosition {
  bottom?: number;
  right?: number;
  left?: number;
  top?: number;
}

export const BubbleContainer = styled.View<{ position: BubblePosition; theme?: string }>`
  position: absolute;
  ${props => props.position.bottom !== undefined && `bottom: ${props.position.bottom}px;`}
  ${props => props.position.right !== undefined && `right: ${props.position.right}px;`}
  ${props => props.position.left !== undefined && `left: ${props.position.left}px;`}
  ${props => props.position.top !== undefined && `top: ${props.position.top}px;`}
  background-color: ${props => props.theme === 'home' ? '#9ED2F9D9' : '#61727ED9'};
  padding-horizontal: 10px;
  padding-vertical: 8px;
  border-radius: 20px;
  max-width: 200px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 4px;
  elevation: 5;
  z-index: 10;
`;

export const BubbleText = styled.Text<{ theme?: string }>`
  color: ${props => props.theme === 'home' ? '#000000' : '#FFFFFF'};
  font-size: 14px;
  font-family: 'Pretendard';
  text-align: center;
`;

export const BubbleTail = styled.View<{ theme?: string }>`
  position: absolute;
  bottom: -8px;
  right: 20px;
  width: 0;
  height: 0;
  border-left-width: 8px;
  border-right-width: 8px;
  border-top-width: 8px;
  border-left-color: transparent;
  border-right-color: transparent;
  border-top-color: ${props => props.theme === 'home' ? '#9ED2F9D9' : '#61727ED9'};
`;
