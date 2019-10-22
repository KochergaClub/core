import React from 'react';

import { NextPage } from '~/common/types';
import Page from '~/components/Page';

import { selectAPI } from '~/core/selectors';

import { getEvent } from '~/events/api';
import { Event, serverEventToEvent } from '~/events/types';

import EventInfo from '~/events/components/EventInfo';

interface Props {
  event: Event;
}

const TeamEventPage: NextPage<Props> = ({ event }) => {
  return (
    <Page title="Событие" team>
      <Page.Title>{event.title}</Page.Title>
      <Page.Main>
        <EventInfo event={event} />
      </Page.Main>
    </Page>
  );
};

TeamEventPage.getInitialProps = async ({ store: { getState }, query }) => {
  const uuid = query.uuid as string;

  const api = selectAPI(getState());
  const serverEvent = await getEvent(api, uuid);
  const event = serverEventToEvent(serverEvent);

  return { event };
};

export default TeamEventPage;
