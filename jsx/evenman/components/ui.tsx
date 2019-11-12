import * as Select from 'react-select';

import styled from 'styled-components';

import { colors, RichText } from '@kocherga/frontkit';

export { default as Checkbox } from './Checkbox';
export { default as UpdatingOverlay } from './UpdatingOverlay';
export { default as LoadingOverlay } from './LoadingOverlay';

export const Header = styled.header`
  font-size: 1.2rem;
  text-align: center;
  margin: 12px 0;
  padding: 2px 8px;
  background-color: ${colors.primary[100]};
`;

export const IconLink = styled.a`
  color: ${colors.grey[700]};
  font-size: 0.9em;
  text-decoration: none;
  &:hover {
    color: black;
  }
`;

export const ReactSelect = styled(Select.default)`
  flex: 1;
`;

export const ReactSelectCreatable = styled(Select.Creatable)`
  flex: 1;
`;

export const UserText = styled(RichText)`
  font-family: 'Courier New', Courier, monospace;
`;

export const UserSpan = styled.span`
  font-family: 'Courier New', Courier, monospace;
`;

export const MutedSpan = styled.span`
  color: ${colors.grey[700]};
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
