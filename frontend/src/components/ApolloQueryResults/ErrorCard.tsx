import { useState, useCallback } from 'react';
import styled from 'styled-components';
import { ApolloError } from '@apollo/client';

import { colors, A } from '@kocherga/frontkit';

const ShortError = styled.div`
  font-size: 1.5em;
`;

const Container = styled.div`
  padding: 20px;
  background-color: ${colors.accent[100]};
  text-align: center;
  height: 100%;
`;

const Details = styled.pre`
  overflow: auto;
  text-align: left;
`;

const DetailsLink = styled(A)`
  font-size: 0.8em;
`;

const ErrorCard: React.FC<{ error: ApolloError }> = ({ error }) => {
  const [showDump, setShowDump] = useState(false);

  const showDetails = useCallback((e: React.SyntheticEvent) => {
    e.preventDefault();
    setShowDump(true);
  }, []);

  if (!showDump) {
    return (
      <Container>
        <ShortError>ОШИБКА</ShortError>
        <DetailsLink href="#" onClick={showDetails}>
          Показать подробности
        </DetailsLink>
      </Container>
    );
  }
  return (
    <Container>
      <Details>{JSON.stringify(error, null, 2)}</Details>
    </Container>
  );
};

export default ErrorCard;
