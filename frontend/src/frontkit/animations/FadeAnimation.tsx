import { CSSTransition } from 'react-transition-group';
import { css } from 'styled-components';

const animationClass = 'fade';
const animationTimeout = 250;

interface Props {
  show: boolean;
}

export const FadeAnimation: React.FC<Props> & { css: any } = ({
  show,
  children,
}) => {
  return (
    <CSSTransition
      appear={true}
      mountOnEnter={true}
      unmountOnExit={true}
      in={show}
      timeout={animationTimeout}
      classNames={animationClass}
    >
      {children}
    </CSSTransition>
  );
};

FadeAnimation.css = css`
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
