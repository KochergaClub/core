import * as React from 'react';

import { UserText, MutedSpan } from '../components/ui';

import EditableText from '../components/EditableText';

interface Props {
  summary: string;
  description: string;
  setSummary: (value: string) => Promise<any>;
  setDescription: (value: string) => Promise<any>;
}

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
          text={this.props.summary}
          empty={empty}
          save={text => this.props.setSummary(text)}
        />
        <EditableText
          title="Описание"
          text={this.props.description}
          empty={empty}
          save={text => this.props.setDescription(text)}
        />
      </div>
    );
  }
}
