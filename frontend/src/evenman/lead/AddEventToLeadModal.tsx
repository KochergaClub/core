import React, { useState } from 'react';

import { useSmartMutation } from '~/common/hooks';
import { CommonModal } from '~/components';
import { EventPicker } from '~/events/components/EventPicker';
import { useNotification } from '~/frontkit';

import { AddEventToCommunityLeadDocument, EvenmanLeadFragment } from './queries.generated';

type Props = {
  lead: EvenmanLeadFragment;
  close: () => void;
};

export const AddEventToLeadModal: React.FC<Props> = ({ lead, close }) => {
  const [eventId, setEventId] = useState<string | undefined>(undefined);
  const notify = useNotification();

  const mutate = useSmartMutation(AddEventToCommunityLeadDocument, {
    expectedTypename: 'CommunityLead',
  });

  const submit = async () => {
    if (eventId === undefined) {
      return {
        close: false,
      };
    }
    const result = await mutate({
      variables: {
        input: {
          lead_id: lead.id,
          event_id: eventId,
        },
      },
    });
    if (!result.ok) {
      notify({
        type: 'Error',
        text: result.error || 'Неизвестная ошибка',
      });
    } else {
      close();
    }
  };

  return (
    <CommonModal title="Добавить событие к лиду" close={close} submit={submit}>
      <EventPicker onChange={(e) => setEventId(e.id)} />
    </CommonModal>
  );
};
