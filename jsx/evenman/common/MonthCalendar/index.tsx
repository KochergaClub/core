import * as React from 'react';
import { observer } from 'mobx-react-lite';

import { animated, useTransition } from 'react-spring';

import moment from 'moment';

import MonthHeader from './MonthHeader';
import Week from './Week';

import { reducer } from './reducer';

interface Props {
  date: moment.Moment;
  renderCell: (date: moment.Moment) => React.ReactNode;
  renderHeader?: (date: moment.Moment) => React.ReactNode;
  weeks: number;
}

const MonthCalendar = observer((props: Props) => {
  const [weeksState, dispatch] = React.useReducer(reducer, {
    weeks: [],
    heights: {},
  });

  React.useEffect(
    () => {
      const firstDay = moment(props.date).startOf('week');

      const result = [];
      const day = firstDay;
      do {
        result.push(moment(day));
        day.add(1, 'week');
      } while (result.length < props.weeks);

      dispatch({
        type: 'SET_WEEKS',
        payload: result,
      });
    },
    [props.date, props.weeks]
  );

  const transitions = useTransition(
    weeksState.weeks,
    week => week.format('YYYY-MM-DD'),
    {
      from: {
        opacity: 0,
        height: 0,
      },
      update: item => {
        return {
          opacity: 1,
          height: weeksState.heights[item.format('YYYY-MM-DD')] || 0,
        };
      },
      enter: item => {
        return {
          opacity: 1,
          height: weeksState.heights[item.format('YYYY-MM-DD')] || 0,
        };
      },
      leave: {
        opacity: 0,
        height: 0,
        pointerEvents: 'none',
      },
    }
  );

  const setHeight = React.useCallback((date: moment.Moment, height: number) => {
    dispatch({
      type: 'SET_SIZE',
      payload: {
        date,
        height,
      },
    });
  }, []);

  return (
    <div style={{ minHeight: 250, overflow: 'hidden' }}>
      <MonthHeader />

      {transitions.map(({ item: week, props: style, key }) => (
        <animated.div
          key={key}
          style={{
            opacity: style.opacity,
            height: style.height
              ? style.height.interpolate(height => `${height}px`)
              : 0,
          }}
        >
          <Week
            firstDay={week}
            renderCell={props.renderCell}
            renderHeader={props.renderHeader}
            setHeight={setHeight}
          />
        </animated.div>
      ))}
    </div>
  );
});

export default MonthCalendar;
