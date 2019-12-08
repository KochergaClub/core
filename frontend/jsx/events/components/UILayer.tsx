import { useSelector } from 'react-redux';

import NewEventModal from './NewEventModal';
import EditEventModal from './EditEventModal';
import ViewEventModal from './ViewEventModal';

import { selectUIState } from '../features/calendarUI';

const UILayer: React.FC = () => {
  const uiState = useSelector(selectUIState);

  switch (uiState.mode) {
    case 'new':
      return (
        <NewEventModal
          start={uiState.context.start}
          end={uiState.context.end}
        />
      );
    case 'view':
      return <ViewEventModal eventId={uiState.context.event_id} />;
    case 'edit':
      return <EditEventModal eventId={uiState.context.event_id} />;
    default:
      return null;
  }
};

export default UILayer;
