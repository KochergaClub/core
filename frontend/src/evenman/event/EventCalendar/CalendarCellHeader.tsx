import { useState, useCallback } from 'react';
import styled from 'styled-components';

import { formatDate } from '~/common/utils';

import NewEventModal from '../NewEventModal';

interface Props {
  date: Date;
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
          date={formatDate(date, 'yyyy-MM-dd')}
          close={closeNewEventModal}
        />
      )}
      {formatDate(date, 'd MMMM')}
    </div>
  );
};

export default CalendarCellHeader;
