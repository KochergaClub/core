import { useSelector } from 'react-redux';

import NewEventModal from './NewEventModal';
import EditEventModal from './EditEventModal';
import ViewEventModal from './ViewEventModal';

import { selectUIState } from '../features/calendarUI';

const UILayer: React.FC = () => {
  const uiState = useSelector(selectUIState);

  switch (uiState.mode) {
    case 'new':
      return <NewEventModal />;
    case 'view':
      return <ViewEventModal />;
    case 'edit':
      return <EditEventModal />;
    default:
      return null;
  }
};

export default UILayer;
