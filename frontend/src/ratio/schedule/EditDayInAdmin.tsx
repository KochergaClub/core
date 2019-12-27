import { A } from '@kocherga/frontkit';

import { TrainingDayFragment } from '../queries.generated';
import Unprintable from './Unprintable';

const EditDayInAdmin: React.FC<{ day_schedule: TrainingDayFragment }> = ({
  day_schedule,
}) => (
  <Unprintable>
    <A href={`/admin/ratio/trainingday/${day_schedule.id}/change/`}>
      (Редактировать)
    </A>
  </Unprintable>
);

export default EditDayInAdmin;
