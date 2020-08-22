import { Row } from '@kocherga/frontkit';

import { EventsPrototypeFragment } from '../queries.generated';
import EditScheduleButton from './EditScheduleButton';

interface Props {
  prototype: EventsPrototypeFragment;
}

const Schedule: React.FC<Props> = ({ prototype }) => {
  const daysOfWeek = [
    'понедельник',
    'вторник',
    'среду',
    'четверг',
    'пятницу',
    'субботу',
    'воскресенье',
  ];

  const padToTwoDigits = (value: number) =>
    value < 10 ? `0${value}` : `${value}`;

  return (
    <Row>
      <span>
        В{prototype.weekday === 1 ? 'о' : ''}{' '}
        <strong>{daysOfWeek[prototype.weekday]}</strong> в{' '}
        <strong>
          {padToTwoDigits(prototype.hour)}:{padToTwoDigits(prototype.minute)}
        </strong>
        , продложительность <strong>{prototype.length}</strong> минут.
      </span>
      <EditScheduleButton prototype={prototype} />
    </Row>
  );
};

export default Schedule;
