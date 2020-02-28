import { observer } from 'mobx-react-lite';

import EventView from '../views/EventView';

import {
  Button,
  Modal,
  Column,
  ControlsFooter,
  Input,
} from '@kocherga/frontkit';

interface Props {
  view: EventView;
}

const NewEventModal: React.FC<Props> = observer(props => {
  const { view } = props;
  const { newEvent } = view;

  if (!newEvent.show) {
    return null;
  }
  return (
    <Modal>
      <Modal.Header toggle={newEvent.toggleForm}>
        Новое событие на {newEvent.date}
      </Modal.Header>
      <Modal.Body>
        <Column stretch>
          <label>Название события</label>
          <Input
            type="text"
            value={newEvent.title}
            onChange={e => newEvent.setTitle(e.currentTarget.value)}
          />
          <label>Время (xx:00 или xx:30)</label>
          <Input
            type="time"
            placeholder="ЧЧ:ММ"
            value={newEvent.time}
            onChange={e => newEvent.setTime(e.currentTarget.value)}
          />
        </Column>
      </Modal.Body>
      <Modal.Footer>
        <ControlsFooter>
          <Button
            onClick={view.createNewEvent}
            primary
            loading={newEvent.creating}
            disabled={!newEvent.isValid}
          >
            Создать
          </Button>
        </ControlsFooter>
      </Modal.Footer>
    </Modal>
  );
});

export default NewEventModal;
