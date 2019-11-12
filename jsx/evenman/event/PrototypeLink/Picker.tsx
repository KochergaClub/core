import React from 'react';
import { observer } from 'mobx-react-lite';

import { FaSpinner } from 'react-icons/fa';

import { ReactSelectCreatable } from '../../components/ui';

import { Event } from '../../stores/Event';
import EventPrototype from '../../stores/EventPrototype';

interface Props {
  event: Event;
}

const Picker = observer(({ event }: Props) => {
  // FIXME - can be not loaded!
  const { eventPrototypeStore } = event.root;

  if (eventPrototypeStore.state === 'empty') {
    eventPrototypeStore.loadAll();
  }
  const prototypes = eventPrototypeStore.list;

  if (!prototypes.length) {
    return <FaSpinner />;
  }

  const value2option = (g: EventPrototype) => {
    return {
      value: g.id,
      label: g.title,
    };
  };

  return (
    <ReactSelectCreatable
      placeholder="Выбрать прототип"
      options={prototypes.map(value2option)}
      value={
        value2option(prototypes[0]) // FIXME - selected -> value2option
      }
      onChange={(option: any) => {
        event.setPrototypeId(option.value);
      }}
    />
  );
});

export default Picker;
