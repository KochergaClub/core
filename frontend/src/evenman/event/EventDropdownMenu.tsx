import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { MdCancel } from 'react-icons/md';

import DropdownMenu, { ModalAction, NextLinkAction } from '~/components/DropdownMenu';
import { SmartMutationModal } from '~/components/forms/SmartMutationModal';

import { prototypeRoute } from '../routes';
import { EventDeleteModal } from './EventDeleteModal';
import LinkToPrototypeModal from './LinkToPrototypeModal';
import { EvenmanCancelEventDocument, EvenmanEvent_DetailsFragment } from './queries.generated';

interface Props {
  event: EvenmanEvent_DetailsFragment;
}

export const EventDropdownMenu: React.FC<Props> = ({ event }) => {
  return (
    <DropdownMenu title="Действия">
      {event.prototype && (
        <NextLinkAction
          title="Открыть прототип"
          href={prototypeRoute(event.prototype.id)}
        />
      )}
      <ModalAction title="Заполнить из прототипа" icon={FaEdit}>
        {({ close }) => <LinkToPrototypeModal close={close} event={event} />}
      </ModalAction>
      <ModalAction title="Удалить" icon={FaTrash}>
        {({ close }) => <EventDeleteModal close={close} event={event} />}
      </ModalAction>
      {event.event_type === 'public' && (
        <ModalAction title="Отменить" icon={MdCancel}>
          {({ close }) => (
            <SmartMutationModal
              close={close}
              mutation={EvenmanCancelEventDocument}
              expectedTypename="BasicResult"
              title={`Отменить событие ${event.title}`}
              submitLabel="Отменить"
              shape={
                [
                  {
                    name: 'notification_message',
                    type: 'markdown',
                    title: 'Пояснение причин для рассылки',
                  },
                ] as const
              }
              valuesToVariables={(v) => ({
                input: { ...v, event_id: event.id },
              })}
            />
          )}
        </ModalAction>
      )}
    </DropdownMenu>
  );
};
