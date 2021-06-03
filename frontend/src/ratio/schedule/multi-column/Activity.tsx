import clsx from 'clsx';

import { Row } from '~/frontkit';

import { ActivityFragment } from '../../queries.generated';

interface Props {
  activity: ActivityFragment;
}

const timeWithoutSections = (time: string) => {
  const match = time.match(/^\d+:\d+/);
  if (!match) {
    throw new Error('Unparsable time');
  }
  return match[0];
};

export const Activity: React.FC<Props> = ({ activity }) => {
  const time = timeWithoutSections(activity.time);
  const outline = activity.activity_type === 'break';
  return (
    <div
      className={clsx(
        'intro-book w-full leading-tight',
        outline && 'bg-gray-100'
      )}
    >
      <Row>
        <time className="text-sm">{time}</time>
        {activity.location ? (
          <div className="italic text-sm">{activity.location}</div>
        ) : null}
      </Row>
      <div className="font-bold text-sm">{activity.name}</div>
      {activity.trainer && (
        <div className="text-xs">{activity.trainer.long_name}</div>
      )}
    </div>
  );
};
