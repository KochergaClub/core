import React from 'react';

import { LeftRight } from './LeftRight';

export const RightSide: React.FC = ({ children }) => {
  return (
    <LeftRight>
      <div>&nbsp;</div>
      <div>{children}</div>
    </LeftRight>
  );
};
