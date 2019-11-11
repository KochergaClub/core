import { observer } from 'mobx-react-lite';

import Toggle from 'react-toggle';

import { Row } from '@kocherga/frontkit';

import EventPrototype from '../../stores/EventPrototype';

interface Props {
  prototype: EventPrototype;
}

const ActiveStatus: React.FC<Props> = observer(({ prototype }) => (
  <Row gutter={4}>
    <Toggle
      checked={prototype.active}
      onChange={e => prototype.setActive(e.target.checked)}
    />
    <div>{prototype.active ? 'Активно' : 'Не активно'}</div>
  </Row>
));

export default ActiveStatus;
