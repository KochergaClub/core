import React from 'react';

import moment from 'moment';

import { Row } from '@kocherga/frontkit';

import Page from '../components/Page';

import Calendar from './components/Calendar';

import { ScheduleItem, Schedule, Watchman } from './types';
import DayContainer from './components/DayContainer';

import { ScheduleContext } from './contexts';

interface Props {
  schedule: ScheduleItem[];
  editable: boolean;
  watchmen: Watchman[];
  csrfToken: string;
  from_date: string;
  to_date: string;
}

const Pager = ({ from_date }: { from_date: moment.Moment }) => {
  const prev = moment(from_date).subtract(1, 'week');
  const next = moment(from_date).add(1, 'week');
  return (
    <Row>
      <a href={`?from_date=${prev.format('YYYY-MM-DD')}`}>назад</a>
      <a href={`?from_date=${next.format('YYYY-MM-DD')}`}>вперёд</a>
    </Row>
  );
};

export default (props: Props) => {
  const schedule = new Schedule(props.schedule);

  const contextValue = {
    editable: props.editable,
    watchmen: props.watchmen,
    csrfToken: props.csrfToken,
  };

  return (
    <ScheduleContext.Provider value={contextValue}>
      <Page title="Расписание смен" team>
        <h1>Расписание смен</h1>
        <Pager from_date={moment(props.from_date)} />
        <div style={{ height: 350 }}>
          <Calendar
            fromDate={moment(props.from_date)}
            toDate={moment(props.to_date)}
            renderDay={d => {
              return <DayContainer daySchedule={schedule.itemsByDate(d)} />;
            }}
          />
        </div>
      </Page>
    </ScheduleContext.Provider>
  );
};
