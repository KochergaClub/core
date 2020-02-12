import * as React from 'react';
import { observer, inject } from 'mobx-react';

import { AuthButton } from './AuthButton';

import { MainStore, Booking } from './store';

import { Header, Section, Note } from './components/ui';

import styled from 'styled-components';

import { Icon } from 'react-icons-kit';
import { user as userIcon } from 'react-icons-kit/fa/user';
import { users as usersIcon } from 'react-icons-kit/fa/users';
import { close as closeIcon } from 'react-icons-kit/fa/close';

interface Props {
  store?: MainStore;
  booking: Booking;
}

const MyBookingDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;

  @media (max-width: 900px) {
    margin-bottom: 6px;
  }

  & > :first-child {
    margin-right: 12px;
  }
  & > * {
    white-space: nowrap;
  }
`;

@inject('store')
@observer
class MyBooking extends React.Component<Props, {}> {
  cancel(e: React.SyntheticEvent<EventTarget>) {
    e.preventDefault();
    this.props.store!.bookingStore.cancelBooking(this.props.booking.eventId!);
  }
  render() {
    const booking = this.props.booking;
    return (
      <MyBookingDiv>
        <span>
        {booking.room}
        {
          booking.people &&
          (
            <span className="line-with-icons">
              ,&nbsp;
              {booking.people}&nbsp;
              <Icon size={16} icon={booking.people! > 1 ? usersIcon : userIcon} />
            </span>
          )
        }
        </span>
        <span>
        {booking.date!.format('D MMMM')},{' '}
        {booking.startTime}—{booking.endTime}{' '}
        <a href="#" onClick={e => this.cancel(e)}>
          <Icon size={16} icon={closeIcon} />
        </a>
        </span>
      </MyBookingDiv>
    );
  }
}

interface ListProps {
  store?: MainStore;
}

@inject('store')
@observer
class MyBookingsList extends React.Component<ListProps, {}> {
  bookingStore() {
    return this.props.store!.bookingStore;
  }

  renderList() {
    if (!this.props.store!.authStore.token) {
      return <AuthButton />;
    }

    if (this.bookingStore().loadingMyBookings) {
      return <Note>загружаются...</Note>;
    }

    if (!this.bookingStore().myBookings.length) {
      return <Note>отсутствуют.</Note>;
    }
    return (
      <React.Fragment>
        {this.bookingStore().myBookings.map(b => (
          <MyBooking booking={b} key={b.eventId!} />
        ))}
      </React.Fragment>
    );
  }

  render() {
    return (
      <Section>
        <Header>Мои брони:</Header>
        {this.renderList()}
      </Section>
    );
  }
}
export default MyBookingsList;
