import { Button, Row } from '@kocherga/frontkit';
import { MdVideocam, MdVideocamOff } from 'react-icons/md';

interface Props {
  flip: () => void;
  active: boolean;
}

const MuteVideoButton: React.FC<Props> = ({ flip, active }) => (
  <Button onClick={flip}>
    <Row vCentered>
      {active ? <MdVideocam color="green" /> : <MdVideocamOff color="red" />}
      <span>Видео</span>
    </Row>
  </Button>
);

export default MuteVideoButton;
