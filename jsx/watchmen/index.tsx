import React from 'react';

import moment from 'moment';
import 'moment/locale/ru';

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
