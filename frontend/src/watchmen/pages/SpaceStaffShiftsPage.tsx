import { useState } from 'react';

import { format, parseISO, addWeeks, startOfWeek } from 'date-fns';

import { Column } from '@kocherga/frontkit';

import { withApollo } from '~/apollo/client';
import { withStaff } from '~/apollo/withStaff';

import { Page, ApolloQueryResults } from '~/components';

import { useListeningWebSocket, usePermissions } from '~/common/hooks';
import { NextPage } from '~/common/types';

import { useWatchmenShiftsQuery } from '../queries.generated';

import ShiftsCalendar from '../components/ShiftsCalendar';
import EditingSwitch from '../components/EditingSwitch';
import Pager from '../components/Pager';

import { EditingContext } from '../contexts';

interface Props {
  from_date: string;
  to_date: string;
}

const SpaceStaffShiftsPage: NextPage<Props> = props => {
  const [editable] = usePermissions(['watchmen.manage']);

  const [editing, setEditing] = useState(false);

  const from_date = parseISO(props.from_date);
  const to_date = parseISO(props.to_date);

  const queryResults = useWatchmenShiftsQuery({
    variables: {
      from_date: props.from_date,
      to_date: props.to_date,
    },
  });

  useListeningWebSocket('ws/watchmen-schedule/', async () => {
    queryResults.refetch();
  });

  return (
    <Page title="Расписание смен" team>
      <Page.Title>Расписание смен</Page.Title>
      <Page.Main>
        <Column gutter={16} stretch>
          <Column centered gutter={0}>
            <Column centered>
              <Pager from_date={from_date} />
              {editable && <EditingSwitch set={setEditing} value={editing} />}
            </Column>
          </Column>
          <ApolloQueryResults {...queryResults}>
            {({ data: { shifts } }) => (
              <EditingContext.Provider value={{ editing }}>
                <ShiftsCalendar
                  shifts={shifts}
                  fromDate={from_date}
                  toDate={to_date}
                />
              </EditingContext.Provider>
            )}
          </ApolloQueryResults>
        </Column>
      </Page.Main>
    </Page>
  );
};

SpaceStaffShiftsPage.getInitialProps = async ({ query }) => {
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
  const to_date = addWeeks(from_date, 5);

  return {
    from_date: format(from_date, 'yyyy-MM-dd'),
    to_date: format(to_date, 'yyyy-MM-dd'),
  };
};

export default withApollo(withStaff(SpaceStaffShiftsPage));
