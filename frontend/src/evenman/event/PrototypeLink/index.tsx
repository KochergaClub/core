import Link from 'next/link';

import { A } from '@kocherga/frontkit';

import EmptyPrototypeLink from './EmptyPrototypeLink';
import { EvenmanEvent_DetailsFragment } from '../queries.generated';

import { prototypeRoute } from '../../routes';

interface Props {
  event: EvenmanEvent_DetailsFragment;
}

const PrototypeLink = ({ event }: Props) => {
  if (!event.prototype) {
    return <EmptyPrototypeLink event={event} />;
  }

  const route = prototypeRoute(event.prototype.id);
  return (
    <Link href={route.href} as={route.as} passHref>
      <A>Прототип</A>
    </Link>
  );
};

export default PrototypeLink;
