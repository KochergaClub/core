import React from 'react';

import { Burger } from '@kocherga/frontkit';

import { styled, kind2color } from './constants';

interface Props {
  expanded: boolean;
  setExpand: (flag: boolean) => void;
}

const MobileHeaderComponent = styled.div`
  display: none;
  @media screen and (max-width: 980px) {
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 100%;
    height: 72px;
    padding: 0 20px;

    background: ${props => kind2color[props.theme.kind]};
    color: white;
    font-size: 24px;
    font-weight: 300;
  }
`;

export default class MobileHeader extends React.Component<Props> {
  switchExpand = () => {
    this.props.setExpand(!this.props.expanded);
  };

  render() {
    return (
      <MobileHeaderComponent onClick={this.switchExpand}>
        <div>Кочерга</div>
        <Burger
          color="white"
          opened={this.props.expanded}
          flip={this.switchExpand}
        />
      </MobileHeaderComponent>
    );
  }
}
