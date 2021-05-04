import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import styled from 'styled-components';

import { colors, fonts } from '~/frontkit';

const NavListUl = styled.ul`
  border-bottom: 1px solid ${colors.grey[300]};
  background-color: white;
  list-style-type: none;
  padding: 0;
  margin: 0;
  position: relative;

  & > li {
    padding: 4px 16px;
    font-size: ${fonts.sizes.XS};
    border-top: 1px solid ${colors.grey[300]};
  }
`;

const Header = styled.header`
  padding: 4px 16px;
  color: ${colors.grey[700]};
`;

interface ListProps {
  title?: string;
}

export const NavList: React.FC<ListProps> = ({ children, title }) => (
  <nav>
    {title && <Header>{title}</Header>}
    <NavListUl>
      <AnimatePresence initial={false}>{children}</AnimatePresence>
    </NavListUl>
  </nav>
);

interface ItemProps {
  selected?: boolean;
  blur?: boolean;
  select: () => void;
}

const NavListItemLi = styled(motion.li)<Omit<ItemProps, 'select'>>`
  cursor: pointer;

  background-color: ${(props) =>
    props.selected ? '#ffffb3' : props.blur ? '#f0f0f0' : 'white'};

  &:hover {
    background-color: ${(props) =>
      props.selected ? '#ffffb3' : props.blur ? '#e8e8e8' : '#e8e8e8'};
  }
`;

export const NavListItem: React.FC<ItemProps> = ({ select, ...rest }) => {
  return (
    <NavListItemLi
      onClick={() => select()}
      {...rest}
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    />
  );
};
