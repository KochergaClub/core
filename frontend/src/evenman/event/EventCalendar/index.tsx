import { useState, useCallback, useReducer, useMemo } from 'react';

import { startOfWeek, addWeeks, startOfDay, isEqual, format } from 'date-fns';
import { ru } from 'date-fns/locale';

import { Column } from '@kocherga/frontkit';

import MonthCalendar from '../../common/MonthCalendar';

import CalendarCellHeader from './CalendarCellHeader';
import CalendarCell from './CalendarCell';

import FiltersBar from './FiltersBar';
import Toolbar from './Toolbar';

import {
  useEvenmanEventsQuery,
  useOnEventsSubscription,
  EvenmanEventDocument,
} from '../queries.generated';

import { reducer } from './filters';

interface Props {
  selected_id?: string;
}

const WEEKS = 3;

const EventCalendar: React.FC<Props> = ({ selected_id }) => {
  // FIXME - pass from above
  const [start, setStart] = useState(() =>
    startOfWeek(new Date(), { locale: ru })
  );
  const end = useMemo(() => addWeeks(start, WEEKS), [start]);

  const [filters, dispatch] = useReducer(reducer, {
    eventType: undefined,
    hideAnnounced: false,
  });

  const setDate = useCallback((newDate: Date) => {
    setStart(newDate);
  }, []);

  const queryResults = useEvenmanEventsQuery({
    variables: {
      start: format(start, 'yyyy-MM-dd'),
      end: format(end, 'yyyy-MM-dd'),
    },
  });

  useOnEventsSubscription({
    async onSubscriptionData({ client, subscriptionData }) {
      if (!subscriptionData.data) {
        return;
      }
      await client.query({
        query: EvenmanEventDocument,
        variables: {
          id: subscriptionData.data.events.id,
        },
        fetchPolicy: 'network-only',
      });
      if (subscriptionData.data.events.type === 'deleted') {
        await queryResults.refetch();
      }
    },
  });

  const rawEvents = queryResults.data?.events?.nodes;

  const filteredEvents = useMemo(
    () =>
      rawEvents
        ? rawEvents.filter(
            event =>
              (filters.eventType === undefined ||
                filters.eventType === event.event_type) &&
              (!filters.hideAnnounced ||
                (event.published &&
                  event.announcements.fb.link &&
                  event.announcements.vk.link &&
                  event.announcements.timepad.link))
          )
        : [],
    [rawEvents, filters]
  );

  const renderCell = useCallback(
    (date: Date) => {
      const dayEvents =
        filteredEvents.filter(event =>
          isEqual(startOfDay(new Date(event.start)), startOfDay(date))
        ) || [];
      return <CalendarCell events={dayEvents} selected_id={selected_id} />;
    },
    [selected_id, filteredEvents]
  );

  const renderHeader = useCallback((date: Date) => {
    return <CalendarCellHeader date={date} />;
  }, []);

  return (
    <Column stretch>
      <FiltersBar filters={filters} dispatch={dispatch} />
      <Toolbar date={start} setDate={setDate} />
      <MonthCalendar
        date={start}
        renderCell={renderCell}
        renderHeader={renderHeader}
        weeks={WEEKS}
      />
    </Column>
  );
};

export default EventCalendar;