import styled from 'styled-components';

import { colors } from '~/frontkit';

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
  text-decoration: none;
  &:hover {
    color: black;
  }
`;

export const UserText: React.FC = ({ children }) => (
  <div className="font-mono">{children}</div>
);

export const UserSpan: React.FC = ({ children }) => (
  <span className="font-mono">{children}</span>
);

export const MutedSpan: React.FC = ({ children }) => (
  <span className="text-gray-400">{children}</span>
);

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
