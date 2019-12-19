import { A } from '@kocherga/frontkit';

import AlertCard from './AlertCard';

const WorkInProgress: React.FC = () => (
  <AlertCard>
    <p>Сайт kocherga.club находится в разработке.</p>
    <p>
      Возможно, вы ищете основной сайт:{' '}
      <A href="https://kocherga-club.ru">kocherga-club.ru</A>
    </p>
  </AlertCard>
);

export default WorkInProgress;
