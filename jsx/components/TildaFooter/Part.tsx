import React from 'react';

import styled from 'styled-components';

interface Props {
  title: string;
  children: React.ReactNode;
}

const Header = styled.header`
  text-transform: uppercase;
  color: #525252;
  letter-spacing: 1px;
  margin-bottom: 8px;
`;

const Container = styled.div`
  flex: 1;
`;

const Part = (props: Props) => {
  return (
    <Container>
      <Header>{props.title}</Header>
      {props.children}
    </Container>
  );
};

export default Part;
