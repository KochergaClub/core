import React, { useCallback } from 'react';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';
import { subWeeks, addWeeks, endOfWeek } from 'date-fns';

import { A, Button, Row } from '~/frontkit';

import { formatDate } from '~/common/utils';

interface Props {
  date: Date;
  setDate: (d: Date) => void;
}

const Toolbar: React.FC<Props> = ({ date, setDate }) => {
  const toPrevWeek = useCallback(() => {
    setDate(subWeeks(date, 1));
  }, [date, setDate]);

  const toNextWeek = useCallback(() => {
    setDate(addWeeks(date, 1));
  }, [date, setDate]);

  const toNow = useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault();
      setDate(new Date());
    },
    [setDate]
  );

  return (
    <div style={{ margin: '6px 0' }}>
      <Row centered>
        <Button size="small" onClick={toPrevWeek}>
          <FaArrowUp /> Назад
        </Button>
        <A
          href="#"
          onClick={toNow}
          style={{ minWidth: 120, textAlign: 'center' }}
        >
          {formatDate(endOfWeek(date), 'LLLL yyyy')}
        </A>
        <Button size="small" onClick={toNextWeek}>
          <FaArrowDown /> Вперёд
        </Button>
      </Row>
    </div>
  );
};

export default React.memo(Toolbar);
