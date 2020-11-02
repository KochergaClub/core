import { addDays, isEqual, startOfDay } from 'date-fns';
import styled from 'styled-components';

import { formatDate } from '~/common/utils';
import { colors } from '~/frontkit';

const borderColor = colors.grey[200];

const weekDates = (firstDay: Date) =>
  Array.from(Array(7).keys()).map((delta) => addDays(firstDay, delta));

const Container = styled.div`
  position: relative;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(7, 1fr);

  & > div + div {
    border-left: 1px solid ${borderColor};
  }
`;

const Cell = styled.div<{ today: boolean }>`
  overflow: hidden;
  border-bottom: 1px solid ${borderColor};
  display: flex;
  flex-direction: column;
  height: 100%;

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
    background-color: ${(props) =>
      props.today ? colors.grey[700] : colors.grey[400]};
    font-weight: ${(props) => (props.today ? 'bold' : 'normal')};
    padding: 2px 4px;
    color: white;
    font-size: 0.8em;
  }

  & > div {
    flex: 1;
    display: flex;
    justify-content: stretch;
    align-items: stretch;
    overflow: hidden;
    white-space: nowrap;
  }
`;

interface Props {
  firstDay: Date;
  renderCell: (date: Date) => React.ReactNode;
  renderHeader?: (date: Date) => React.ReactNode;
}

const Week: React.FC<Props> = ({ firstDay, renderCell, renderHeader }) => {
  return (
    <Container>
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
