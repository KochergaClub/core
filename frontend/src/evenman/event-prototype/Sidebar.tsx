import styled from 'styled-components';

import { Column } from '@kocherga/frontkit';

import LoadingOverlay from '../components/LoadingOverlay';
import { useEventPrototypeStore } from '../common';

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
  const store = useEventPrototypeStore();

  return (
    <Container>
      <LoadingOverlay progress={store.state === 'fetching'}>
        <EventPrototypeList selectedId={selected_id} />
      </LoadingOverlay>
      <div style={{ textAlign: 'center' }}>
        <EventPrototypeAdd store={store} />
      </div>
    </Container>
  );
};

export default Sidebar;
