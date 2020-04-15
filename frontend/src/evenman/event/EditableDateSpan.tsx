import { useState, useCallback } from 'react';

import moment from 'moment';
import {
  formatDistanceToNow,
  setHours,
  setMinutes,
  getHours,
  getMinutes,
} from 'date-fns';
import { ru } from 'date-fns/locale';

import { A } from '@kocherga/frontkit';

import { SingleDatePicker } from 'react-dates';
import 'react-dates/initialize';

import { formatDate } from '~/common/utils';

interface Props {
  date: Date;
  onChange: (d: Date) => void;
}

const EditableDateSpan: React.FC<Props> = ({ date, onChange }) => {
  const [focused, setFocused] = useState(false);

  const onDateChange = useCallback(
    (newMoment: moment.Moment | null) => {
      if (!newMoment) {
        return;
      }
      const newDate = newMoment.toDate();
      setHours(newDate, getHours(date));
      setMinutes(newDate, getMinutes(date));
      onChange(newDate);
    },
    [date, onChange]
  );

  const onFocusChange = useCallback(
    ({ focused }: { focused: boolean | null }) => setFocused(Boolean(focused)),
    []
  );

  const onExpand = useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault();
      setFocused(true);
    },
    [setFocused]
  );

  return (
    <span>
      {focused ? (
        <SingleDatePicker
          id="event-date-picker"
          date={moment(date)}
          focused={focused}
          onDateChange={onDateChange}
          onFocusChange={onFocusChange}
        />
      ) : (
        <A href="#" onClick={onExpand}>
          <b>{formatDate(date, 'EEEEEE').toUpperCase()}</b>{' '}
          {formatDate(date, 'd MMMM')}
        </A>
      )}
      , {formatDate(date, 'HH:mm')}
      {' ('}
      {formatDistanceToNow(date, { locale: ru })}
      {')'}
    </span>
  );
};

export default EditableDateSpan;
