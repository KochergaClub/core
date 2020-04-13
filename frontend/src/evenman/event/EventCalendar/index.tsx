import { useState, useCallback, useReducer } from 'react';

import moment from 'moment';
import { addWeeks, startOfDay, isEqual, format } from 'date-fns';

import { Column } from '@kocherga/frontkit';

import { useListeningWebSocket } from '~/common/hooks';

import MonthCalendar from '../../common/MonthCalendar';

import CalendarCellHeader from './CalendarCellHeader';
import CalendarCell from './CalendarCell';

import FiltersBar from './FiltersBar';
import Toolbar from './Toolbar';

import { useEvenmanEventsQuery } from '../queries.generated';

import { reducer } from './filters';

interface Props {
  selected_id?: string;
}

const WEEKS = 3;

const EventCalendar: React.FC<Props> = ({ selected_id }) => {
  // FIXME - pass from above
  const [start, setStart] = useState(() => new Date());
  const [end, setEnd] = useState(() => addWeeks(new Date(), WEEKS));

  const [filters, dispatch] = useReducer(reducer, {
    eventType: undefined,
    hideAnnounced: false,
    hideUnpublished: false,
  });

  const setDate = useCallback((newDate: Date) => {
    setStart(newDate);
    setEnd(addWeeks(newDate, WEEKS));
  }, []);

  const queryResults = useEvenmanEventsQuery({
    variables: {
      start: format(start, 'yyyy-MM-dd'),
      end: format(end, 'yyyy-MM-dd'),
    },
  });

  // TODO - use graphql subscription instead
  useListeningWebSocket('ws/events/', () => {
    queryResults.refetch();
  });

  const renderCell = useCallback(
    (date: moment.Moment) => {
      const events =
        queryResults.data?.events?.nodes.filter(event =>
          isEqual(startOfDay(new Date(event.start)), startOfDay(date.toDate()))
        ) || [];
      return <CalendarCell events={events} selected_id={selected_id} />;
    },
    [selected_id, queryResults.data]
  );

  const renderHeader = useCallback((date: moment.Moment) => {
    return <CalendarCellHeader date={date.toDate()} />;
  }, []);

  return (
    <Column stretch>
      <FiltersBar filters={filters} dispatch={dispatch} />
      <Toolbar date={start} setDate={setDate} />
      <MonthCalendar
        date={moment(start)}
        renderCell={renderCell}
        renderHeader={renderHeader}
        weeks={WEEKS}
      />
    </Column>
  );
};

export default EventCalendar;
