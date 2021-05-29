import styled from 'styled-components';

import { colors, RichText } from '~/frontkit';

export const Header = styled.header`
  font-weight: bold;
  color: ${colors.grey[500]};
  margin-top: 20px;
  margin-bottom: 12px;
  padding: 4px 0;
  border-bottom: 2px solid ${colors.grey[200]};
`;

export const IconLink = styled.a`
  display: flex; // helps with vertical positioning
  color: ${colors.grey[400]};
  /* font-size: 0.9em; */
  text-decoration: none;
  &:hover {
    color: black;
  }
`;

export const UserText = styled(RichText)`
  font-family: 'Courier New', Courier, monospace;
`;

export const UserSpan = styled.span`
  font-family: 'Courier New', Courier, monospace;
`;

export const MutedSpan = styled.span`
  color: ${colors.grey[600]};
`;

export const NumberBadge = styled.div`
  background-color: ${colors.primary[300]};
  border-radius: 50%;
  font-size: 12px;
  min-width: 19px;
  height: 19px;
  line-height: 19px;
  text-align: center;
  vertical-align: middle;
`;
