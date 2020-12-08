import React, { useState } from 'react';

import { useMutation } from '@apollo/client';

import { CommonModal } from '~/components';
import { EventPicker } from '~/events/components/EventPicker';

import { AddEventToCommunityLeadDocument, EvenmanLeadFragment } from './queries.generated';

type Props = {
  lead: EvenmanLeadFragment;
  close: () => void;
};

export const AddEventToLeadModal: React.FC<Props> = ({ lead, close }) => {
  const [eventId, setEventId] = useState<string | undefined>(undefined);

  const [addMutation] = useMutation(AddEventToCommunityLeadDocument);

  const submit = async () => {
    if (eventId === undefined) {
      return {
        close: false,
      };
    }
    await addMutation({
      variables: {
        input: {
          lead_id: lead.id,
          event_id: eventId,
        },
      },
    });
    close();
  };

  return (
    <CommonModal title="Добавить событие к лиду" close={close} submit={submit}>
      <EventPicker onChange={(e) => setEventId(e.id)} />
    </CommonModal>
  );
};
