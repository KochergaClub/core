import React from 'react';
import { observer } from 'mobx-react-lite';

import { Event } from '../../stores/Event';

import Picker from './Picker';

interface Props {
  event: Event;
}

const EmptyPrototypeLink = observer((props: Props) => {
  const [picking, setPicking] = React.useState(false);
  if (picking) {
    return <Picker event={props.event} />
  }
  return (
    <a style={{textDecoration: 'none', borderBottom: '1px dotted black'}} onClick={() => setPicking(true)}>
      Выбрать прототип
    </a>
  );
});

export default EmptyPrototypeLink;
