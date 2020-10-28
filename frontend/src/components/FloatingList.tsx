import React, { forwardRef } from 'react';
import styled from 'styled-components';

import { FadeAnimation } from '~/frontkit/animations/FadeAnimation';

const FloatingListDiv = styled.div`
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
  user-select: none;
  border-radius: 4px;

  z-index: 10;
  position: relative;
  overflow: hidden; // necessary to avoid broken corners when items are hovered
  background-color: white;
  cursor: pointer;

  ${FadeAnimation.css}
`;

interface Props {
  expanded: boolean;
  style: React.CSSProperties; // usually used for popper
  attributes: { [key: string]: string }; // for popper
  ref: React.Dispatch<React.SetStateAction<HTMLDivElement | null>>;
}

const FloatingList: React.ForwardRefRenderFunction<
  HTMLDivElement,
  React.PropsWithChildren<Props>
> = ({ children, expanded, style, attributes }, ref) => (
  <FadeAnimation show={expanded}>
    <FloatingListDiv ref={ref} style={style} {...attributes}>
      {children}
    </FloatingListDiv>
  </FadeAnimation>
);

export default forwardRef(FloatingList);
