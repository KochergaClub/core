import { addWeeks, startOfWeek } from 'date-fns';
import { ru } from 'date-fns/locale';
import { useCallback, useEffect, useReducer } from 'react';
import { animated, useTransition } from 'react-spring';

import { formatDate } from '~/common/utils';

import MonthHeader from './MonthHeader';
import { reducer } from './reducer';
import Week from './Week';

interface Props {
  date: Date;
  renderCell: (date: Date) => React.ReactNode;
  renderHeader?: (date: Date) => React.ReactNode;
  weeks: number;
}

const MonthCalendar = (props: Props) => {
  const [weeksState, dispatch] = useReducer(reducer, {
    weeks: [],
    heights: {},
  });

  useEffect(() => {
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

  const normalStyle = (item: Date) => ({
    opacity: 1,
    height: weeksState.heights[formatDate(item, 'yyyy-MM-dd')] || 0,
  });

  const transitions = useTransition(
    weeksState.weeks,
    (week) => formatDate(week, 'yyyy-MM-dd'),
    {
      initial: {
        opacity: 1,
        height: 'auto',
      },
      from: {
        opacity: 0,
        height: 0,
      },
      update: normalStyle,
      enter: normalStyle,
      leave: {
        opacity: 0,
        height: 0,
        pointerEvents: 'none',
      },
    }
  );

  const setHeight = useCallback((date: Date, height: number) => {
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
        <animated.div key={key} style={style}>
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
