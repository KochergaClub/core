import { useCallback, useState } from 'react';
import styled from 'styled-components';

import { formatDate } from '~/common/utils';
import { Button } from '~/frontkit';

import NewEventModal from '../NewEventModal';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;

  > .CalendarCell--OnHover {
    margin-right: 4px;
  }
`;

type Props = {
  date: Date;
};

export const CalendarCellHeader: React.FC<Props> = ({ date }) => {
  const [isNewEventModalOpen, setNewEventModalOpen] = useState(false);

  const openNewEventModal = useCallback((e: React.SyntheticEvent) => {
    e.preventDefault();
    setNewEventModalOpen(true);
  }, []);

  const closeNewEventModal = useCallback(() => {
    setNewEventModalOpen(false);
  }, []);

  return (
    <Container>
      <span className="CalendarCell--OnHover">
        <Button size="tiny" onClick={openNewEventModal}>
          Создать
        </Button>
      </span>
      <div>{formatDate(date, 'd MMMM')}</div>
      {isNewEventModalOpen && (
        <NewEventModal
          date={formatDate(date, 'yyyy-MM-dd')}
          close={closeNewEventModal}
        />
      )}
    </Container>
  );
};
