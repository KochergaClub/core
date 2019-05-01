import React, { useReducer, useState } from 'react';

import moment from 'moment';

import { Column, Row } from '@kocherga/frontkit';

import Page from '../components/Page';
import { InitialLoader } from '../common/types';

import { Shift, Watchman, shifts2schedule, scheduleDispatch } from './types';

import Calendar from './components/Calendar';
import DayContainer from './components/DayContainer';
import EditingSwitch from './components/EditingSwitch';

import { ScheduleContext } from './contexts';

interface Props {
  schedule: Shift[];
  editable: boolean;
  watchmen: Watchman[];
  from_date: string;
  to_date: string;
}

const Pager = ({ from_date }: { from_date: moment.Moment }) => {
  const prev = moment(from_date).subtract(1, 'week');
  const next = moment(from_date).add(1, 'week');
  return (
    <Row gutter={16}>
      <a href={`?from_date=${prev.format('YYYY-MM-DD')}`}>&larr; назад</a>
      <a href={`/team/watchmen`}>Текущая неделя</a>
      <a href={`?from_date=${next.format('YYYY-MM-DD')}`}>вперёд &rarr;</a>
    </Row>
  );
};

export default (props: Props) => {
  const [schedule, setShift] = useReducer(
    scheduleDispatch,
    props.schedule,
    shifts2schedule
  );
  const [editing, setEditing] = useState(false);

  const contextValue = {
    watchmen: props.watchmen,
    editing,
    setEditing,
    setShift,
  };

  return (
    <ScheduleContext.Provider value={contextValue}>
      <Page title="Расписание смен" team>
        <Column gutter={16} stretch>
          <Column centered gutter={0}>
            <h1>Расписание смен</h1>
            <Column centered>
              <Pager from_date={moment(props.from_date)} />
              {props.editable && <EditingSwitch />}
            </Column>
          </Column>
          <Calendar
            fromDate={moment(props.from_date)}
            toDate={moment(props.to_date)}
            renderDay={d => {
              return (
                <DayContainer daySchedule={schedule[d.format('YYYY-MM-DD')]} />
              );
            }}
          />
        </Column>
      </Page>
    </ScheduleContext.Provider>
  );
};

export const getInitialData: InitialLoader = async (api, params, query) => {
  const from_date_str = query.from_date;
  let from_date: moment.Moment;
  if (from_date_str) {
    from_date = moment(from_date_str);
  } else {
    from_date = moment().startOf('week');
  }
  const to_date = moment(from_date).add(4, 'weeks');

  const format = 'YYYY-MM-DD';

  return {
    schedule: await api.call(
      `watchmen/schedule?from_date=${from_date.format(
        format
      )}&to_date=${to_date.format(format)}`,
      'GET'
    ),
    editable: true, // FIXME: request.user.has_perm('watchmen.manage'),
    from_date: from_date.format('YYYY-MM-DD'),
    to_date: to_date.format('YYYY-MM-DD'),
    watchmen: await api.call('staff/member', 'GET'), // TODO - reorder - [watchman] + [non-watchman], current only
  };
};
