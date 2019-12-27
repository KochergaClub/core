import { ShiftFragment } from '../queries.generated';

import ShiftBox from './ShiftBox';

interface Props {
  shifts: ShiftFragment[];
}

const DayContainer: React.FC<Props> = ({ shifts }) => {
  return (
    <div>
      {shifts.map(shift => (
        <ShiftBox key={shift.shift} shift={shift} />
      ))}
    </div>
  );
};

export default DayContainer;
