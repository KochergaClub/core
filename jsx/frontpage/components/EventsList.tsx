import React from 'react';

import styled from 'styled-components';

import TL03 from '~/blocks/TL03';

import { PublicEvent } from '../../events/types';

import EventCard from './EventCard';

const Phone = () => (
  <span style={{ whiteSpace: 'nowrap' }}>+7(499)350-20-42</span>
);

const Header = () => (
  <TL03 title="Расписание мероприятий" grey>
    <p>
      У нас 4 комнаты разного размера, так что прийти посидеть можно когда
      угодно, мероприятия вам не помешают.
    </p>
    <p>
      Если хотите забронировать комнату под день рождения, мероприятие или
      просто посиделки, звоните <Phone /> или воспользуйтесь{' '}
      <a href="https://booking.kocherga.club">формой брони</a>.
    </p>
  </TL03>
);

const List = styled.div`
  padding: 40px 20px;
  margin: 0 auto;
  max-width: 800px;
`;

interface Props {
  events: PublicEvent[];
}

export default function EventsList({ events }: Props) {
  if (!events.length) {
    return null;
  }
  return (
    <div>
      <a id="schedule" />
      <Header />
      <List>
        {events.map(event => <EventCard key={event.event_id} event={event} />)}
      </List>
    </div>
  );
}
