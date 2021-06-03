import clsx from 'clsx';
import { isEqual, startOfDay } from 'date-fns';
import { useCallback, useState } from 'react';

import { formatDate } from '~/common/utils';
import { Button } from '~/frontkit';

import NewEventModal from '../NewEventModal';

type Props = {
  date: Date;
};

export const CalendarCellHeader: React.FC<Props> = ({ date }) => {
  const [isNewEventModalOpen, setNewEventModalOpen] = useState(false);

  const today = isEqual(date, startOfDay(new Date()));

  const openNewEventModal = useCallback((e: React.SyntheticEvent) => {
    e.preventDefault();
    setNewEventModalOpen(true);
  }, []);

  const closeNewEventModal = useCallback(() => {
    setNewEventModalOpen(false);
  }, []);

  return (
    <div
      className={clsx(
        'flex justify-end items-center px-1 py-0.5 text-white text-xs',
        today ? 'font-bold bg-gray-600' : 'bg-gray-400'
      )}
    >
      <span className="mr-1 group-hover:visible invisible">
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
    </div>
  );
};
