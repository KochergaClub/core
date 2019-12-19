import { A } from '@kocherga/frontkit';

import { TrainingDay } from '../types';
import Unprintable from './Unprintable';

const EditDayInAdmin: React.FC<{ day_schedule: TrainingDay }> = ({
  day_schedule,
}) => (
  <Unprintable>
    <A href={`/admin/ratio/trainingday/${day_schedule.id}/change/`}>
      (Редактировать)
    </A>
  </Unprintable>
);

export default EditDayInAdmin;
