import { Column } from '@kocherga/frontkit';
import { Header } from '../../components/ui';

import { EvenmanEvent_DetailsFragment } from '../queries.generated';

import FbAnnounce from './FbAnnounce';
import TimepadAnnounce from './TimepadAnnounce';
import VkAnnounce from './VkAnnounce';

interface Props {
  event: EvenmanEvent_DetailsFragment;
}

const HeadedSection: React.FC<{ title: string }> = ({ title, children }) => (
  <div>
    <Header>{title}</Header>
    <Column stretch>{children}</Column>
  </div>
);

const EventAnnounce: React.FC<Props> = ({ event }) => {
  if (event.event_type !== 'public') return null;

  return (
    <Column stretch>
      <HeadedSection title="Timepad">
        <TimepadAnnounce event={event} />
      </HeadedSection>

      <HeadedSection title="Facebook">
        <FbAnnounce event={event} />
      </HeadedSection>

      <HeadedSection title="VK">
        <VkAnnounce event={event} />
      </HeadedSection>
    </Column>
  );
};

export default EventAnnounce;
