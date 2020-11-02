import * as React from 'react';
import styled from 'styled-components';

const BurgerContainer = styled.div<{ color: string }>`
  width: 28px;
  height: 20px;
  transform: rotate(0deg);
  transition: 0.5s ease-in-out;
  cursor: pointer;

  & > span {
    display: block;
    position: absolute;
    width: 100%;
    opacity: 1;
    left: 0;
    transform: rotate(0deg);
    transition: 0.25s ease-in-out;
    height: 3px;
    background-color: ${(props) => props.color};

    &:nth-child(1) {
      top: 0;
    }

    &:nth-child(2),
    &:nth-child(3) {
      top: 8px;
    }

    &:nth-child(4) {
      top: 16px;
    }
  }

  &.opened > span {
    &:nth-child(1) {
      top: 8px;
      width: 0%;
      left: 50%;
    }

    &:nth-child(2) {
      transform: rotate(45deg);
    }

    &:nth-child(3) {
      transform: rotate(-45deg);
    }

    &:nth-child(4) {
      top: 8px;
      width: 0%;
      left: 50%;
    }
  }
`;

export interface Props {
  opened?: boolean;
  flip: () => void;
  color?: string;
}

export const Burger: React.FC<Props> = ({ opened, flip, color }) => {
  return (
    <BurgerContainer
      className={opened ? "opened" : ""}
      color={color || "black"}
      onClick={flip}
    >
      <span />
      <span />
      <span />
      <span />
    </BurgerContainer>
  );
};
