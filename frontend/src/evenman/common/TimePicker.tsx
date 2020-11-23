import styled from 'styled-components';

import { Button, colors, Column, Row } from '~/frontkit';

type Time = { hour: number; minute: number };

type Props = {
  time: Time | undefined;
  setTime: (time: Time) => void;
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  > * + * {
    padding-left: 8px;
    margin-left: 8px;
    border-left: 1px solid ${colors.grey[200]};
  }
`;

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
    <Column centered gutter={8}>
      {Array.from(Array(n).keys())
        .map((i) => i + from)
        .map((i) => (
          <Row key={i} gutter={8}>
            <PickButton hour={i} minute={0} {...rest} />
            <PickButton hour={i} minute={30} {...rest} />
          </Row>
        ))}
    </Column>
  );
};

const TimePicker: React.FC<Props> = (props) => {
  return (
    <Container>
      <HoursColumn from={9} n={5} {...props} />
      <HoursColumn from={14} n={5} {...props} />
      <HoursColumn from={19} n={5} {...props} />
    </Container>
  );
};

export default TimePicker;
