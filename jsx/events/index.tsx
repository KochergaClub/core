import * as React from 'react';

import Page from '../components/Page';
import TeamMenu from '../components/TeamMenu';

import Calendar from 'react-big-calendar';

import moment from 'moment';

const localizer = Calendar.momentLocalizer(moment);

export default ({ events }) => (
  <Page title="Календарь событий">
    <TeamMenu />
    <h1>Календарь событий</h1>
    <div style={{height: 400}}>
      <Calendar
        localizer={localizer}
        events={events}
      />
    </div>
  </Page>
);
