import React, { forwardRef } from 'react';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';

const animationTimeout = 250;
const animationClass = 'transition';

const FloatingListDiv = styled.div`
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
  user-select: none;
  border-radius: 4px;

  z-index: 10;
  position: relative;
  overflow: hidden; // necessary to avoid broken corners when items are hovered
  background-color: white;
  cursor: pointer;

  &.${animationClass}-enter {
    opacity: 0;
  }

  &.${animationClass}-enter-active {
    opacity: 1;
    transition: opacity ${animationTimeout}ms ease-in-out;
  }

  &.${animationClass}-exit {
    opacity: 1;
  }

  &.${animationClass}-exit-active {
    opacity: 0;
    transition: opacity ${animationTimeout}ms ease-in-out;
  }
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
  <CSSTransition
    appear={true}
    mountOnEnter={true}
    unmountOnExit={true}
    in={expanded}
    timeout={animationTimeout}
    classNames={animationClass}
  >
    <FloatingListDiv ref={ref} style={style} {...attributes}>
      {children}
    </FloatingListDiv>
  </CSSTransition>
);

export default forwardRef(FloatingList);
