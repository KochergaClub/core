import Link from 'next/link';

import { A } from '@kocherga/frontkit';

import EmptyPrototypeLink from './EmptyPrototypeLink';
import { EvenmanEvent_DetailsFragment } from '../queries.generated';

interface Props {
  event: EvenmanEvent_DetailsFragment;
}

const PrototypeLink = ({ event }: Props) => {
  if (!event.prototype) {
    return <EmptyPrototypeLink event={event} />;
  }

  return (
    <Link
      href="/team/evenman/event-prototypes/[id]"
      as={`/team/evenman/event-prototypes/${event.prototype.id}`}
      passHref
    >
      <A>Прототип</A>
    </Link>
  );
};

export default PrototypeLink;
