import React from 'react';
import styled from 'styled-components';

import { Burger } from '@kocherga/frontkit';

import { teamColor } from './constants';

interface Props {
  expanded: boolean;
  setExpand: (flag: boolean) => void;
}

export default class MobileHeader extends React.Component<Props> {
  MobileHeaderComponent = styled.div`
    display: none;
    @media screen and (max-width: 980px) {
      display: flex;
      justify-content: space-between;
      align-items: center;

      width: 100%;
      height: 72px;
      padding: 0 20px;

      background: ${props => (props.theme.team ? teamColor : 'black')};
      color: white;
      font-size: 24px;
      font-weight: 300;
    }
  `;

  switchExpand = () => {
    this.props.setExpand(!this.props.expanded);
  };

  render() {
    return (
      <this.MobileHeaderComponent onClick={this.switchExpand}>
        <div>Кочерга</div>
        <Burger
          color="white"
          opened={this.props.expanded}
          flip={this.switchExpand}
        />
      </this.MobileHeaderComponent>
    );
  }
}
