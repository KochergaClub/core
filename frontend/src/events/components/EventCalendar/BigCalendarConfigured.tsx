import styled from 'styled-components';
import { parseISO } from 'date-fns';

import { CalendarStyle, CalendarDndStyle } from './CalendarStyle';
import Toolbar from './Toolbar';

import {
  Calendar,
  CalendarProps,
  stringOrDate,
  dateFnsLocalizer,
} from 'react-big-calendar';

// FIXME - some some reason `import { Views } from 'react-big-calendar'` imports type, not constant.
// This is a workaround.
import { views } from 'react-big-calendar/lib/utils/constants';

import { format, parse, startOfWeek, getDay } from 'date-fns';
import { ru } from 'date-fns/locale';

import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';

const DragAndDropCalendar = withDragAndDrop(Calendar);

// copied from dragAndDrop.d.ts because it's not exported
interface WithDragAndDropProps<TEvent> {
  onEventDrop?: (args: {
    event: TEvent;
    start: stringOrDate;
    end: stringOrDate;
    allDay: boolean;
  }) => void;
  onEventResize?: (args: {
    event: TEvent;
    start: stringOrDate;
    end: stringOrDate;
    allDay: boolean;
  }) => void;
  resizable?: boolean;
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales: {
    ru,
  },
});

const Container = styled.div`
  height: 100%;
  max-width: 2000px;
  padding-top: 10px;
  margin-left: auto;
  margin-right: auto;
`;

type Props<TEvent extends object, TResource extends object> = Omit<
  CalendarProps<TEvent, TResource> & WithDragAndDropProps<TEvent>,
  'localizer'
>;

const BigCalendarConfigured = <TEvent extends object, TResource extends object>(
  props: Props<TEvent, TResource>
) => {
  return (
    <Container>
      <CalendarStyle />
      <CalendarDndStyle />
      <DragAndDropCalendar
        selectable
        resizable
        localizer={localizer}
        culture="ru"
        showMultiDayTimes={true}
        popup={true}
        defaultView={views.WEEK}
        scrollToTime={parseISO('2000-01-01 09:00:00')}
        {...props}
        components={{
          ...(props.components || {}),
          toolbar: Toolbar,
        }}
      />
    </Container>
  );
};

export default BigCalendarConfigured;
