import { useCallback, useState } from 'react';
import { A } from '@kocherga/frontkit';

import { usePermissions } from '~/common/hooks';

import { EvenmanEvent_DetailsFragment } from '../queries.generated';

import ParticipantsModal from './ParticipantsModal';

interface Props {
  event: EvenmanEvent_DetailsFragment;
}

const ZoomAnalytics: React.FC<Props> = ({ event }) => {
  const [canViewDetails] = usePermissions(['zoom.view_participant_details']);
  const [showModal, setShowModal] = useState(false);

  const viewDetails = useCallback((e: React.SyntheticEvent) => {
    e.preventDefault();
    setShowModal(true);
  }, []);

  const closeModal = useCallback(() => {
    setShowModal(false);
  }, []);

  const meeting = event.zoom_meeting;

  if (!meeting || !meeting.participants_count) {
    return null;
  }

  let result = <div>Участники: {meeting.participants_count}</div>;

  if (canViewDetails) {
    result = (
      <A onClick={viewDetails}>
        {result}
        {showModal && (
          <ParticipantsModal close={closeModal} event_id={event.id} />
        )}
      </A>
    );
  }

  return result;
};

export default ZoomAnalytics;
