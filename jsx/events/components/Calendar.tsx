import React from 'react';

import { CalendarStyle, CalendarDndStyle } from './CalendarStyle';
import CalendarToolbar from './CalendarToolbar';

import BigCalendar, {
  BigCalendarProps,
  stringOrDate,
} from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';

const DragAndDropCalendar = withDragAndDrop(BigCalendar);

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

import moment from 'moment';
moment.locale('ru');

const localizer = BigCalendar.momentLocalizer(moment);

type Props<TEvent extends object, TResource extends object> = Omit<
  BigCalendarProps<TEvent, TResource> & WithDragAndDropProps<TEvent>,
  'localizer'
>;

const Calendar = <TEvent extends object, TResource extends object>(
  props: Props<TEvent, TResource>
) => {
  return (
    <div style={{ height: '80vh' }}>
      <CalendarStyle />
      <CalendarDndStyle />
      <DragAndDropCalendar
        selectable
        resizable
        localizer={localizer}
        showMultiDayTimes={true}
        popup={true}
        defaultView={BigCalendar.Views.WEEK}
        scrollToTime={new Date('2000-01-01 09:00:00')}
        {...props}
        components={{
          ...(props.components || {}),
          toolbar: CalendarToolbar,
        }}
      />
    </div>
  );
};

export default Calendar;
