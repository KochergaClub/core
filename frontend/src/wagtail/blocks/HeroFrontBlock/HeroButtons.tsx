import { Button, Row } from '@kocherga/frontkit';

import { ButtonsListType } from './types';

interface Props {
  buttons: ButtonsListType;
}

const HeroButtons: React.FC<Props> = ({ buttons }) => (
  <Row>
    {buttons.map((button, i) => (
      <Button key={i}>{button.title}</Button>
    ))}
  </Row>
);

export default HeroButtons;
