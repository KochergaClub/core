import styled from 'styled-components';

import EventPrototypeAdd from './EventPrototypeAdd';
import EventPrototypeList from './EventPrototypeList';

interface Props {
  selected_id?: string;
}

const Container = styled.div`
  width: 300px;
  overflow: auto;
  height: 100%;
`;

const AddContainer = styled.div`
  padding: 16px 16px 12px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const Sidebar: React.FC<Props> = ({ selected_id }) => {
  return (
    <Container>
      <AddContainer>
        <EventPrototypeAdd />
      </AddContainer>
      <EventPrototypeList selectedId={selected_id} />
    </Container>
  );
};

export default Sidebar;
