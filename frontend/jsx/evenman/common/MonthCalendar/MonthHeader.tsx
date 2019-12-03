import * as React from 'react';
import styled from 'styled-components';

import { colors } from '@kocherga/frontkit';

const borderColor = colors.grey[200];

export default class MonthHeader extends React.Component {
  static Container = styled.div`
    display: flex;
    width: 100%;
    & > div {
      flex: 1;
      text-align: center;
      border-top: 1px solid ${borderColor};
      font-size: 0.8em;
      letter-spacing: 0.4px;
      font-weight: bold;
    }
    & > div + div {
      border-left: 1px solid ${borderColor};
    }
  `;

  render() {
    return (
      <MonthHeader.Container>
        {['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'].map(weekday => (
          <div key={weekday}>{weekday}</div>
        ))}
      </MonthHeader.Container>
    );
  }
}
