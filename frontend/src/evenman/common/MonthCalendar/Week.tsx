import { useEffect } from 'react';
import styled from 'styled-components';

import { addDays, isEqual, startOfDay } from 'date-fns';

import useResizeAware from 'react-resize-aware';

import { colors } from '@kocherga/frontkit';
import { formatDate } from '~/common/utils';

const borderColor = colors.grey[200];

const weekDates = (firstDay: Date) => [
  firstDay,
  addDays(firstDay, 1),
  addDays(firstDay, 2),
  addDays(firstDay, 3),
  addDays(firstDay, 4),
  addDays(firstDay, 5),
  addDays(firstDay, 6),
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
  firstDay: Date;
  renderCell: (date: Date) => React.ReactNode;
  renderHeader?: (date: Date) => React.ReactNode;
  setHeight: (date: Date, height: number) => void;
}

const Week: React.FC<Props> = ({
  firstDay,
  renderCell,
  renderHeader,
  setHeight,
}) => {
  const [resizeListener, sizes] = useResizeAware();

  useEffect(() => {
    setHeight(firstDay, sizes.height);
  }, [firstDay, sizes.height, setHeight]);

  return (
    <Container>
      {resizeListener}
      {weekDates(firstDay).map((day, i) => {
        const today = isEqual(day, startOfDay(new Date()));

        return (
          <Cell key={i} today={today}>
            <header>
              {renderHeader ? renderHeader(day) : formatDate(day, 'd MMMM')}
            </header>
            <div>{renderCell(day)}</div>
          </Cell>
        );
      })}
    </Container>
  );
};

export default Week;
