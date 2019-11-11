import { observer } from 'mobx-react';
import * as React from 'react';

import styled from 'styled-components';

import { Column } from '@kocherga/frontkit';

import LoadingOverlay from '../components/LoadingOverlay';

import EventPrototypeView from '../views/EventPrototypeView';
import EventPrototypeList from './EventPrototypeList';
import EventPrototypeAdd from './EventPrototypeAdd';

interface Props {
  view: EventPrototypeView;
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

@observer
export default class Sidebar extends React.Component<Props, {}> {
  render() {
    const { view } = this.props;
    return (
      <Container>
        <LoadingOverlay progress={view.store.state === 'fetching'}>
          <EventPrototypeList
            selectedId={view.eventPrototypeId}
            select={ (id: number) => view.selectEventPrototype(id) }
          />
        </LoadingOverlay>
        <div style={{textAlign: 'center'}}>
          <EventPrototypeAdd store={view.root.eventPrototypeStore} />
        </div>
      </Container>
    );
  }
}
