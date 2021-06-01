import styled from 'styled-components';

import * as colors from '../colors';
import * as fonts from '../fonts';

export interface Props {
  scale?: 'normal' | 'big'; // not `size` because `size` is a native <input> attribute
  wide?: boolean;
}

export const Input = styled.input<Props>`
  padding: 0 ${(props) => (props.scale === 'big' ? '10px' : '6px')};
  height: ${(props) => (props.scale === 'big' ? '48px' : '32px')};
  border: 2px solid ${colors.primary[300]};
  line-height: 1;
  font-size: ${(props) =>
    props.scale === 'big' ? fonts.sizes.XL2 : fonts.sizes.BASE};

  ${(props) => (props.wide ? 'width: 100%;' : '')}

  &:focus {
    border: solid 2px ${colors.primary[500]};
    outline: none;
    background-color: ${colors.primary[100]};
  }

  &::placeholder {
    color: ${colors.grey[400]};
  }
`;
