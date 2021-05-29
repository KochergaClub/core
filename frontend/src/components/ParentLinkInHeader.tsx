import styled from 'styled-components';

import { fonts } from '~/frontkit';

const ParentLinkInHeader = styled.a`
  text-transform: uppercase;
  font-size: ${fonts.sizes.XS};
  font-weight: 700;
  letter-spacing: 0.5px;

  color: black;
  text-decoration: none;
`;

export default ParentLinkInHeader;
