import * as React from 'react';
import { observer, inject } from 'mobx-react';

import { Range } from 'rc-slider';

import 'rc-slider/assets/index.css';

import styled from 'styled-components';

const Wrapper = styled.div`
  & > .desktop {
    @media (max-width: 800px) {
      display: none;
    }
  }
  & > .mobile {
    @media (min-width: 800px) {
      display: none;
    }
  }
`;

const Input = styled.input`
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  width: 7em;
  @media (max-width: 350px) {
    font-size: 0.9em;
  }
`;

interface Props {
  startTime: string | null;
  endTime: string | null;
  changeValue: (lower: string, upper: string) => void;
}

type Time = [number, number];

@inject('store')
@observer
export class TimePicker extends React.Component<Props, {}> {
  timeToString(time: Time): string {
    const [hour, minute] = time;
    return `${hour < 10 ? '0' : ''}${hour}:${minute < 10 ? '0' : ''}${minute}`;
  }

  markToTime(n: number): Time {
    const hour = 9 + Math.floor((n - 18) / 2);
    const minute = n % 2 ? 30 : 0;
    return [hour, minute];
  }

  timeToMark(time: Time): number {
    const [hour, minute] = time;
    return hour * 2 + (minute < 30 ? 0 : 1);
  }

  stringToTime(s: string | null): Time {
    if (!s) {
      return [9, 0];
    }
    const match = s.match(/^(\d+):(\d+)/);
    if (!match) {
      return [9, 0];
    }
    return [parseInt(match[1], 10), parseInt(match[2], 10)];
  }

  onChangeMarks(value: number[]): void {
    const lowerBound = value[0];
    const upperBound = value[1];
    this.props.changeValue(
      this.timeToString(this.markToTime(lowerBound)),
      this.timeToString(this.markToTime(upperBound))
    );
  }

  onChangeStart(value: string) {
    this.props.changeValue(
      this.timeToString(this.stringToTime(value)),
      this.props.endTime || '09:00'
    );
  }

  onChangeEnd(value: string) {
    this.props.changeValue(
      this.props.startTime || '09:00',
      this.timeToString(this.stringToTime(value))
    );
  }

  renderDesktopRange() {
    const marks: {[i: number]: string} = {};
    for (let i = 9; i <= 24; i++) {
      const hour = i === 24 ? 0 : i;
      marks[i * 2] = `${hour}:00`;
    }
    return (
      <Range
        dots={true}
        marks={marks}
        min={18}
        max={48}
        value={[
          this.timeToMark(this.stringToTime(this.props.startTime)),
          this.timeToMark(this.stringToTime(this.props.endTime)),
        ]}
        onChange={value => this.onChangeMarks(value)}
      />
    );
  }

  renderMobileRange() {
    return (
      <div>
        От{' '}
        <Input
          type="time"
          value={this.props.startTime || undefined}
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            this.onChangeStart(e.currentTarget.value)
          }
        />{' '}
        до{' '}
        <Input
          type="time"
          value={this.props.endTime || undefined}
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            this.onChangeEnd(e.currentTarget.value)
          }
        />
      </div>
    );
  }

  render() {
    return (
      <Wrapper>
        <div className="desktop">{this.renderDesktopRange()}</div>
        <div className="mobile">{this.renderMobileRange()}</div>
      </Wrapper>
    );
  }
}
