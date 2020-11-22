import { useCallback } from 'react';

import { Row } from '~/frontkit';

import { EditableString } from '../components/EditableString';
import { MutedSpan } from '../components/ui';
import { useUpdateMutation } from './hooks';
import { EvenmanEvent_DetailsFragment } from './queries.generated';

interface Props {
  event: EvenmanEvent_DetailsFragment;
}

const EventVisitors: React.FC<Props> = ({ event }) => {
  const update = useUpdateMutation(event.id);

  const renderValue = useCallback(() => {
    if (!event.visitors) {
      return <MutedSpan>ввести</MutedSpan>;
    }
    return <strong>{event.visitors}</strong>;
  }, [event.visitors]);

  return (
    <Row gutter={4}>
      <div>Число участников:</div>
      <EditableString
        value={event.visitors || undefined}
        save={(value) => update({ visitors: value })}
        renderValue={renderValue}
      />
    </Row>
  );
};

export default EventVisitors;
