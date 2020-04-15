import styled from 'styled-components';

import FlipMove from 'react-flip-move';

const NavListUl = (styled(FlipMove)`
  border-bottom: 1px solid #d8d8d8;
  background-color: white;
  list-style-type: none;
  padding: 0;
  margin: 0;
  position: relative;

  & > li {
    padding: 3px 5px;
    font-size: 0.8rem;
    border-top: 1px solid #d8d8d8;
  }
` as any) as typeof FlipMove; // weird fix for typescript + styled + react-flip-move

const Header = styled.header`
  padding: 4px;
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
  background-color: ${props =>
    props.selected ? '#ffffb3' : props.blur ? '#f0f0f0' : ''};
  cursor: pointer;

  &:hover {
    background-color: ${props =>
      props.selected ? '#ffffb3' : props.blur ? '#e8e8e8' : '#e8e8e8'};
  }
`;

export const NavListItem: React.FC<ItemProps> = props => {
  return <NavListItemLi {...props} onClick={() => props.select()} />;
};
