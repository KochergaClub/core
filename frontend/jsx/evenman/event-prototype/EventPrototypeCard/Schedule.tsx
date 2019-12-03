import * as React from 'react';
import { observer } from 'mobx-react-lite';

import EventPrototype from '../../stores/EventPrototype';

interface Props {
  prototype: EventPrototype;
}

const Schedule: React.FC<Props> = observer(({ prototype }) => {
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
    <div>
      В {daysOfWeek[prototype.weekday]} в {padToTwoDigits(prototype.hour)}:
      {padToTwoDigits(prototype.minute)}, продложительность {prototype.length}{' '}
      минут.
    </div>
  );
});

export default Schedule;
