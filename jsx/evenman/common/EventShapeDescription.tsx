import * as React from 'react';
import { observer } from 'mobx-react';

import EventShape from '../stores/EventShape';

import {
  UserText,
  MutedSpan,
} from '../components/ui';

import EditableText from '../components/EditableText';

interface Props {
  event: EventShape;
}

@observer
export default class EventShapeDescription extends React.Component<Props> {
  render() {
    const empty = (
      <UserText>
        <MutedSpan>Нет описания.</MutedSpan>
      </UserText>
    );

    return (
      <div>
        <EditableText
          title="Короткое описание"
          text={this.props.event.summary || ''}
          empty={empty}
          save={text => this.props.event.setSummary(text)}
        />
        <EditableText
          title="Описание"
          text={this.props.event.description || ''}
          empty={empty}
          save={text => this.props.event.setDescription(text)}
        />
      </div>
    );
  }
}
