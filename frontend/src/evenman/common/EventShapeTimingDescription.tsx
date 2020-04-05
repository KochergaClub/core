import * as React from 'react';

import { MutedSpan, UserSpan } from '../components/ui';

import EditableString from '../components/EditableString';

interface Props {
  value: string;
  setValue: (value: string) => Promise<any>;
}

export default class EventShapeTimingDescription extends React.Component<
  Props
> {
  render() {
    const value = this.props.value;
    const renderValue = () => {
      if (value) {
        return <UserSpan>{value}</UserSpan>;
      }
      return (
        <UserSpan>
          <MutedSpan>
            Встреча пройдёт в %день недели% %день% %месяца%, в %HH:MM%,
          </MutedSpan>
        </UserSpan>
      );
    };

    return (
      <EditableString
        value={value}
        renderValue={renderValue}
        save={this.props.setValue}
      />
    );
  }
}
