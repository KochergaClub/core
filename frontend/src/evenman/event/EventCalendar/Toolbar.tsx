import { FaArrowDown, FaArrowUp } from 'react-icons/fa';
import { startOfDay, subWeeks, addWeeks } from 'date-fns';

import { A, Button, Row } from '@kocherga/frontkit';

import { formatDate } from '~/common/utils';

interface Props {
  date: Date;
  setDate: (d: Date) => void;
}

const Toolbar: React.FC<Props> = ({ date, setDate }) => {
  const prevDate = subWeeks(date, 1);
  const nextDate = addWeeks(date, 1);

  return (
    <div style={{ margin: '6px 0' }}>
      <Row centered>
        <Button small onClick={() => setDate(prevDate)}>
          <FaArrowUp /> Назад
        </Button>
        <A
          href="#"
          onClick={e => {
            e.preventDefault();
            setDate(startOfDay(new Date()));
          }}
          style={{ minWidth: 120, textAlign: 'center' }}
        >
          {formatDate(date, 'MMMM yyyy')}
        </A>
        <Button small onClick={() => setDate(nextDate)}>
          <FaArrowDown /> Вперёд
        </Button>
      </Row>
    </div>
  );
};

export default Toolbar;
