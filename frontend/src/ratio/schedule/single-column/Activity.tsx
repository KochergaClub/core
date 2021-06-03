import { HR } from '~/frontkit';

import { ActivityFragment } from '../../queries.generated';
import EditableTrainer from './EditableTrainer';

const formatTime = (time: string) => time.substr(0, 5);

interface Props {
  activity: ActivityFragment;
}

const Activity = ({ activity }: Props) => {
  switch (activity.activity_type) {
    case 'section':
      return (
        <section className="mb-8">
          <time className="italic text-2xl">{formatTime(activity.time)}</time>
          <header className="text-2xl font-semibold my-2">
            {activity.name}
          </header>
          <EditableTrainer
            trainer_name={activity.trainer?.long_name}
            picked={async () => window.alert('not implemented')}
            unpicked={async () => window.alert('not implemented')}
          />
        </section>
      );
    case 'break':
      return (
        <section className="italic text-gray-500 my-8">
          <HR />(<time>{formatTime(activity.time)}</time> {activity.name})
          <HR />
        </section>
      );
    case 'bonus':
      return <section className="text-2xl">Бонус. {activity.name}</section>;
    default:
      return <div>НЕОПОЗНАННАЯ СЕКЦИЯ</div>;
  }
};

export default Activity;
