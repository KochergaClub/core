import { observer } from 'mobx-react-lite';
import React from 'react';

import { Column } from '@kocherga/frontkit';

import { useRootStore } from '../common';

import PrototypeNavList from './PrototypeNavList';

interface Props {
  selectedId?: number;
  select: (id: number) => void;
}

const EventPrototypeList = observer((props: Props) => {
  const store = useRootStore()!.eventPrototypeStore;

  switch (store.state) {
    case 'empty':
      store.loadAll();
    case 'fetching':
      return <div>loading...</div>;
    case 'full':
      return (
        <div>
          <Column gutter={10} stretch>
            <PrototypeNavList
              title="Активные"
              items={store.list.filter(p => p.active)}
              selectedId={props.selectedId}
              select={id => props.select(id)}
            />
            <PrototypeNavList
              title="Неактивные"
              items={store.list.filter(p => !p.active)}
              selectedId={props.selectedId}
              select={id => props.select(id)}
            />
          </Column>
        </div>
      );
    default:
      return <span>'wat? ' + store.state</span>;
  }
});

export default EventPrototypeList;
