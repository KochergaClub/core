import { useCallback, useState } from 'react';

import { ApolloError } from '@apollo/client';

import { A } from '~/frontkit';

const Container: React.FC = ({ children }) => (
  <div className="p-5 bg-accent-100 h-full">{children}</div>
);

export const ErrorCard: React.FC<{ error: ApolloError }> = ({ error }) => {
  const [showDump, setShowDump] = useState(false);

  const showDetails = useCallback((e: React.SyntheticEvent) => {
    e.preventDefault();
    setShowDump(true);
  }, []);

  if (!showDump) {
    return (
      <Container>
        <div className="text-2xl text-center">ОШИБКА</div>
        <A className="text-xs text-center" href="#" onClick={showDetails}>
          Показать подробности
        </A>
      </Container>
    );
  }
  return (
    <Container>
      <pre className="overflow-auto">{JSON.stringify(error, null, 2)}</pre>
    </Container>
  );
};
