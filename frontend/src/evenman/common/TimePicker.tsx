import { Button } from '~/frontkit';

type Time = { hour: number; minute: number };

type Props = {
  time: Time | undefined;
  setTime: (time: Time) => void;
};

const padToTwoDigits = (value: number) =>
  value < 10 ? `0${value}` : `${value}`;

const PickButton: React.FC<{ hour: number; minute: number } & Props> = ({
  hour,
  minute,
  time,
  setTime,
}) => {
  const selected = time && time.hour === hour && time.minute === minute;
  return (
    <Button
      onClick={() => setTime({ hour, minute })}
      kind={selected ? 'primary' : 'default'}
    >
      {padToTwoDigits(hour)}:{padToTwoDigits(minute)}
    </Button>
  );
};

const HoursColumn: React.FC<{ from: number; n: number } & Props> = ({
  from,
  n,
  ...rest
}) => {
  return (
    <div className="space-y-2 border-l border-gray-200 pl-4 first:border-0 first:pl-0">
      {Array.from(Array(n).keys())
        .map((i) => i + from)
        .map((i) => (
          <div className="flex space-x-2" key={i}>
            <PickButton hour={i} minute={0} {...rest} />
            <PickButton hour={i} minute={30} {...rest} />
          </div>
        ))}
    </div>
  );
};

const TimePicker: React.FC<Props> = (props) => {
  return (
    <div className="flex space-x-4">
      <HoursColumn from={9} n={5} {...props} />
      <HoursColumn from={14} n={5} {...props} />
      <HoursColumn from={19} n={5} {...props} />
    </div>
  );
};

export default TimePicker;
