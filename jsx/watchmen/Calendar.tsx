import React from 'react';

import styled from 'styled-components';

import moment from 'moment';

class MonthHeader extends React.Component {
  static Container = styled.div`
    display: flex;
    width: 100%;
    & > div {
      flex: 1;
      text-align: center;
      border-top: 1px solid #ddd;
      font-size: 0.8em;
      letter-spacing: 0.0.8em;
      font-weight: bold;
    }
    & > div + div {
      border-left: 1px solid #ddd;
    }
  `;

  render() {
    return (
      <MonthHeader.Container>
        {
          ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'].map(
            weekday => <div key={weekday}>{weekday}</div>
          )
        }
      </MonthHeader.Container>
    );
  }
}

const weekMoments = (firstDay: moment.Moment) => (
  [
    firstDay,
    moment(firstDay).add(1, 'day'),
    moment(firstDay).add(2, 'day'),
    moment(firstDay).add(3, 'day'),
    moment(firstDay).add(4, 'day'),
    moment(firstDay).add(5, 'day'),
    moment(firstDay).add(6, 'day'),
  ]
);

interface WeekProps {
  firstDay : moment.Moment;
  renderCell: (date: moment.Moment) => React.ReactNode;
  renderHeader?: (date: moment.Moment) => React.ReactNode;
}

class Week extends React.Component<WeekProps> {
  static Container = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);

    & > div + div {
      border-left: 1px solid #ddd;
    }
  `;

  static Cell = styled.div<{ today: boolean }>`
    overflow: hidden;
    border-bottom: 1px solid #ddd;

    .CalendarCell--OnHover {
      visibility: hidden;
    }
    &:hover {
      .CalendarCell--OnHover {
        visibility: visible;
      }
    }

    & > header {
      text-align: right;
      background-color: ${ props => props.today ? '#777' : '#bbb' };
      font-weight: ${ props => props.today ? 'bold' : 'normal' };
      padding: 2px 4px;
      color: white;
      font-size: 0.8em;
    }

    & > div {
      overflow: hidden;
      white-space: nowrap;
    }
  `;

  render() {
    const { firstDay, renderCell, renderHeader } = this.props;
    return (
      <Week.Container>
        {
          weekMoments(firstDay).map(
            (day, i) => {
              const today = moment(day).startOf('day').isSame(moment().startOf('day'));
              return (
                <Week.Cell
                  key={i}
                  today={today}
                >
                  <header>
                    {renderHeader ? renderHeader(day) : day.format('D MMMM')}
                  </header>
                  <div>
                    {renderCell(day)}
                  </div>
                </Week.Cell>
              );
            }
          )
        }
      </Week.Container>
    );
  }
}

interface Props {
  date: moment.Moment;
  renderCell: (date: moment.Moment) => React.ReactNode;
  renderHeader?: (date: moment.Moment) => React.ReactNode;
  weeks: number;
}

export default class MonthCalendar extends React.Component<Props> {
  get weeks(): moment.Moment[] {
    const firstDay = moment(this.props.date).startOf('week');
    // const lastDay = moment(this.props.date).endOf('month').endOf('week');

    const result = [];
    const day = firstDay;
    do {
      result.push(moment(day));
      day.add(1, 'week');
    } while (result.length < this.props.weeks);

    return result;
  }

  render() {
    return (
      <div style={{minHeight: 250}}>
        <MonthHeader />
          {
            this.weeks.map(
              week => (
                <Week
                  firstDay={week}
                  renderCell={this.props.renderCell}
                  renderHeader={this.props.renderHeader}
                />
              )
            )
          }
      </div>
    );
  }
}
