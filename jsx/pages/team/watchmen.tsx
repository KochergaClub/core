import React, { useCallback } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { addWeeks, startOfWeek } from 'date-fns';

import { Column } from '@kocherga/frontkit';

import Page from '~/components/Page';
import { useListeningWebSocket, usePermissions } from '~/common/hooks';
import { NextPage } from '~/common/types';

import { loadWatchmen } from '~/watchmen/actions';

import { reloadSchedule, setDatesWindow } from '~/watchmen/actions';
import { selectDatesWindow } from '~/watchmen/selectors';

import Calendar from '~/watchmen/components/Calendar';
import DayContainer from '~/watchmen/components/DayContainer';
import EditingSwitch from '~/watchmen/components/EditingSwitch';
import Pager from '~/watchmen/components/Pager';

interface Props {}

const WatchmenIndexPage: NextPage<Props> = () => {
  const [editable] = usePermissions(['watchmen.manage']);

  const [from_date, to_date] = useSelector(selectDatesWindow);
  const dispatch = useDispatch();

  const fetchSchedule = useCallback(async () => {
    await dispatch(reloadSchedule(from_date, to_date));
  }, [from_date, to_date, dispatch, reloadSchedule]);

  useListeningWebSocket('ws/watchmen-schedule/', fetchSchedule);

  return (
    <Page title="Расписание смен" team>
      <Page.Title>Расписание смен</Page.Title>
      <Page.Main>
        <Column gutter={16} stretch>
          <Column centered gutter={0}>
            <Column centered>
              <Pager from_date={from_date} />
              {editable && <EditingSwitch />}
            </Column>
          </Column>
          <Calendar
            fromDate={from_date}
            toDate={to_date}
            renderDay={d => {
              return <DayContainer date={d} />;
            }}
          />
        </Column>
      </Page.Main>
    </Page>
  );
};

WatchmenIndexPage.getInitialProps = async ({ query, store }) => {
  const { dispatch } = store;

  let from_date: Date;
  if (typeof query.from_date === 'string') {
    const match = query.from_date.match(/^\d{4}-\d{2}-\d{2}$/);
    if (!match) {
      throw new Error('Invalid from_date query param');
    }
    from_date = startOfWeek(new Date(match[0]), { weekStartsOn: 1 });
  } else {
    from_date = startOfWeek(new Date(), { weekStartsOn: 1 });
  }
  const to_date = addWeeks(from_date, 4);

  await dispatch(loadWatchmen());

  await dispatch(reloadSchedule(from_date, to_date));

  dispatch(setDatesWindow(from_date, to_date));

  return {};
};

export default WatchmenIndexPage;
