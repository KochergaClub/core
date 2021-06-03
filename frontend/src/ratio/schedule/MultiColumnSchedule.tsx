import { TrainingDayFragment } from '../queries.generated';
import DaySchedule from './multi-column/DaySchedule';

interface Props {
  long_name: string;
  schedule: TrainingDayFragment[];
}

export default function MultiColumnSchedule({ schedule, long_name }: Props) {
  return (
    <div className="flex space-x-5">
      {schedule.map((day, i) => (
        <div key={day.id} className="flex-1">
          <DaySchedule day_schedule={day} long_name={long_name} index={i + 1} />
        </div>
      ))}
    </div>
  );
}
