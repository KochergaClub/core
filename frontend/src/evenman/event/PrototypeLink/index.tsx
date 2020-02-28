import Link from 'next/link';
import { observer } from 'mobx-react-lite';

import { A } from '@kocherga/frontkit';

import { Event } from '../../stores/Event';

import EmptyPrototypeLink from './EmptyPrototypeLink';

interface Props {
  event: Event;
}

const PrototypeLink = observer(({ event }: Props) => {
  const prototypeId = event.prototype_id;
  if (!prototypeId) {
    return <EmptyPrototypeLink event={event} />;
  }

  return (
    <Link
      href="/team/evenman/event-prototypes/[id]"
      as={`/team/evenman/event-prototypes/${prototypeId}`}
      passHref
    >
      <A>Прототип</A>
    </Link>
  );
});

export default PrototypeLink;
