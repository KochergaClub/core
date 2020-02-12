import * as React from 'react';
import { observer, inject } from 'mobx-react';

import NumericInput from 'react-numeric-input';

import { MainStore } from './store';

import { Line } from './components/layout';
import { Hint } from './components/ui';

interface Props {
  room: string | null;
  value: number | null;
  changeValue: (value: number) => void;
  store?: MainStore;
}

@inject('store')
@observer
export class PeoplePicker extends React.Component<Props, {}> {
  render() {
    const [min, max] = this.props.store!.bookingStore.getRoomLimits(
      this.props.room
    );
    let marks: {[i: number]: number} = {};
    for (let i = min; i <= max; i++) {
      marks[i] = i;
    }
    return (
      <Line>
        <NumericInput
          mobile={true}
          className="form-control"
          min={1}
          max={40}
          value={this.props.value || 0}
          onChange={valueAsNumber => this.props.changeValue(valueAsNumber || 0)}
        />
        <Hint isValid={Boolean(this.props.value && this.props.value >= min)}>
          от {min}
        </Hint>
        <Hint isValid={Boolean(this.props.value && this.props.value <= max)}>
          до {max}
        </Hint>
      </Line>
    );
  }
}
