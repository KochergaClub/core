import * as React from 'react';
import { observer, inject } from 'mobx-react';
import * as ReactGA from 'react-ga';

import moment from 'moment';
import 'moment/locale/ru';

import { Button, Form } from 'reactstrap';

import { MainStore } from './store';

import { TimePicker } from './TimePicker';
import { DatePicker } from './DatePicker';
import { PeoplePicker } from './PeoplePicker';
import { RoomPicker } from './RoomPicker';
import { AuthButton } from './AuthButton';

import MyBookingsList from './MyBookingsList';
import BookingsList from './BookingsList';

import FormSection from './FormSection';

import { Line, SmallColumn } from './components/layout';
import { Card } from './components/ui';

import styled from 'styled-components';

interface Props {
  store?: MainStore;
}

interface State {
  submitting: boolean;
  outcome?: {
    message: string;
    type: string;
  };
}

const MainLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 800px) {
    flex-direction: row;
    align-items: flex-start;

    & > * + * {
      margin-left: 30px;
    }
  }
`;

@inject('store')
@observer
export class Main extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      submitting: false,
    };
  }

  async submit() {
    ReactGA.event({
      category: 'Form',
      action: 'Submit',
      label: this.booking().room!,
    });
    this.setState({
      submitting: true,
    });

    try {
      await this.bookingStore().create();

      this.setState({
        submitting: false,
        outcome: {
          message: 'Комната успешно забронирована!',
          type: 'success',
        },
      });
      ReactGA.event({
        category: 'Outcome',
        action: 'Booked',
        label: this.booking().room!,
        nonInteraction: true,
        value: this.booking().people || 1,
      });
    } catch (e) {
      this.setState({
        submitting: false,
        outcome: {
          message: e.message || 'Неизвестная ошибка',
          type: 'danger',
        },
      });
      ReactGA.event({
        category: 'Outcome',
        action: 'Booking failed',
        label: e.message || 'Unknown',
        nonInteraction: true,
      });
    }
  }

  renderBookButton() {
    const canCreate = this.bookingStore().canCreate;
    const color = canCreate ? 'primary' : 'secondary';
    return (
      <Button
        color={color}
        className="book-button"
        disabled={!canCreate}
        onClick={() => this.submit()}
      >
        Забронировать
      </Button>
    );
  }

  renderOutcome() {
    if (!this.state.outcome) {
      return;
    }
    return (
      <div className={'alert alert-' + this.state.outcome.type}>
        {this.state.outcome.message}
      </div>
    );
  }

  booking() {
    return this.bookingStore().booking;
  }

  bookingStore() {
    return this.props.store!.bookingStore;
  }

  renderContacts() {
    return (
      <Line>
        {this.props.store!.authStore.email}&nbsp;<AuthButton />
      </Line>
    );
  }

  roomSectionValid() {
    return (
      !this.booking().room ||
      this.bookingStore().checkIfRoomIsPossible(this.booking().room!)
    );
  }

  renderPeoplePicker() {
    return (
      <PeoplePicker
        room={this.booking().room}
        value={this.booking().people}
        changeValue={value => this.booking().setPeople(value)}
      />
    );
  }

  renderRoomPicker() {
    return (
      <RoomPicker
        possibleRooms={this.bookingStore().possibleRooms}
        room={this.booking().room}
        setRoom={room => this.booking().setRoom(room)}
      />
    );
  }

  renderDatePicker() {
    const setDate = (date: moment.Moment | null) => {
      ReactGA.event({
        category: 'Form',
        action: 'Set date',
      });
      this.booking().setDate(date);
      this.bookingStore().loadAllBookings();
    };
    return (
      <DatePicker
        date={this.booking().date}
        changeValue={setDate}
      />
    );
  }

  renderTimePicker() {
    const updateTime = (startTime: string, endTime: string) => {
      ReactGA.event({
        category: 'Form',
        action: 'Set time',
      });
      this.booking().setStartTime(startTime);
      this.booking().setEndTime(endTime);
    };
    return (
      <div style={{ marginLeft: 5 }}>
        <TimePicker
          startTime={this.booking().startTime}
          endTime={this.booking().endTime}
          changeValue={(s, e) => updateTime(s, e)}
        />
      </div>
    );
  }

  renderForm() {
    return (
      <Form>
        <fieldset disabled={this.state.submitting}>
          <FormSection
            title="Контакты"
            valid={!!this.props.store!.authStore.token}
          >
            {this.renderContacts()}
          </FormSection>
          <FormSection title="Число людей" valid={this.booking().isPeopleValid}>
            {this.renderPeoplePicker()}
          </FormSection>
          <FormSection title="Дата" valid={this.booking().isDateValid}>
            {this.renderDatePicker()}
          </FormSection>
          <FormSection title="Время" valid={this.booking().isTimeValid}>
            {this.renderTimePicker()}
          </FormSection>
          <FormSection title="Комната" valid={this.roomSectionValid()}>
            {this.renderRoomPicker()}
          </FormSection>
          <FormSection>
            {this.renderBookButton()}
            {this.renderOutcome()}
          </FormSection>
        </fieldset>
      </Form>
    );
  }

  render() {
    return (
      <Card>
        <MainLayout>
          <div style={{ flex: 1, alignSelf: 'stretch' }}>{this.renderForm()}</div>
          <SmallColumn>
            <MyBookingsList />
            <BookingsList />
          </SmallColumn>
        </MainLayout>
      </Card>
    );
  }
}
