import { useCallback } from 'react';

import { ReactSelect } from '../components/ui';

interface Props {
  value: number | undefined;
  setValue: (value: number) => void;
}

const weekdays = [
  'Понедельник',
  'Вторник',
  'Среда',
  'Четверг',
  'Пятница',
  'Суббота',
  'Воскресенье',
];

const WeekdayPicker: React.FC<Props> = ({ value, setValue }) => {
  const onChange = useCallback(
    (selectOption: any) => {
      setValue(parseInt(selectOption.value as string, 10));
    },
    [setValue]
  );

  return (
    <ReactSelect
      placeholder="Выбрать..."
      menuPortalTarget={document.body}
      styles={{
        menuPortal: (base: any) => ({ ...base, zIndex: 1500 }),
      }}
      options={[0, 1, 2, 3, 4, 5, 6].map((n) => ({
        value: n,
        label: weekdays[n],
      }))}
      value={value === undefined ? null : { value, label: weekdays[value] }}
      onChange={onChange}
    />
  );
};

export default WeekdayPicker;
