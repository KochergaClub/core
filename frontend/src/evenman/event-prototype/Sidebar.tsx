import styled from 'styled-components';

import { Column } from '@kocherga/frontkit';

import EventPrototypeList from './EventPrototypeList';
import EventPrototypeAdd from './EventPrototypeAdd';

interface Props {
  selected_id?: number;
}

const Container = styled(Column).attrs({
  stretch: true,
  gutter: 8,
})`
  width: 320px;
  overflow: scroll;
  padding-bottom: 10px;
  justify-content: space-between;
  height: 100%;
`;

const Sidebar: React.FC<Props> = ({ selected_id }) => {
  return (
    <Container>
      <EventPrototypeList selectedId={String(selected_id)} />
      <div style={{ textAlign: 'center' }}>
        <EventPrototypeAdd />
      </div>
    </Container>
  );
};

export default Sidebar;
