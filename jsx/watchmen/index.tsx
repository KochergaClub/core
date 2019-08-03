import React, { useEffect, useCallback } from 'react';

import { useDispatch } from 'react-redux';

import moment from 'moment';

import { Column } from '@kocherga/frontkit';

import { Screen, InitialLoader } from '~/common/types';
import Page from '~/components/Page';
import { useListeningWebSocket, useAPI } from '~/common/hooks';

import { getMembers } from '~/staff/api';
import { Member as StaffMember } from '~/staff/types';
import { replaceMembers } from '~/staff/actions';

import { Shift, shifts2schedule } from './types';
import { replaceSchedule } from './actions';

import Calendar from './components/Calendar';
import DayContainer from './components/DayContainer';
import EditingSwitch from './components/EditingSwitch';
import Pager from './components/Pager';

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
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('setting initial schedule');
    dispatch(replaceSchedule(shifts2schedule(props.schedule)));
  }, [props.schedule]);

  useEffect(() => {
    dispatch(replaceMembers(props.watchmen));
  }, [props.watchmen]);

  const api = useAPI();

  const fetchSchedule = useCallback(async () => {
    const shifts = await getSchedule(api, props.from_date, props.to_date);
    const schedule = shifts2schedule(shifts);
    dispatch(replaceSchedule(schedule));
  }, [api, props.from_date, props.to_date]);

  useListeningWebSocket('ws/watchmen-schedule/', fetchSchedule);

  return (
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
              return <DayContainer date={d} />;
            }}
          />
        </Column>
      </Page.Main>
    </Page>
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
