import React from 'react';

import { formatDate } from '~/common/utils';

import { animated, useTransition } from 'react-spring';

import { startOfWeek, addWeeks } from 'date-fns';
import { ru } from 'date-fns/locale';

import MonthHeader from './MonthHeader';
import Week from './Week';

import { reducer } from './reducer';

interface Props {
  date: Date;
  renderCell: (date: Date) => React.ReactNode;
  renderHeader?: (date: Date) => React.ReactNode;
  weeks: number;
}

const MonthCalendar = (props: Props) => {
  const [weeksState, dispatch] = React.useReducer(reducer, {
    weeks: [],
    heights: {},
  });

  React.useEffect(() => {
    const firstDay = startOfWeek(props.date, { locale: ru });

    const result = [];
    let day = firstDay;
    do {
      result.push(day);
      day = addWeeks(day, 1);
    } while (result.length < props.weeks);

    dispatch({
      type: 'SET_WEEKS',
      payload: result,
    });
  }, [props.date, props.weeks]);

  const transitions = useTransition(
    weeksState.weeks,
    week => formatDate(week, 'yyyy-MM-dd'),
    {
      from: {
        opacity: 0,
        height: 0,
      },
      update: item => {
        return {
          opacity: 1,
          height: weeksState.heights[formatDate(item, 'yyyy-MM-dd')] || 0,
        };
      },
      enter: item => {
        return {
          opacity: 1,
          height: weeksState.heights[formatDate(item, 'yyyy-MM-dd')] || 0,
        };
      },
      leave: {
        opacity: 0,
        height: 0,
        pointerEvents: 'none',
      },
    }
  );

  const setHeight = React.useCallback((date: Date, height: number) => {
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
};

export default MonthCalendar;
