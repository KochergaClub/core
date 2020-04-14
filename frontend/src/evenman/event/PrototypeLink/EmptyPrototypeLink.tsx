import { useState } from 'react';

import Picker from './Picker';
import { EvenmanEvent_DetailsFragment } from '../queries.generated';

interface Props {
  event: EvenmanEvent_DetailsFragment;
}

const EmptyPrototypeLink: React.FC<Props> = ({ event }) => {
  const [picking, setPicking] = useState(false);
  if (picking) {
    return <Picker event={event} />;
  }
  return (
    <a
      style={{ textDecoration: 'none', borderBottom: '1px dotted black' }}
      onClick={() => setPicking(true)}
    >
      Выбрать прототип
    </a>
  );
};

export default EmptyPrototypeLink;
