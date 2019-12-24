import { useSelector } from 'react-redux';

import { addWeeks, startOfWeek } from 'date-fns';

import { Column } from '@kocherga/frontkit';

import Page from '~/components/Page';
import {
  useListeningWebSocket,
  usePermissions,
  useDispatch,
} from '~/common/hooks';
import { NextPage } from '~/common/types';

import { loadWatchmen } from '~/watchmen/features/watchmen';
import { reloadSchedule } from '~/watchmen/features/schedule';
import {
  setDatesWindow,
  selectDatesWindow,
} from '~/watchmen/features/datesWindow';

import Calendar from '~/watchmen/components/Calendar';
import DayContainer from '~/watchmen/components/DayContainer';
import EditingSwitch from '~/watchmen/components/EditingSwitch';
import Pager from '~/watchmen/components/Pager';

interface Props {}

const SpaceStaffShiftsPage: NextPage<Props> = () => {
  const [editable] = usePermissions(['watchmen.manage']);

  const [from_date, to_date] = useSelector(selectDatesWindow);
  const dispatch = useDispatch();

  useListeningWebSocket('ws/watchmen-schedule/', async () => {
    await dispatch(reloadSchedule(from_date, to_date));
  });

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

SpaceStaffShiftsPage.getInitialProps = async ({ query, store }) => {
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

export default SpaceStaffShiftsPage;
