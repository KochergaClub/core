import { Column } from '~/frontkit';

import { Header } from '../../components/ui';
import { EvenmanEvent_DetailsFragment } from '../queries.generated';
import FbAnnounce from './FbAnnounce';
import TimepadAnnounce from './TimepadAnnounce';
import VkAnnounce from './VkAnnounce';

interface Props {
  event: EvenmanEvent_DetailsFragment;
}

const HeadedSection: React.FC<{ title: string }> = ({ title, children }) => (
  <section>
    <Header>{title}</Header>
    <Column stretch>{children}</Column>
  </section>
);

const EventAnnounce: React.FC<Props> = ({ event }) => {
  if (event.event_type !== 'public') return null;

  return (
    <Column stretch>
      <HeadedSection title="VK">
        <VkAnnounce event={event} />
      </HeadedSection>

      {event.announcements.fb.link ? (
        <HeadedSection title="Facebook">
          <FbAnnounce event={event} />
        </HeadedSection>
      ) : null}

      {event.announcements.timepad.link ? (
        <HeadedSection title="Timepad">
          <TimepadAnnounce event={event} />
        </HeadedSection>
      ) : null}
    </Column>
  );
};

export default EventAnnounce;
