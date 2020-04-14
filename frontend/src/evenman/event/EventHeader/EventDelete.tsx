import styled from 'styled-components';

import { FaTrash } from 'react-icons/fa';

import { Button } from '@kocherga/frontkit';

import {
  EvenmanEvent_DetailsFragment,
  useEvenmanEventDeleteMutation,
} from '../queries.generated';

interface Props {
  event: EvenmanEvent_DetailsFragment;
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

const EventDelete: React.FC<Props> = ({ event }) => {
  const [deleteMutation] = useEvenmanEventDeleteMutation({
    variables: { id: event.id },
  });

  return (
    <Button onClick={() => deleteMutation()} small>
      <CenteredLine>
        <FaTrash />
        <span>Удалить</span>
      </CenteredLine>
    </Button>
  );
};

export default EventDelete;
