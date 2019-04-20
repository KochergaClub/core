import React, { useCallback, useContext } from 'react';

import { Event } from '../types';
import { UIStore, UIAction } from '../uiTypes';

import NewEventModal from './NewEventModal';
import EditEventModal from './EditEventModal';
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

  const onSave = useCallback(
    (event: Event) => {
      dispatch({
        type: 'PATCH',
        payload: {
          event,
        },
      });
      uiDispatch({
        type: 'CLOSE_NEW',
      });
    },
    [uiDispatch]
  );

  if (uiStore.mode === 'new') {
    return (
      <NewEventModal
        isOpen={true}
        start={uiStore.context.start}
        end={uiStore.context.end}
        onCreate={onCreate}
        onClose={onClose}
      />
    );
  }

  if (uiStore.mode === 'edit') {
    return (
      <EditEventModal
        isOpen={true}
        event={uiStore.context.event}
        onSave={onSave}
        onClose={onClose}
      />
    );
  }
  return null;
};

export default UILayer;
