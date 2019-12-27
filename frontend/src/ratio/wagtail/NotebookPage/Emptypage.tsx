import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  break-after: page;
`;

const Emptypage = () => <Container>&nbsp;</Container>;

export default Emptypage;
