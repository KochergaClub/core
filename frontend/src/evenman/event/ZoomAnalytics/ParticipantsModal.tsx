import { Modal } from '@kocherga/frontkit';

import { ApolloQueryResults } from '~/components';
import { useEvenmanEventForZoomAnalyticsQuery } from './queries.generated';
import { formatDate } from '~/common/utils';

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
                {event.zoom_meeting.instances.map(instance => (
                  <section>
                    <strong>
                      {formatDate(new Date(instance.start_time), 'HH:mm')}—
                      {formatDate(new Date(instance.end_time), 'HH:mm')}
                    </strong>
                    <div>
                      {instance.participants.map(p => (
                        <div key={p.id}>
                          {formatDate(new Date(p.join_time), 'HH:mm')}—
                          {formatDate(new Date(p.leave_time), 'HH:mm')} {p.name}
                        </div>
                      ))}
                    </div>
                  </section>
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
