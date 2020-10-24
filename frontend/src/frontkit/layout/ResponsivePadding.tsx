import styled from 'styled-components';

import { deviceMediaQueries } from '../sizes';

export const ResponsivePadding = styled.div`
  ${deviceMediaQueries['mobile']("padding: 0 10px")}
  ${deviceMediaQueries['tablet']("padding: 0 20px")}
  ${deviceMediaQueries['laptop']("padding: 0 40px")}
  ${deviceMediaQueries['desktop']("padding: 0 80px")}
`;
