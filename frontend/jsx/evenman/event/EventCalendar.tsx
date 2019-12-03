import React, { useCallback } from 'react';
import { observer, Observer } from 'mobx-react';
import { observer as liteObserver } from 'mobx-react-lite';

import Router from 'next/router';

import styled from 'styled-components';

import Toggle from 'react-toggle';

import { FaArrowDown, FaArrowUp } from 'react-icons/fa';

import { A, Button, Row, Column } from '@kocherga/frontkit';

import EventView from '../views/EventView';
import { Event } from '../stores/Event';

import MonthCalendar from '../common/MonthCalendar';

import EventCalendarItem from './EventCalendarItem';

import UnknownEventsDropdown from './UnknownEventsDropdown';

interface Props {
  view: EventView;
}

import moment from 'moment';

interface CalendarCellProps {
  events: Event[];
  view: EventView;
}

const CalendarCellContainer = styled.div`
  height: 3em;
  overflow: scroll;
`;

const CalendarCell: React.FC<CalendarCellProps> = liteObserver(
  ({ events, view }) => {
    const selectCb = useCallback(
      (id: string) => {
        Router.push('/team/evenman/event/[id]', `/team/evenman/event/${id}`);
      },
      [Router]
    );

    return (
      <CalendarCellContainer>
        {events.map(event => (
          <EventCalendarItem
            key={event.id}
            event={event}
            selected={event.id === view.eventId}
            onSelect={selectCb}
          />
        ))}
      </CalendarCellContainer>
    );
  }
);

class CalendarCellHeader extends React.Component<{
  date: moment.Moment;
  view: EventView;
}> {
  static NewButton = styled.a`
    color: black;
    text-decoration: none;
    &:hover {
      color: red;
    }
  `;

  openNewEventForm = () => {
    this.props.view.newEvent.openForm(this.props.date.format('YYYY-MM-DD'));
  };

  render() {
    return (
      <div>
        <CalendarCellHeader.NewButton
          className="CalendarCell--OnHover"
          href="#"
          onClick={this.openNewEventForm}
        >
          +
        </CalendarCellHeader.NewButton>
        {this.props.date.format('D MMMM')}
      </div>
    );
  }
}

@observer
export default class EventCalendar extends React.Component<Props, {}> {
  renderHideCheckboxes() {
    const { filter } = this.props.view;
    return (
      <Row centered>
        <UnknownEventsDropdown view={this.props.view} />
        <Toggle
          checked={filter.type === 'all'}
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            filter.setType(e.currentTarget.checked ? 'all' : 'public')
          }
        />
        <span>Приватные</span>
        <Toggle
          checked={!filter.hideAnnounced}
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            filter.setHideAnnounced(!e.currentTarget.checked)
          }
        />
        <span>Анонсированные</span>
        <Toggle
          checked={!filter.hideUnpublished}
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            filter.setHideUnpublished(!e.currentTarget.checked)
          }
        />
        <span>Неготовые</span>
      </Row>
    );
  }

  renderToolbar() {
    const { filter } = this.props.view;

    const prevDate = moment(filter.customDate).subtract(1, 'week');
    const nextDate = moment(filter.customDate).add(1, 'week');

    return (
      <div style={{ margin: '6px 0' }}>
        <Row centered>
          <Button small onClick={() => filter.setDate(prevDate)}>
            <FaArrowUp /> Назад
          </Button>
          <A
            href="#"
            onClick={e => {
              e.preventDefault();
              filter.setDate(moment());
            }}
            style={{ minWidth: 120, textAlign: 'center' }}
          >
            {moment(filter.customDate).format('MMMM YYYY')}
          </A>
          <Button small onClick={() => filter.setDate(nextDate)}>
            <FaArrowDown /> Вперёд
          </Button>
        </Row>
      </div>
    );
  }

  renderCell = (date: moment.Moment) => {
    // <Observer> is necessary because renderCell is a render prop which doesn't get observed by default.
    // See https://mobx.js.org/best/pitfalls.html#render-callbacks-are-not-part-of-the-render-method for details.
    return (
      <Observer>
        {() => (
          <CalendarCell
            events={this.props.view.filter.eventsByDate(date)}
            view={this.props.view}
          />
        )}
      </Observer>
    );
  };

  renderHeader = (date: moment.Moment) => {
    return <CalendarCellHeader view={this.props.view} date={date} />;
  };

  render() {
    const { view } = this.props;

    return (
      <Column stretch>
        {this.renderHideCheckboxes()}
        {this.renderToolbar()}
        <MonthCalendar
          date={view.filter.customDate || moment()}
          renderCell={this.renderCell}
          renderHeader={this.renderHeader}
          weeks={view.filter.weeks}
        />
      </Column>
    );
  }
}
