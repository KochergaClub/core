import React from 'react';

import { CalendarStyle, CalendarDndStyle } from './CalendarStyle';
import CalendarToolbar from './CalendarToolbar';

import BigCalendar from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';

const DragAndDropCalendar = withDragAndDrop(BigCalendar);

import moment from 'moment';
moment.locale('ru');

const localizer = BigCalendar.momentLocalizer(moment);

export default (props: any) => {
  return (
    <div style={{ height: 780 }}>
      <CalendarStyle />
      <CalendarDndStyle />
      <DragAndDropCalendar
        selectable
        resizable
        localizer={localizer}
        popup={true}
        defaultView={BigCalendar.Views.WEEK}
        scrollToTime={new Date('2000-01-01 09:00:00')}
        components={{
          toolbar: CalendarToolbar,
        }}
        {...props}
      />
    </div>
  );
};
