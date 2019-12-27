import React from 'react';

import TL03 from '~/blocks/TL03';
import PaddedBlock from '~/components/PaddedBlock';

import { PublicEvent } from '~/events/types';
import EventsList from '~/events/components/EventsList';

import { ProjectPageType } from '../utils';

const UpcomingEventsBlock: React.FC<{ project: ProjectPageType }> = ({
  project,
}) => {
  if (!project.upcoming_events || !project.upcoming_events.length) {
    return null;
  }

  const events = project.upcoming_events.map(serverEvent => ({
    ...serverEvent,
    start: new Date(serverEvent.start),
    end: new Date(serverEvent.end),
  })) as PublicEvent[];

  return (
    <section>
      <TL03 title="Ближайшие события" grey />
      <PaddedBlock>
        <EventsList events={events} />
      </PaddedBlock>
    </section>
  );
};

export default UpcomingEventsBlock;
