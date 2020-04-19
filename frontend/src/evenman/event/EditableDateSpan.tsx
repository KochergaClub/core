import { useCallback } from 'react';

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

const CustomInput = ({
  value,
  onClick,
}: {
  value?: string;
  onClick?: () => void;
}) => {
  if (!value || !onClick) {
    return null;
  }

  const date = parse(value, SERIALIZE_FORMAT, new Date());
  return (
    <A href="#" onClick={onClick}>
      <b>{formatDate(date, 'EEEEEE').toUpperCase()}</b>{' '}
      {formatDate(date, 'd MMMM')}
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
    <Row gutter={0}>
      <DatePicker
        selected={date}
        onChange={onDateChange}
        customInput={<CustomInput />}
        dateFormat={SERIALIZE_FORMAT}
        locale={ru}
      />
      <div>
        , {formatDate(date, 'HH:mm')}
        {' ('}
        {formatDistanceToNow(date, { locale: ru })}
        {')'}
      </div>
    </Row>
  );
};

export default EditableDateSpan;
