import * as React from 'react';
import styled, { ThemeProvider } from 'styled-components';

import * as colors from '../colors';

export type Props = {
  size?: 'small' | 'normal' | 'big';
  small?: boolean; // deprecated

  kind?: 'primary' | 'danger' | 'default';
  primary?: boolean; // deprecated

  loading?: boolean;
  children?: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const KIND_THEMES = {
  default: {
    color: colors.primary[700],
    background: colors.primary[100],
    borderColor: colors.primary[100],
    hoverBackgroundColor: colors.primary[300],
    outlineColor: colors.primary[500],
    blur: colors.grey[800],
    stripes: {
      light: colors.primary[300],
      dark: colors.primary[100],
    },
  },
  primary: {
    color: 'white',
    background: colors.primary[500],
    hoverBackgroundColor: colors.primary[700],
    outlineColor: colors.primary[900],
    blur: colors.grey[800],
    stripes: {
      light: colors.primary[300],
      dark: colors.primary[100],
    },
  },
  danger: {
    color: 'white',
    background: colors.accent[900],
    hoverBackgroundColor: colors.accent[700],
    outlineColor: colors.accent[500],
    blur: colors.grey[800],
    stripes: {
      light: colors.accent[300],
      dark: colors.accent[100],
    },
  },
};

const SIZE_THEMES = {
  small: {
    fontSize: '12px',
    fontWeight: 500,
    padding: '0 8px',
  },
  normal: {
    fontSize: '14px',
    fontWeight: 500,
    padding: '4px 16px',
    shadow: '0 1px 2px',
  },
  big: {
    fontSize: '20px',
    fontWeight: 'bold',
    padding: '20px 32px',
  },
};

// `loading` attribute shouldn't be used with styled-components since it's passed to DOM.
// See for details:
// https://github.com/styled-components/styled-components/issues/3090
// https://styled-components.com/docs/faqs#why-am-i-getting-html-attribute-warnings
type FrameProps = Omit<Props, 'loading'> & {
  isLoading?: boolean;
};

const ButtonFrame = styled.button<FrameProps>`
  position: relative;
  z-index: 0;
  overflow: hidden;

  cursor: pointer;

  font-size: ${(props) => props.theme.fontSize};
  font-weight: ${(props) => props.theme.fontWeight};
  line-height: 24px;

  padding: ${(props) => props.theme.padding};

  color: ${(props) => props.theme.color};
  border: none;
  /* border: 2px solid ${(props) => props.theme.borderColor}; */
  background: ${(props) =>
    props.isLoading ? 'transparent' : props.theme.background};

  border-radius: 4px;

  &:hover {
    background: ${(props) =>
      props.isLoading ? 'transparent' : props.theme.hoverBackgroundColor};
  }

  &:disabled {
    color: ${colors.grey[500]};
    background: ${colors.grey[100]};
    box-shadow: inset 0 0px 2px ${(props) => props.theme.blur};
  }

  &:active {
    transform: scale(0.98);
  }

  &:focus {
    outline: solid 1px ${(props) => props.theme.outlineColor};
  }
`;

const ButtonBackground = styled.div`
  position: absolute;
  top: 0;
  left: -20px;
  right: 0;
  bottom: 0;
  z-index: -1;

  ${(props) => `box-shadow: inset 0 1px 2px ${props.theme.blur};`}

  background: linear-gradient(
      -45deg,
      ${(props) => props.theme.stripes.light} 25%,
      ${(props) => props.theme.stripes.dark} 25%,
      ${(props) => props.theme.stripes.dark} 50%,
      ${(props) => props.theme.stripes.light} 50%,
      ${(props) => props.theme.stripes.light} 75%,
      ${(props) => props.theme.stripes.dark} 75%,
      ${(props) => props.theme.stripes.dark}
    )
    0 0 / 20px 20px;

  animation: move-bg 1s linear infinite;

  @keyframes move-bg {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(20px);
    }
  }
`;

export const Button = (props: Props) => {
  if (props.primary && props.kind && props.kind !== 'primary') {
    throw new Error('props.primary is incompatible with props.theme');
  }
  if (props.small && props.size && props.size !== 'small') {
    throw new Error('props.small is incompatible with props.size');
  }

  const kindTheme = props.primary
    ? KIND_THEMES.primary
    : KIND_THEMES[props.kind || 'default'];

  const sizeTheme = props.small
    ? SIZE_THEMES.small
    : SIZE_THEMES[props.size || 'normal'];

  const theme = {
    ...kindTheme,
    ...sizeTheme,
  };

  const frameProps = { ...props, isLoading: props.loading };
  delete frameProps.loading;

  return (
    <ThemeProvider theme={theme}>
      <ButtonFrame {...frameProps}>
        {props.loading && <ButtonBackground />}
        {props.children}
      </ButtonFrame>
    </ThemeProvider>
  );
};
