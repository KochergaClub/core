import { observer } from 'mobx-react';
import * as React from 'react';

import EventPrototypeView from '../views/EventPrototypeView';
import EventPrototypeCard from './EventPrototypeCard';

import Sidebar from './Sidebar';
import { EmptyCard } from '../components/Card';
import LoadingOverlay from '../components/LoadingOverlay';

import { WithSidebar } from '../WithSidebar';

interface Props {
  view: EventPrototypeView;
}

@observer
export default class EventPrototypeScreen extends React.Component<Props, {}> {
  renderCard() {
    const { view } = this.props;

    const selected = view.selectedEventPrototype;
    if (selected) {
      return <EventPrototypeCard prototype={selected} />;
    }

    return (
      <LoadingOverlay progress={view.store.state === 'fetching'}>
        <EmptyCard>Выберите прототип события</EmptyCard>
      </LoadingOverlay>
    );
  }

  render() {
    return (
      <WithSidebar sidebar={<Sidebar view={this.props.view} />}>
        {this.renderCard()}
      </WithSidebar>
    );
  }
}
