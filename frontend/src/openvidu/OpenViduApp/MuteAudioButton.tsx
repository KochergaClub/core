import { Button, Row } from '@kocherga/frontkit';
import { MdMic, MdMicOff } from 'react-icons/md';

interface Props {
  flip: () => void;
  active: boolean;
}

const MuteAudioButton: React.FC<Props> = ({ flip, active }) => (
  <Button onClick={flip}>
    <Row vCentered>
      {active ? <MdMic color="green" /> : <MdMicOff color="red" />}
      <span>Микрофон</span>
    </Row>
  </Button>
);

export default MuteAudioButton;
