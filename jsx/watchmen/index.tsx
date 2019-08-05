import React, { useCallback } from 'react';

import { connect } from 'react-redux';

import moment from 'moment';

import { Column } from '@kocherga/frontkit';

import { Screen, InitialLoader } from '~/common/types';
import { State } from '~/redux/store';

import Page from '~/components/Page';
import { useListeningWebSocket, useAPI } from '~/common/hooks';
import { API } from '~/common/api';

import { getMembers } from '~/staff/api';
import { replaceMembers } from '~/staff/actions';

import { reloadSchedule } from './actions';

import Calendar from './components/Calendar';
import DayContainer from './components/DayContainer';
import EditingSwitch from './components/EditingSwitch';
import Pager from './components/Pager';

interface StateProps {
  editable: boolean;
  from_date: string;
  to_date: string;
}

interface DispatchProps {
  reloadSchedule: (
    api: API,
    from_date: string,
    to_date: string
  ) => Promise<void>;
}

const WatchmenIndexPage: React.FC<StateProps & DispatchProps> = props => {
  const api = useAPI();

  const fetchSchedule = useCallback(async () => {
    await props.reloadSchedule(api, props.from_date, props.to_date);
  }, [api, props.from_date, props.to_date, props.reloadSchedule]);

  useListeningWebSocket('ws/watchmen-schedule/', fetchSchedule);

  return (
    <Page title="Расписание смен" team>
      <Page.Title>Расписание смен</Page.Title>
      <Page.Main>
        <Column gutter={16} stretch>
          <Column centered gutter={0}>
            <Column centered>
              <Pager from_date={new Date(props.from_date)} />
              {props.editable && <EditingSwitch />}
            </Column>
          </Column>
          <Calendar
            fromDate={new Date(props.from_date)}
            toDate={new Date(props.to_date)}
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
  schedule: state.watchmen.schedule,
});

const mapDispatchToProps = { reloadSchedule };

const ConnectedPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(WatchmenIndexPage);

const getInitialData: InitialLoader<StateProps> = async (
  { api, user, store: { dispatch } },
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

  const allMembers = watchmen.concat(otherStaff);

  // FIXME - this replaces the global staff members list, that's not a good idea.
  dispatch(replaceMembers(allMembers));

  await dispatch(
    reloadSchedule(api, from_date.format(format), to_date.format(format))
  );

  return {
    editable: user.permissions.indexOf('watchmen.manage') !== -1,
    from_date: from_date.format(format),
    to_date: to_date.format(format),
  };
};

const screen: Screen<StateProps> = {
  component: ConnectedPage,
  getInitialData,
};
export default screen;
