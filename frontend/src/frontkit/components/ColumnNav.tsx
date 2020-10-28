import * as React from 'react';
import styled from 'styled-components';

import * as colors from '../colors';
import * as fonts from '../fonts';

const Li = styled.li<{ selected?: boolean }>`
  background-color: ${(props) => (props.selected ? colors.highlight : '')};

  &:hover {
    background-color: ${(props) =>
      props.selected ? colors.highlight : colors.grey[100]};
  }
`;

interface ItemProps {
  selected?: boolean;
  blur?: boolean;
  select: () => void;
}

class ColumnNavItem extends React.Component<ItemProps> {
  constructor(props: ItemProps) {
    super(props);
    this.select = this.select.bind(this);
  }

  public render() {
    return <Li {...this.props} onClick={this.select} />;
  }

  private select() {
    this.props.select();
  }
}

const Ul = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  position: relative;

  & > li {
    padding: 8px 10px;
    cursor: pointer;
    font-size: ${fonts.sizes.XS};
  }
`;

interface IListProps {
  children: React.ReactNode;
}

export const ColumnNav = (({ children }: IListProps) => (
  <nav>
    <Ul>{children}</Ul>
  </nav>
)) as React.FC & { Item: React.ComponentClass<ItemProps> };

ColumnNav.Item = ColumnNavItem;
