import 'react-toggle/style.css';

import Toggle from 'react-toggle';

import { Row } from '~/frontkit';

import { EventsPrototypeFragment } from '../queries.generated';
import { useUpdateMutation } from './hooks';

interface Props {
  prototype: EventsPrototypeFragment;
}

const ActiveStatus: React.FC<Props> = ({ prototype }) => {
  const update = useUpdateMutation(prototype.id);

  return (
    <Row gutter={4}>
      <Toggle
        checked={prototype.active}
        onChange={(e) =>
          update({
            active: e.target.checked,
          })
        }
      />
      <div>{prototype.active ? 'Активно' : 'Не активно'}</div>
    </Row>
  );
};

export default ActiveStatus;
