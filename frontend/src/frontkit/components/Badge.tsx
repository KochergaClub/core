import styled from 'styled-components';

import * as colors from '../colors';
import * as fonts from '../fonts';

interface Props {
  type?: "accent" | "default";
}

export const Badge = styled.div<Props>`
  display: inline-block;

  background-color: ${(props) =>
    props.type && props.type === "accent"
      ? colors.accent[500]
      : colors.primary[300]};
  border-radius: 10px;
  min-width: 20px;
  padding: 2px 8px;

  font-size: ${fonts.sizes.XS};
  white-space: nowrap;
`;
