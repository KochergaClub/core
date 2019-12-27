import { observer } from 'mobx-react-lite';
import React from 'react';

import styled from 'styled-components';

import { useRootStore } from './common';

const Container = styled.ul`
  position: fixed;
  right: 10px;
  bottom: 5px;
`;

const ErrorCard = styled.li`
  border: 1px solid #aaa;
  background-color: pink;
  padding: 5px 10px;
  list-style-type: none;
  cursor: pointer;
`;

const ErrorList = observer(() => {
  const store = useRootStore()!.errorStore;

  const { errors } = store;
  if (!errors.length) {
    return null;
  }

  return (
    <Container>
      {errors.map(e => (
        <ErrorCard key={e.id} onClick={() => store.removeError(e.id)}>
          {e.text}
        </ErrorCard>
      ))}
    </Container>
  );
});

export default ErrorList;
