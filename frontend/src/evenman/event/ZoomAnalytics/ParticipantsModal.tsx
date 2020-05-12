import { Modal } from '@kocherga/frontkit';

import { ApolloQueryResults } from '~/components';
import { useEvenmanEventForZoomAnalyticsQuery } from './queries.generated';

interface Props {
  close: () => void;
  event_id: string;
}

const ParticipantsModal: React.FC<Props> = ({ close, event_id }) => {
  const queryResults = useEvenmanEventForZoomAnalyticsQuery({
    variables: { id: event_id },
  });
  return (
    <Modal>
      <Modal.Header toggle={close}>Участники</Modal.Header>
      <Modal.Body>
        <ApolloQueryResults {...queryResults}>
          {({ data: { event } }) => {
            if (!event) {
              return null;
            }
            if (!event.zoom_meeting) {
              return null;
            }
            return (
              <div>
                {event.zoom_meeting.participants.map(p => (
                  <div key={p.id}>{p.name}</div>
                ))}
              </div>
            );
          }}
        </ApolloQueryResults>
      </Modal.Body>
    </Modal>
  );
};

export default ParticipantsModal;
