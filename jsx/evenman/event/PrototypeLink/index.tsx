import React from 'react';
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
    <A
      href={`/event-prototypes/${prototypeId}`}
      onClick={e => {
        e.preventDefault();
        event.root.setEventPrototypeView({
          id: prototypeId,
        });
      }}
    >
      Прототип
    </A>
  );
});

export default PrototypeLink;
