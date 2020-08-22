import { setHours, setMinutes } from 'date-fns';
import DatePicker from 'react-datepicker';

interface Props {
  time: Date | undefined;
  setTime: (time: Date) => void;
}

const TimePicker: React.FC<Props> = ({ time, setTime }) => {
  return (
    <DatePicker
      selected={time}
      onChange={setTime}
      showTimeSelect
      showTimeSelectOnly
      timeIntervals={15}
      minTime={setHours(setMinutes(new Date(), 0), 9)}
      maxTime={setHours(setMinutes(new Date(), 30), 23)}
      timeCaption="Время"
      dateFormat="HH:mm"
      timeFormat="HH:mm"
      inline
    />
  );
};

export default TimePicker;
