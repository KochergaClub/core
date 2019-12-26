import styled from 'styled-components';
import { useEffect, useState } from 'react';

import { FaSpinner } from 'react-icons/fa';

import { Row } from '@kocherga/frontkit';

export type Size = 'block' | 'div';

const AnimatedSpinner = styled(FaSpinner)`
  animation: icon-spin 2s infinite linear;

  @keyframes icon-spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(359deg);
    }
  }
`;

const BlockContainer = styled.div`
  min-height: 80vh;
  padding-top: 20vh;
  font-size: 2em;
`;

const DELAY = 500;

const Spinner: React.FC<{ size: Size }> = ({ size }) => {
  const [appear, setAppear] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setAppear(true);
    }, DELAY);
  }, []);

  if (size === 'block') {
    return (
      <BlockContainer>
        <Row centered>{appear && <AnimatedSpinner />}</Row>
      </BlockContainer>
    );
  } else {
    return <Row centered>{appear && <AnimatedSpinner />}</Row>;
  }
};

export default Spinner;
