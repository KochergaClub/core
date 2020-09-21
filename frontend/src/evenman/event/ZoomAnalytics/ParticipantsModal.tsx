import { parseISO } from 'date-fns';

import { useQuery } from '@apollo/client';
import { Modal } from '@kocherga/frontkit';

import { formatDate } from '~/common/utils';
import { ApolloQueryResults } from '~/components';

import { EvenmanEventForZoomAnalyticsDocument } from './queries.generated';

interface Props {
  close: () => void;
  event_id: string;
}

const ParticipantsModal: React.FC<Props> = ({ close, event_id }) => {
  const queryResults = useQuery(EvenmanEventForZoomAnalyticsDocument,{
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
                  <section key={instance.id}>
                    <strong>
                      {formatDate(parseISO(instance.start_time), 'HH:mm')}—
                      {formatDate(parseISO(instance.end_time), 'HH:mm')}
                    </strong>
                    <div>
                      {instance.participants.map(p => (
                        <div key={p.id}>
                          {formatDate(parseISO(p.join_time), 'HH:mm')}—
                          {formatDate(parseISO(p.leave_time), 'HH:mm')} {p.name}
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
