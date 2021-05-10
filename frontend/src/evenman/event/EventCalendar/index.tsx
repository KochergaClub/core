import { addWeeks, format, isEqual, parseISO, startOfDay, startOfWeek } from 'date-fns';
import { ru } from 'date-fns/locale';
import { useCallback, useMemo, useReducer, useState } from 'react';

import { useQuery, useSubscription } from '@apollo/client';

import { Column } from '~/frontkit';

import { MonthCalendar } from '../../common/MonthCalendar';
import {
    EvenmanEventDocument, EvenmanEventsCalendarDocument, OnEventsDocument
} from '../queries.generated';
import { CalendarCell } from './CalendarCell';
import { CalendarCellHeader } from './CalendarCellHeader';
import { reducer } from './filters';
import FiltersBar from './FiltersBar';
import { Projection } from './projection';
import Toolbar from './Toolbar';

type Props = {
  selected_id?: string;
};

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
    setStart(startOfWeek(newDate, { locale: ru }));
  }, []);

  const queryResults = useQuery(EvenmanEventsCalendarDocument, {
    variables: {
      start: format(start, 'yyyy-MM-dd'),
      end: format(end, 'yyyy-MM-dd'),
    },
  });

  useSubscription(OnEventsDocument, {
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
      if (
        ['event.deleted', 'event.created'].includes(
          subscriptionData.data.events.type
        )
      ) {
        await queryResults.refetch();
      }
    },
  });

  const rawEvents = queryResults.data?.events?.nodes;
  const prototypes = queryResults.data?.prototypes;

  const filteredEvents = useMemo(() => {
    let result = rawEvents || [];
    if (filters.eventType) {
      result = result.filter((event) => filters.eventType === event.event_type);
    }
    if (filters.hideAnnounced) {
      result = result.filter((event) => !event.published);
    }
    return result;
  }, [rawEvents, filters]);

  const dateToProjections = useMemo(() => {
    const result: { [k: string]: Projection[] } = {};
    for (const prototype of prototypes || []) {
      for (const suggested of prototype.suggested_dates) {
        const date = parseISO(suggested);
        const dateStr = format(date, 'yyyy-MM-dd');
        if (!result[dateStr]) {
          result[dateStr] = [];
        }
        result[dateStr].push({ prototype, date });
      }
    }
    return result;
  }, [prototypes]);

  const renderCell = useCallback(
    (date: Date) => {
      const dayEvents =
        filteredEvents.filter((event) =>
          isEqual(startOfDay(parseISO(event.start)), startOfDay(date))
        ) || [];
      const dateStr = format(date, 'yyyy-MM-dd');
      const projections = dateToProjections[dateStr] || [];

      return (
        <CalendarCell
          events={dayEvents}
          projections={projections}
          selected_id={selected_id}
        />
      );
    },
    [selected_id, filteredEvents, dateToProjections]
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
