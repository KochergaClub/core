import { observer } from 'mobx-react';

import styled from 'styled-components';

import { FaTrash } from 'react-icons/fa';

import { Button } from '@kocherga/frontkit';

import { Event } from '../../stores/Event';

interface Props {
  event: Event;
}

const CenteredLine = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-items: center;

  > * + * {
    margin-left: 2px;
  }
`;

const EventDelete = observer(({ event }: Props) => {
  if (event.deleted) {
    return <b>Событие удалено</b>;
  }
  return (
    <Button onClick={() => event.delete()} small>
      <CenteredLine>
        <FaTrash />
        <span>Удалить</span>
      </CenteredLine>
    </Button>
  );
});

export default EventDelete;
