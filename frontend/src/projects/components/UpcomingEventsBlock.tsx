import TL03 from '~/blocks/TL03';

import EventsListBlock from '~/events/components/EventsListBlock';

import { ProjectPageFragment } from '../queries.generated';

const UpcomingEventsBlock: React.FC<{ project: ProjectPageFragment }> = ({
  project,
}) => {
  if (!project.upcoming_events || !project.upcoming_events.length) {
    return null;
  }

  return (
    <section>
      <TL03 title="Ближайшие события" grey />
      <EventsListBlock events={project.upcoming_events} />
    </section>
  );
};

export default UpcomingEventsBlock;
