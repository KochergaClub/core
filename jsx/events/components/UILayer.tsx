import React, { useCallback, useContext } from 'react';

import { Event, UIStore, UIAction } from '../types';

import NewEventModal from './NewEventModal';
import { EventDispatch } from '../contexts';

interface Props {
  uiStore: UIStore;
  uiDispatch: React.Dispatch<UIAction>;
}

const UILayer = ({ uiStore, uiDispatch }: Props) => {
  const dispatch = useContext(EventDispatch);

  const onCreate = useCallback(
    (event: Event) => {
      dispatch({
        type: 'CREATE',
        payload: event,
      });
      uiDispatch({
        type: 'CLOSE_NEW',
      });
    },
    [dispatch, uiDispatch]
  );

  const onClose = useCallback(
    () => {
      uiDispatch({
        type: 'CLOSE_NEW',
      });
    },
    [uiDispatch]
  );

  return (
    <NewEventModal
      isOpen={uiStore.modalIsOpen}
      start={uiStore.editingStart}
      end={uiStore.editingEnd}
      onCreate={onCreate}
      onClose={onClose}
    />
  );
};

export default UILayer;
