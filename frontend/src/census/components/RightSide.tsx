import React, { useContext } from 'react';

import { MainContext } from '../contexts';
import { LeftRight } from './LeftRight';

interface Props {
  stretchOnMobile?: boolean;
}

export const RightSide: React.FC<Props> = ({ stretchOnMobile, children }) => {
  const { rightSideWidth } = useContext(MainContext);
  if (stretchOnMobile && rightSideWidth && rightSideWidth < 300) {
    return <div>{children}</div>;
  }
  return (
    <LeftRight>
      <div>&nbsp;</div>
      <div>{children}</div>
    </LeftRight>
  );
};
