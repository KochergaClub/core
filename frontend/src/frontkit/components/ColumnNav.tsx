import { AnimateSharedLayout, motion } from 'framer-motion';
import * as React from 'react';
import styled from 'styled-components';

import * as colors from '../colors';
import * as fonts from '../fonts';

const Li = styled.li<{ selected?: boolean }>`
  position: relative;
`;

const LiInner = styled.div`
  padding: 8px 10px;
  cursor: pointer;
  font-size: ${fonts.sizes.XS};
  position: relative;
  z-index: 1;
`;

const Highlight = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background-color: ${colors.highlight};
`;

interface ItemProps {
  selected?: boolean;
  select: () => void;
}

const ColumnNavItem: React.FC<ItemProps> = ({ selected, select, children }) => {
  return (
    <Li selected={selected} onClick={select}>
      <LiInner>{children}</LiInner>
      {selected && <Highlight layoutId="highlight" />}
    </Li>
  );
};

const Ul = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  position: relative;
`;

interface IListProps {
  children: React.ReactNode;
}

export const ColumnNav = (({ children }: IListProps) => (
  <nav>
    <AnimateSharedLayout>
      <Ul>{children}</Ul>
    </AnimateSharedLayout>
  </nav>
)) as React.FC & { Item: React.FC<ItemProps> };

ColumnNav.Item = ColumnNavItem;
