import React from 'react';
import { observer, Observer } from 'mobx-react';

import Toggle from 'react-toggle';

import moment from 'moment';

import { FaArrowDown, FaArrowUp } from 'react-icons/fa';

import { A, Button, Row, Column } from '@kocherga/frontkit';

import { EventFilter } from '../../stores/EventFilter';

import MonthCalendar from '../../common/MonthCalendar';

import UnknownEventsDropdown from '../UnknownEventsDropdown';

import CalendarCellHeader from './CalendarCellHeader';
import CalendarCell from './CalendarCell';

interface Props {
  filter: EventFilter;
  selected_id?: string;
}

@observer
export default class EventCalendar extends React.Component<Props> {
  renderHideCheckboxes() {
    const { filter } = this.props;
    return (
      <Row centered>
        <UnknownEventsDropdown filter={filter} />
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
    const { filter } = this.props;

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
            events={this.props.filter.eventsByDate(date)}
            selected_id={this.props.selected_id}
          />
        )}
      </Observer>
    );
  };

  renderHeader = (date: moment.Moment) => {
    return <CalendarCellHeader date={date} />;
  };

  render() {
    const { filter } = this.props;

    return (
      <Column stretch>
        {this.renderHideCheckboxes()}
        {this.renderToolbar()}
        <MonthCalendar
          date={filter.customDate || moment()}
          renderCell={this.renderCell}
          renderHeader={this.renderHeader}
          weeks={filter.weeks}
        />
      </Column>
    );
  }
}
