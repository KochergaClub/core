import Toggle from 'react-toggle';

import { Row } from '@kocherga/frontkit';

import {
  EventsPrototypeFragment,
  useEvenmanPrototypeSetActiveMutation,
} from '../queries.generated';

interface Props {
  prototype: EventsPrototypeFragment;
}

const ActiveStatus: React.FC<Props> = ({ prototype }) => {
  const [setActive] = useEvenmanPrototypeSetActiveMutation();

  return (
    <Row gutter={4}>
      <Toggle
        checked={prototype.active}
        onChange={e =>
          setActive({
            variables: { id: prototype.id, active: e.target.checked },
          })
        }
      />
      <div>{prototype.active ? 'Активно' : 'Не активно'}</div>
    </Row>
  );
};

export default ActiveStatus;
