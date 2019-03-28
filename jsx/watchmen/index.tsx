import React from 'react';

import moment from 'moment';
import 'moment/locale/ru';

import Page from '../components/Page';

import Calendar from './Calendar';

import { ScheduleItem, Schedule, Watchman } from './types';
import DayContainer from './DayContainer';

import { ScheduleContext } from './contexts';

interface Props {
  schedule: ScheduleItem[];
  editable: boolean;
  watchmen: Watchman[];
  csrfToken: string;
}

export default ({ schedule: items, editable, watchmen, csrfToken }: Props) => {
  const schedule = new Schedule(items);

  const contextValue = {
    editable,
    watchmen,
    csrfToken,
  };

  return (
    <ScheduleContext.Provider value={contextValue}>
      <Page title="Расписание смен" team>
        <h1>Расписание смен</h1>
        <div style={{ height: 350 }}>
          <Calendar
            date={moment().subtract(14, 'day')}
            renderDay={d => (
              <DayContainer daySchedule={schedule.itemsByDate(d)} />
            )}
            weeks={4}
          />
        </div>
      </Page>
    </ScheduleContext.Provider>
  );
};
