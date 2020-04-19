import { useCallback, useState } from 'react';
import styled from 'styled-components';
import Router from 'next/router';

import { FaTrash } from 'react-icons/fa';

import { AsyncButton } from '~/components';

import {
  EvenmanEvent_DetailsFragment,
  useEvenmanEventDeleteMutation,
} from '../queries.generated';
import { rootRoute } from '../../routes';

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
  const [deleted, setDeleted] = useState(false);
  const [deleteMutation] = useEvenmanEventDeleteMutation({
    variables: { id: event.id },
  });

  const act = useCallback(async () => {
    await deleteMutation();
    const route = rootRoute();
    setDeleted(true);
    Router.push(route.href, route.as);
  }, [deleteMutation]);

  if (deleted) {
    return null;
  }

  return (
    <AsyncButton act={act} small>
      <CenteredLine>
        <FaTrash />
        <span>Удалить</span>
      </CenteredLine>
    </AsyncButton>
  );
};

export default EventDelete;
