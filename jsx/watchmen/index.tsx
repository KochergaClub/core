import React, { useCallback } from 'react';

import { connect } from 'react-redux';

import { addWeeks, startOfWeek } from 'date-fns';

import { Column } from '@kocherga/frontkit';

import { Screen, InitialLoader } from '~/common/types';

import Page from '~/components/Page';
import { useListeningWebSocket, useAPI, usePermissions } from '~/common/hooks';
import { API } from '~/common/api';
import { State } from '~/redux/store';

import { getMembers } from '~/staff/api';
import { replaceMembers } from '~/staff/actions';

import { reloadSchedule, setDatesWindow } from './actions';
import { DatesWindow } from './types';
import { selectDatesWindow } from './selectors';

import Calendar from './components/Calendar';
import DayContainer from './components/DayContainer';
import EditingSwitch from './components/EditingSwitch';
import Pager from './components/Pager';

interface OwnProps {}

interface StateProps {
  dates: DatesWindow;
}

interface DispatchProps {
  reloadSchedule: (api: API, from_date: Date, to_date: Date) => Promise<void>;
}

type Props = OwnProps & StateProps & DispatchProps;

const WatchmenIndexPage: React.FC<Props> = props => {
  const api = useAPI();
  const [editable] = usePermissions(['watchmen.manage']);

  const [from_date, to_date] = props.dates;

  const fetchSchedule = useCallback(async () => {
    await props.reloadSchedule(api, from_date, to_date);
  }, [api, from_date, to_date, props.reloadSchedule]);

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

const mapStateToProps = (state: State) => ({
  dates: selectDatesWindow(state),
});

const mapDispatchToProps = { reloadSchedule };

const ConnectedPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(WatchmenIndexPage);

const getInitialData: InitialLoader<OwnProps> = async (
  { api, store: { dispatch } },
  { query }
) => {
  let from_date: Date;
  if (query.from_date) {
    const match = query.from_date.match(/^\d{4}-\d{2}-\d{2}$/);
    if (!match) {
      throw new Error('Invalid from_date query param');
    }
    from_date = startOfWeek(new Date(match[0]), { weekStartsOn: 1 });
  } else {
    from_date = startOfWeek(new Date(), { weekStartsOn: 1 });
  }
  const to_date = addWeeks(from_date, 4);

  const staffMembers = await getMembers(api);

  const watchmen = staffMembers.filter(
    member => member.is_current && member.role === 'WATCHMAN'
  );
  const otherStaff = staffMembers.filter(
    member => member.is_current && member.role !== 'WATCHMAN'
  );

  const allMembers = watchmen.concat(otherStaff);

  // FIXME - this replaces the global staff members list, that's not a good idea.
  dispatch(replaceMembers(allMembers));

  await dispatch(reloadSchedule(api, from_date, to_date));

  dispatch(setDatesWindow(from_date, to_date));

  return {};
};

const screen: Screen<OwnProps> = {
  component: ConnectedPage,
  getInitialData,
};
export default screen;
