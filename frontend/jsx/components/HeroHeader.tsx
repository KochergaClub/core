import styled from 'styled-components';

import { deviceMediaQueries } from '@kocherga/frontkit/dist/src/sizes';
import { fonts } from '@kocherga/frontkit';

const HeroHeader = styled.h1`
  margin: 0;
  padding-top: 48px;
  padding-bottom: 48px;

  line-height: 1.2;
  font-size: ${fonts.sizes.XXL};
  font-family: Intro;

  color: white;
  text-align: center;

  ${deviceMediaQueries.mobile(`
font-size: ${fonts.sizes.L};
`)}
  ${deviceMediaQueries.tablet(`
font-size: ${fonts.sizes.XL};
`)}
`;

export default HeroHeader;
