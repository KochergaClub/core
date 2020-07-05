import { forwardRef, useCallback } from 'react';

import {
  formatDistanceToNow,
  setHours,
  setMinutes,
  getHours,
  getMinutes,
  parse,
} from 'date-fns';
import { ru } from 'date-fns/locale';

import { A, Row } from '@kocherga/frontkit';

import DatePicker from 'react-datepicker';

import { formatDate } from '~/common/utils';

interface Props {
  date: Date;
  onChange: (d: Date) => void;
}

const SERIALIZE_FORMAT = 'yyyy-MM-dd HH:mm';

const CustomInput: React.FC<{
  value?: string;
  onClick?: () => void;
}> = ({ value, onClick }) => {
  if (!value || !onClick) {
    return null;
  }

  const date = parse(value, SERIALIZE_FORMAT, new Date());
  return (
    <A href="#" onClick={onClick}>
      <b>{formatDate(date, 'EEEEEE').toUpperCase()}</b>{' '}
      {formatDate(date, 'd MMMM, HH:mm')}
    </A>
  );
};

const EditableDateSpan: React.FC<Props> = ({ date, onChange }) => {
  const onDateChange = useCallback(
    (newDate: Date) => {
      setHours(newDate, getHours(date));
      setMinutes(newDate, getMinutes(date));
      onChange(newDate);
    },
    [date, onChange]
  );

  return (
    <Row>
      <DatePicker
        selected={date}
        onChange={onDateChange}
        showTimeSelect
        timeIntervals={15}
        minTime={setHours(setMinutes(new Date(), 0), 9)}
        maxTime={setHours(setMinutes(new Date(), 45), 23)}
        timeCaption="Время"
        customInput={<CustomInput />}
        dateFormat={SERIALIZE_FORMAT}
        locale={ru}
      />
      <div>({formatDistanceToNow(date, { locale: ru, addSuffix: true })})</div>
    </Row>
  );
};

export default EditableDateSpan;
