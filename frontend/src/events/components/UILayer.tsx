import { useContext } from 'react';

import NewEventModal from './NewEventModal';
import EditEventModal from './EditEventModal';
import ViewEventModal from './ViewEventModal';

import { CalendarUIContext } from '../reducers/calendarUI';

const UILayer: React.FC = () => {
  const { state: uiState } = useContext(CalendarUIContext);

  switch (uiState.mode) {
    case 'new':
      return <NewEventModal />;
    case 'view':
      return <ViewEventModal event_id={uiState.context.event_id} />;
    case 'edit':
      return <EditEventModal event_id={uiState.context.event_id} />;
    default:
      return null;
  }
};

export default UILayer;
