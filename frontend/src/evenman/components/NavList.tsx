import React from 'react';
import FlipMove from 'react-flip-move';
import styled from 'styled-components';

import { colors, fonts } from '~/frontkit';

const NavListUl = (styled(FlipMove)`
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
` as unknown) as typeof FlipMove; // weird fix for typescript + styled + react-flip-move

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
    <NavListUl typeName="ul" enterAnimation="fade" leaveAnimation="fade">
      {children}
    </NavListUl>
  </nav>
);

interface ItemProps {
  selected?: boolean;
  blur?: boolean;
  select: () => void;
}

const NavListItemLi = styled('li')<ItemProps>`
  cursor: pointer;

  background-color: ${(props) =>
    props.selected ? '#ffffb3' : props.blur ? '#f0f0f0' : ''};

  &:hover {
    background-color: ${(props) =>
      props.selected ? '#ffffb3' : props.blur ? '#e8e8e8' : '#e8e8e8'};
  }
`;

// FlipMove fails on SFC, so we have to use React.Component here.
export class NavListItem extends React.Component<ItemProps> {
  render() {
    return (
      <NavListItemLi {...this.props} onClick={() => this.props.select()} />
    );
  }
}
