import * as React from 'react';
import { observer, inject } from 'mobx-react';

import moment from 'moment';

import { MainStore } from './store';

import styled from 'styled-components';

import { Header, Section, Note } from './components/ui';

interface Props {
  store?: MainStore;
}

type Conflict = 'active' | 'potential' | undefined;

interface ItemProps {
  conflict: Conflict;
}

const Wrapper = styled.div`
  min-width: 220px;
`;

const DateLine = styled.small`
  display: block;
  margin-bottom: 0.5rem;
`;

const ItemDiv = styled('div')<ItemProps>`
  color: ${(props: ItemProps) =>
    props.conflict === 'active'
      ? 'red'
      : props.conflict === 'potential' ? '#ff8c00' : 'black'};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const BookingItem = ({
  room,
  startTime,
  endTime,
  conflict,
}: {
  room: string | null;
  startTime: string | null;
  endTime: string | null;
  conflict: Conflict;
}) => {
  return (
    <ItemDiv conflict={conflict}>
      <span>{room}:</span>
      <span>
        {startTime}—{endTime}
      </span>
    </ItemDiv>
  );
};

@inject('store')
@observer
export default class BookingsList extends React.Component<Props> {
  bookingStore() {
    return this.props.store!.bookingStore;
  }

  booking() {
    return this.bookingStore().booking;
  }

  renderInner() {
    if (this.bookingStore().loadingAllBookings) {
      return <Note>загружаются...</Note>;
    }

    if (!this.bookingStore().allBookings.length) {
      return <Note>отсутствуют.</Note>;
    }

    return this.bookingStore().allBookings.map((b, i) => {
      let conflict: Conflict = undefined;
      if (this.booking().conflictsByTime(b)) {
        conflict = this.booking().room === b.room ? 'active' : 'potential';
      }
      return (
        <BookingItem
          key={i}
          room={b.room}
          startTime={b.startTime}
          endTime={b.endTime}
          conflict={conflict}
        />
      );
    });
  }

  render() {
    const date = this.booking().date || moment();
    return (
      <Wrapper>
        <Section>
          <Header>
            Существующие брони
            <DateLine>на {date.format('D MMMM')}:</DateLine>
          </Header>
          {this.renderInner()}
        </Section>
      </Wrapper>
    );
  }
}
