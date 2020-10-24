// FIXME - fork of frontkit's WithSidebar
import styled from 'styled-components';

import { colors } from '~/frontkit';

const grey = colors.grey;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
`;

const Sidebar = styled.div`
  background-color: ${grey[100]};
  border-right: 1px solid ${grey[300]};
  align-self: stretch;
`;

const Main = styled.div`
  flex: 1;
  overflow: auto;
`;

export const WithSidebar: React.FC<{ sidebar: React.ReactNode }> = ({
  children,
  sidebar,
}) => (
  <Container>
    <Sidebar>{sidebar}</Sidebar>
    <Main>{children}</Main>
  </Container>
);
