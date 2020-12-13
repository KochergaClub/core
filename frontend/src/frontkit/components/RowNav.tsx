import * as React from 'react';
import styled from 'styled-components';

import * as colors from '../colors';
import * as fonts from '../fonts';

const Li = styled.li<{ selected?: boolean }>`
  font-weight: bold;
  font-size: ${fonts.sizes.S};
  line-height: 20px;
  text-transform: uppercase;

  border-bottom: ${(props) =>
    props.selected ? `4px solid ${colors.grey[500]}` : 'none'};

  &:hover {
    ${(props) =>
      props.selected ? '' : `border-bottom: 4px solid ${colors.grey[300]};`};
  }
`;

interface ItemProps {
  selected?: boolean;
  select: () => void;
  children?: React.ReactNode;
}

const Item: React.FC<ItemProps> = ({ select, selected, children }) => {
  const onClick = React.useCallback(() => {
    select();
  }, [select]);
  return (
    <Li selected={selected} onClick={onClick}>
      {children}
    </Li>
  );
};

const Ul = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  position: relative;

  display: flex;
  flex-direction: row;

  & > li {
    padding: 8px 10px;
    cursor: pointer;
  }
`;

interface IListProps {
  children: React.ReactNode;
}

export const RowNav = (({ children }: IListProps) => (
  <nav>
    <Ul>{children}</Ul>
  </nav>
)) as React.FC & {
  Item: React.ComponentType<ItemProps>;
};

RowNav.Item = Item;
