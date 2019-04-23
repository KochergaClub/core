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

  const onDelete = useCallback(
    (event_id: string) => {
      dispatch({
        type: 'DELETE',
        payload: {
          event_id,
        },
      });
      uiDispatch({
        type: 'CLOSE_NEW',
      });
    },
    [uiDispatch]
  );

  switch (uiStore.mode) {
    case 'new':
      return (
        <NewEventModal
          isOpen={true}
          start={uiStore.context.start}
          end={uiStore.context.end}
          onCreate={onCreate}
          onClose={onClose}
        />
      );
    case 'edit':
      return (
        <EditEventModal
          isOpen={true}
          event={uiStore.context.event}
          onSave={onSave}
          onDelete={onDelete}
          onClose={onClose}
        />
      );
    default:
      return null;
  }
};

export default UILayer;
