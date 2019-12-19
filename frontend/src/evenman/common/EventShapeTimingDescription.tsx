import * as React from 'react';
import { observer } from 'mobx-react';

import EventShape from '../stores/EventShape';

import {
  MutedSpan,
  UserSpan,
} from '../components/ui';

import EditableString from '../components/EditableString';

interface Props {
  event: EventShape;
}

@observer
export default class EventShapeTimingDescription extends React.Component<Props> {
  render() {
    const value = this.props.event.timing_description_override;
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
        save={v => this.props.event.setTimingDescriptionOverride(v)}
      />
    );
  }
}
