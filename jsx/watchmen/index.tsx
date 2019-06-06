import React, { useCallback, useReducer, useState } from 'react';

import moment from 'moment';

import { A, Column, Row } from '@kocherga/frontkit';

import { Screen, InitialLoader } from '~/common/types';
import Page from '~/components/Page';
import { useListeningWebSocket, useAPI } from '~/common/hooks';
import { API } from '~/common/api';

import { StaffContext } from '~/staff/contexts';

import { Shift, StaffMember, shifts2schedule, scheduleReducer } from './types';

import Calendar from './components/Calendar';
import DayContainer from './components/DayContainer';
import EditingSwitch from './components/EditingSwitch';

import { ScheduleContext } from './contexts';

const loadSchedule = async (api: API, from_date: string, to_date: string) => {
  return (await api.call(
    `watchmen/schedule?from_date=${from_date}&to_date=${to_date}`,
    'GET'
  )) as Shift[];
};

interface Props {
  schedule: Shift[];
  editable: boolean;
  watchmen: StaffMember[];
  from_date: string;
  to_date: string;
  children?: React.ReactNode;
}

const Pager = ({ from_date }: { from_date: moment.Moment }) => {
  const prev = moment(from_date).subtract(1, 'week');
  const next = moment(from_date).add(1, 'week');
  return (
    <Row gutter={16}>
      <A href={`?from_date=${prev.format('YYYY-MM-DD')}`}>&larr; назад</A>
      <A href={`/team/watchmen`}>Текущая неделя</A>
      <A href={`?from_date=${next.format('YYYY-MM-DD')}`}>вперёд &rarr;</A>
    </Row>
  );
};

const WatchmenIndexPage = (props: Props) => {
  const [schedule, scheduleDispatch] = useReducer(
    scheduleReducer,
    props.schedule,
    shifts2schedule
  );
  const [editing, setEditing] = useState(false);

  const api = useAPI();

  const setShift = useCallback((shift: Shift) => {
    scheduleDispatch({
      type: 'UPDATE_SHIFT',
      payload: { shift },
    });
  }, []);

  const fetchSchedule = useCallback(async () => {
    const shifts = await loadSchedule(api, props.from_date, props.to_date);
    scheduleDispatch({
      type: 'REPLACE_SCHEDULE',
      payload: {
        schedule: shifts2schedule(shifts),
      },
    });
  }, [api, props.from_date, props.to_date]);

  useListeningWebSocket('ws/watchmen-schedule/', fetchSchedule);

  const contextValue = {
    editing,
    setEditing,
    setShift,
  };

  return (
    <ScheduleContext.Provider value={contextValue}>
      <StaffContext.Provider value={{ members: props.watchmen }}>
        <Page title="Расписание смен" team>
          <Page.Title>Расписание смен</Page.Title>
          <Page.Main>
            <Column gutter={16} stretch>
              <Column centered gutter={0}>
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
                    <DayContainer
                      daySchedule={schedule[d.format('YYYY-MM-DD')]}
                    />
                  );
                }}
              />
            </Column>
          </Page.Main>
        </Page>
      </StaffContext.Provider>
    </ScheduleContext.Provider>
  );
};

const getInitialData: InitialLoader<Props> = async (
  { api, user },
  { query }
) => {
  const from_date_str = query.from_date;
  let from_date: moment.Moment;
  if (from_date_str) {
    from_date = moment(from_date_str);
  } else {
    from_date = moment().startOf('week');
  }
  const to_date = moment(from_date).add(4, 'weeks');

  const format = 'YYYY-MM-DD';

  const staffMembers = (await api.call('staff/member', 'GET')) as StaffMember[];
  const watchmen = staffMembers.filter(
    member => member.is_current && member.role === 'WATCHMAN'
  );
  const otherStaff = staffMembers.filter(
    member => member.is_current && member.role !== 'WATCHMAN'
  );

  return {
    schedule: await loadSchedule(
      api,
      from_date.format(format),
      to_date.format(format)
    ),
    editable: user.permissions.indexOf('watchmen.manage') !== -1,
    from_date: from_date.format('YYYY-MM-DD'),
    to_date: to_date.format('YYYY-MM-DD'),
    watchmen: watchmen.concat(otherStaff),
  };
};

const screen: Screen<Props> = {
  component: WatchmenIndexPage,
  getInitialData,
};
export default screen;
