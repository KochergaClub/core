import 'tippy.js/dist/tippy.css';

import styled from 'styled-components';

import Tippy from '@tippyjs/react';

import * as colors from '../colors';
import * as fonts from '../fonts';

interface InnerProps {
  type?: 'accent' | 'default' | 'good';
}

interface Props extends InnerProps {
  hint?: string;
}

const type2color = {
  accent: colors.accent[500],
  default: colors.primary[300],
  good: colors.good[300],
};

export const InnerBadge = styled.div<Props>`
  display: inline-block;

  background-color: ${(props) => type2color[props.type || 'default']};
  border-radius: 10px;
  min-width: 20px;
  padding: 2px 8px;

  font-size: ${fonts.sizes.XS};
  white-space: nowrap;
`;

export const Badge: React.FC<Props> = ({ type, hint, children }) => {
  const inner = <InnerBadge type={type}>{children}</InnerBadge>;

  return hint ? <Tippy content={hint}>{inner}</Tippy> : inner;
};
