import { staticUrl } from '~/common/utils';
import { HR } from '~/frontkit';

import { TrainingDayFragment } from '../../queries.generated';
import EditDayInAdmin from '../EditDayInAdmin';
import Activity from './Activity';

interface Props {
  index: number;
  day_schedule: TrainingDayFragment;
  long_name: string;
}

const DaySchedule: React.FC<Props> = ({ day_schedule, long_name, index }) => (
  <section
    className="text-center my-10 print:my-0"
    style={{ pageBreakAfter: 'always' }}
  >
    <header className="text-3xl">День {index}</header>
    <EditDayInAdmin day_schedule={day_schedule} />
    <HR />

    {day_schedule.activities.map((activity, i) => (
      <Activity key={i} activity={activity} />
    ))}

    <footer className="flex justify-between items-center text-gray-500 print:fixed print:bottom-0 print:w-full">
      <div className="flex items-center">
        <img className="h-8 mr-2" src={staticUrl('logo.png')} />
        <div style={{ fontFamily: 'Intro' }}>Кочерга</div>
      </div>
      <div>{long_name}</div>
    </footer>
  </section>
);

export default DaySchedule;
