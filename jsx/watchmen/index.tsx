import * as React from 'react';

import moment from 'moment';
import 'moment/locale/ru';

import styled from 'styled-components';

import Page from '../components/Page';

import Calendar from './Calendar';

interface ScheduleItem {
  date: string;
  shift: string;
  watchman: string;
}

const SHIFTS = ['MORNING', 'MIDDAY', 'EVENING', 'NIGHT'];

type DaySchedule = { [s: string]: ScheduleItem };

class Schedule {
  items: ScheduleItem[];

  constructor(items: ScheduleItem[]) {
    this.items = items;
  }

  itemsByDate(d: moment.Moment): DaySchedule {
    const items = {};
    this.items.filter(
      item => moment(item.date).isSame(d)
    ).forEach(
      item => {
        items[item.shift] = item;
      }
    );
    return items;
  }
}

const Item = styled.div`
  width: 100%;
  padding-left: 4px;
  height: 1.5em;
  border-bottom: 1px solid #ddd;
`;

const NightItemContainer = styled(Item)`
`;

const NightItem = () => (
  <NightItemContainer>Ночь</NightItemContainer>
);

const Cell = ({ daySchedule }: { daySchedule: DaySchedule }) => (
  <div>
    {
      SHIFTS.map(
        shift => {
          const item = daySchedule[shift];
          if (item.watchman === 'Ночь') {
            return <NightItem />;
          }
          return <Item>{item.watchman}</Item>
        }
      )
    }
  </div>
);

const CellHeaderContainer = styled.div`
`;

const CellHeader = ({ date } : { date: moment.Moment }) => (
  <CellHeaderContainer>
    {date.format('D MMMM')}
  </CellHeaderContainer>
);

export default ({ schedule: items }: { schedule: ScheduleItem[] }) => {
  const schedule = new Schedule(items);

  return (
    <Page title="Расписание смен" team>
      <h1>Расписание смен</h1>
      <div style={{height: 350}}>
        <Calendar
          date={moment().subtract(14, 'day')}
          renderHeader={d => <CellHeader date={d} />}
          renderCell={d => <Cell daySchedule={schedule.itemsByDate(d)} />}
          weeks={4}
        />
      </div>
    </Page>
  );
};
