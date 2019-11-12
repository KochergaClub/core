import * as React from 'react';
import styled from 'styled-components';

import moment from 'moment';

import useResizeAware from 'react-resize-aware';

import { colors } from '@kocherga/frontkit';

const borderColor = colors.grey[200];

const weekMoments = (firstDay: moment.Moment) => [
  firstDay,
  moment(firstDay).add(1, 'day'),
  moment(firstDay).add(2, 'day'),
  moment(firstDay).add(3, 'day'),
  moment(firstDay).add(4, 'day'),
  moment(firstDay).add(5, 'day'),
  moment(firstDay).add(6, 'day'),
];

const Container = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(7, 1fr);

  & > div + div {
    border-left: 1px solid ${borderColor};
  }
`;

const Cell = styled.div<{ today: boolean }>`
  overflow: hidden;
  border-bottom: 1px solid ${borderColor};

  .CalendarCell--OnHover {
    visibility: hidden;
  }
  &:hover {
    .CalendarCell--OnHover {
      visibility: visible;
    }
  }

  & > header {
    text-align: right;
    background-color: ${props =>
      props.today ? colors.grey[700] : colors.grey[400]};
    font-weight: ${props => (props.today ? 'bold' : 'normal')};
    padding: 2px 4px;
    color: white;
    font-size: 0.8em;
  }

  & > div {
    overflow: hidden;
    white-space: nowrap;
  }
`;

interface Props {
  firstDay: moment.Moment;
  renderCell: (date: moment.Moment) => React.ReactNode;
  renderHeader?: (date: moment.Moment) => React.ReactNode;
  setHeight: (date: moment.Moment, height: number) => void;
}

const Week: React.FC<Props> = ({
  firstDay,
  renderCell,
  renderHeader,
  setHeight,
}) => {
  const [resizeListener, sizes] = useResizeAware();

  React.useEffect(
    () => {
      console.log(firstDay);
      console.log(sizes);
      setHeight(firstDay, sizes.height);
    },
    [firstDay, sizes.height]
  );

  return (
    <Container>
      {resizeListener}
      {weekMoments(firstDay).map((day, i) => {
        const today = moment(day)
          .startOf('day')
          .isSame(moment().startOf('day'));
        return (
          <Cell key={i} today={today}>
            <header>
              {renderHeader ? renderHeader(day) : day.format('D MMMM')}
            </header>
            <div>{renderCell(day)}</div>
          </Cell>
        );
      })}
    </Container>
  );
};

export default Week;
