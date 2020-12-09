import React, { useCallback, useState } from 'react';

import { useMutation } from '@apollo/client';

import { ConfirmModal } from '~/components';
import { EventPicker } from '~/events/components/EventPicker';
import { A, AsyncButton, Label, Row } from '~/frontkit';

import {
    MastermindDatingCohortDetailsFragment as Cohort, MastermindDatingEventFragment as Event,
    MastermindDatingSetEventForCohortDocument, MastermindDatingUnsetEventForCohortDocument
} from '../queries.generated';

interface Props {
  cohort: Cohort;
}

const CohortEventLink: React.FC<Props> = ({ cohort }) => {
  const [confirming, setConfirming] = useState<Event | undefined>(undefined);

  const [unsetEvent] = useMutation(
    MastermindDatingUnsetEventForCohortDocument,
    {
      refetchQueries: ['MastermindDatingCohorts'],
      awaitRefetchQueries: true,
      variables: {
        cohort_id: cohort.id,
      },
    }
  );

  const [setEvent] = useMutation(MastermindDatingSetEventForCohortDocument, {
    refetchQueries: ['MastermindDatingCohorts'],
    awaitRefetchQueries: true,
  });

  const cancelConfirming = useCallback(() => setConfirming(undefined), []);

  const setEventCb = useCallback(async () => {
    if (!confirming) {
      return; // this shouldn't happen
    }

    await setEvent({
      variables: {
        cohort_id: cohort.id,
        event_id: confirming.id,
      },
    });
  }, [cohort.id, setEvent, confirming]);

  if (cohort.event) {
    return (
      <Row>
        <div>
          Связанное событие:{' '}
          <A href={`/team/events/view/${cohort.event.id}`}>
            {cohort.event.title}
          </A>
        </div>
        <AsyncButton act={unsetEvent} size="small">
          Отвязать
        </AsyncButton>
      </Row>
    );
  }

  return (
    <div>
      <Label>Связать с событием:</Label>
      <EventPicker onChange={setConfirming} />
      {confirming && (
        <ConfirmModal
          submitButton="Выбрать событие"
          close={cancelConfirming}
          act={setEventCb}
        >
          Связать событие {confirming.title} с когортой?
        </ConfirmModal>
      )}
    </div>
  );
};

export default CohortEventLink;
