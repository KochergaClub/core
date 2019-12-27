import { TrainingDayFragment } from '../queries.generated';

import DaySchedule from './single-column/DaySchedule';

interface Props {
  long_name: string;
  schedule: TrainingDayFragment[];
}

export default function SingleColumnSchedule({ schedule, long_name }: Props) {
  return (
    <div>
      {schedule.map((day_schedule, i) => (
        <DaySchedule
          day_schedule={day_schedule}
          index={i + 1}
          key={i}
          long_name={long_name}
        />
      ))}
    </div>
  );
}
