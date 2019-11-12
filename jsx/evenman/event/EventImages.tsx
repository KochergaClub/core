import { observer } from 'mobx-react';
import * as React from 'react';

import { Event } from '../stores/Event';

import EventImageWidgetDefault from './EventImageWidgetDefault';
import EventImageWidgetVk from './EventImageWidgetVk';

import { Row } from '@kocherga/frontkit';

interface Props {
  event: Event;
}

@observer
export class EventImages extends React.Component<Props, {}> {
  render() {
    if (!this.props.event.isPublic) return null;

    return (
      <Row centered gutter={12}>
        <EventImageWidgetDefault event={this.props.event} />
        <EventImageWidgetVk event={this.props.event} />
      </Row>
    );
  }
}
