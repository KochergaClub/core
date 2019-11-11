import * as React from 'react';
import { observer } from 'mobx-react';

import EditableString from '../components/EditableString';

import { Event } from '../stores/Event';

import { Row } from '@kocherga/frontkit';

import { MutedSpan } from '../components/ui';

interface Props {
  event: Event;
}

@observer
export default class EventVisitors extends React.Component<Props, {}> {
  renderValue = () => {
    const { visitors } = this.props.event;
    if (!visitors) {
      return <MutedSpan>ввести</MutedSpan>;
    }
    return <strong>{visitors}</strong>;
  };

  render() {
    const { visitors } = this.props.event;

    return (
      <Row gutter={4}>
        <div>Число участников:</div>
        <EditableString
          value={visitors}
          save={value => this.props.event.setVisitors(value)}
          renderValue={this.renderValue}
        />
      </Row>
    );
  }
}
