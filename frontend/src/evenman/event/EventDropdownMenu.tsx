import DropdownMenu, { ModalAction, NextLinkAction } from '~/components/DropdownMenu';

import { prototypeRoute } from '../routes';
import EventDeleteModal from './EventDeleteModal';
import LinkToPrototypeModal from './LinkToPrototypeModal';
import { EvenmanEvent_DetailsFragment } from './queries.generated';

interface Props {
  event: EvenmanEvent_DetailsFragment;
}

const EventDropdownMenu: React.FC<Props> = ({ event }) => {
  return (
    <DropdownMenu title="Действия">
      {event.prototype && (
        <NextLinkAction href={prototypeRoute(event.prototype.id)}>
          Открыть прототип
        </NextLinkAction>
      )}
      <ModalAction title="Заполнить из прототипа">
        {({ close }) => <LinkToPrototypeModal close={close} event={event} />}
      </ModalAction>
      <ModalAction title="Удалить">
        {({ close }) => <EventDeleteModal close={close} event={event} />}
      </ModalAction>
    </DropdownMenu>
  );
};

export default EventDropdownMenu;
