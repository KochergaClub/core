import { useState, useCallback } from 'react';
import styled from 'styled-components';
import moment from 'moment';

import NewEventModal from '../NewEventModal';

interface Props {
  date: moment.Moment;
}

const NewButton = styled.a`
  color: black;
  text-decoration: none;
  &:hover {
    color: red;
  }
`;

const CalendarCellHeader: React.FC<Props> = ({ date }) => {
  const [isNewEventModalOpen, setNewEventModalOpen] = useState(false);

  const openNewEventModal = useCallback((e: React.SyntheticEvent) => {
    e.preventDefault();
    setNewEventModalOpen(true);
  }, []);

  const closeNewEventModal = useCallback(() => {
    setNewEventModalOpen(false);
  }, []);

  return (
    <div>
      <NewButton
        className="CalendarCell--OnHover"
        href="#"
        onClick={openNewEventModal}
      >
        +
      </NewButton>
      {isNewEventModalOpen && (
        <NewEventModal
          date={date.format('YYYY-MM-DD')}
          close={closeNewEventModal}
        />
      )}
      {date.format('D MMMM')}
    </div>
  );
};

export default CalendarCellHeader;
