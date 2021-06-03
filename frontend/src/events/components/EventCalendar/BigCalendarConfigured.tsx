import { parseISO } from 'date-fns';
import { Calendar, CalendarProps, stringOrDate } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
// FIXME - some some reason `import { Views } from 'react-big-calendar'` imports type, not constant.
// This is a workaround.
import { views } from 'react-big-calendar/lib/utils/constants';

import { CalendarDndStyle, CalendarStyle } from './CalendarStyle';
import { localizer } from './localizer';
import Toolbar from './Toolbar';

const DragAndDropCalendar = withDragAndDrop<any, any>(Calendar);

// copied from dragAndDrop.d.ts because it's not exported
interface WithDragAndDropProps<TEvent> {
  onEventDrop?: (args: {
    event: TEvent;
    start: stringOrDate;
    end: stringOrDate;
    isAllDay: boolean;
  }) => void;
  onEventResize?: (args: {
    event: TEvent;
    start: stringOrDate;
    end: stringOrDate;
    isAllDay: boolean;
  }) => void;
  resizable?: boolean;
}

type Props<TEvent extends object, TResource extends object> = Omit<
  CalendarProps<TEvent, TResource> & WithDragAndDropProps<TEvent>,
  'localizer'
>;

const BigCalendarConfigured = <TEvent extends object, TResource extends object>(
  props: Props<TEvent, TResource>
) => {
  return (
    <div className="mx-auto pt-2">
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
    </div>
  );
};

export default BigCalendarConfigured;
