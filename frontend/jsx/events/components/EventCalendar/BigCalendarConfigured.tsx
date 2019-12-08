import styled from 'styled-components';

import { CalendarStyle, CalendarDndStyle } from './CalendarStyle';
import Toolbar from './Toolbar';

import {
  Calendar,
  CalendarProps,
  stringOrDate,
  momentLocalizer,
} from 'react-big-calendar';

// FIXME - some some reason `import { Views } from 'react-big-calendar'` imports type, not constant.
// This is a workaround.
import { views } from 'react-big-calendar/lib/utils/constants';

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

import moment from 'moment';
import 'moment/locale/ru';
moment.locale('ru');

const localizer = momentLocalizer(moment);

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
        showMultiDayTimes={true}
        popup={true}
        defaultView={views.WEEK}
        scrollToTime={new Date('2000-01-01 09:00:00')}
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
