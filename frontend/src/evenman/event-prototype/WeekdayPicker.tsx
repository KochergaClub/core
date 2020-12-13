import { useCallback } from 'react';
import Select, { ValueType } from 'react-select';

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

interface OptionType {
  value: number;
  label: string;
}

const WeekdayPicker: React.FC<Props> = ({ value, setValue }) => {
  const onChange = useCallback(
    (option: ValueType<OptionType, false>) => {
      if (!option) {
        throw new Error('Deselect is not implemented');
      }
      setValue(option.value);
    },
    [setValue]
  );

  return (
    <Select
      placeholder="Выбрать..."
      menuPortalTarget={document.body}
      styles={{
        menuPortal: (base) => ({ ...base, zIndex: 1500 }),
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
