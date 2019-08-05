import React, { useCallback, useReducer, useState } from 'react';

import moment from 'moment';

import { Column } from '@kocherga/frontkit';

import { Screen, InitialLoader } from '~/common/types';
import Page from '~/components/Page';
import { useListeningWebSocket, useAPI } from '~/common/hooks';

import { StaffContext } from '~/staff/contexts';
import { getMembers } from '~/staff/api';
import { Member as StaffMember } from '~/staff/types';

import Calendar from './components/Calendar';
import DayContainer from './components/DayContainer';
import EditingSwitch from './components/EditingSwitch';
import Pager from './components/Pager';

import { Shift, shifts2schedule } from './types';
import { reducer } from './reducer';
import { updateShift, replaceSchedule } from './actions';
import { ScheduleContext } from './contexts';
import { getSchedule } from './api';

interface Props {
  schedule: Shift[];
  editable: boolean;
  watchmen: StaffMember[];
  from_date: string;
  to_date: string;
  children?: React.ReactNode;
}

const WatchmenIndexPage = (props: Props) => {
  const [schedule, scheduleDispatch] = useReducer(
    reducer,
    props.schedule,
    shifts2schedule
  );
  const [editing, setEditing] = useState(false);

  const api = useAPI();

  const setShift = useCallback((shift: Shift) => {
    scheduleDispatch(updateShift(shift));
  }, []);

  const fetchSchedule = useCallback(async () => {
    const shifts = await getSchedule(api, props.from_date, props.to_date);
    scheduleDispatch(replaceSchedule(shifts2schedule(shifts)));
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

  const staffMembers = await getMembers(api);

  const watchmen = staffMembers.filter(
    member => member.is_current && member.role === 'WATCHMAN'
  );
  const otherStaff = staffMembers.filter(
    member => member.is_current && member.role !== 'WATCHMAN'
  );

  return {
    schedule: await getSchedule(
      api,
      from_date.format(format),
      to_date.format(format)
    ),
    editable: user.permissions.indexOf('watchmen.manage') !== -1,
    from_date: from_date.format(format),
    to_date: to_date.format(format),
    watchmen: watchmen.concat(otherStaff),
  };
};

const screen: Screen<Props> = {
  component: WatchmenIndexPage,
  getInitialData,
};
export default screen;
