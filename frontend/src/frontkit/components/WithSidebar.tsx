import styled from 'styled-components';

import { grey } from '../colors';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  min-height: 100vh;
`;

const Sidebar = styled.div`
  background-color: ${grey[100]};
  border-right: 1px solid ${grey[300]};
  position: sticky;
  top: 0;
  height: 100vh;
`;

const Main = styled.div`
  flex: 1;
`;

export const WithSidebar = ({
  children,
  sidebar,
}: {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}) => (
  <Container>
    <Sidebar>{sidebar}</Sidebar>
    <Main>{children}</Main>
  </Container>
);
