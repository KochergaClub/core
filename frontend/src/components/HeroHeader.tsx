import styled from 'styled-components';

import { deviceMediaQueries, fonts } from '~/frontkit';

const HeroHeader = styled.h1`
  margin: 0;

  line-height: 1.2;
  font-size: ${fonts.sizes.XL5};
  font-family: Intro;

  color: white;

  ${deviceMediaQueries.mobile(`
    font-size: ${fonts.sizes.XL2};
  `)}
  ${deviceMediaQueries.tablet(`
    font-size: ${fonts.sizes.XL3};
  `)}
`;

export default HeroHeader;
