import { addWeeks, startOfWeek } from 'date-fns';
import { ru } from 'date-fns/locale';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import MonthHeader from './MonthHeader';
import { Week } from './Week';

interface Props {
  date: Date;
  renderCell: (date: Date) => React.ReactNode;
  renderHeader: (date: Date) => React.ReactNode;
  weeks: number;
}

const WEEK_HEIGHT = 88;

export const MonthCalendar: React.FC<Props> = (props) => {
  const [weeks, setWeeks] = useState<Date[]>([]);

  useEffect(() => {
    const firstDay = startOfWeek(props.date, { locale: ru });

    const result = [];
    let day = firstDay;
    do {
      result.push(day);
      day = addWeeks(day, 1);
    } while (result.length < props.weeks);

    setWeeks(result);
  }, [props.date, props.weeks]);

  return (
    <div>
      <MonthHeader />

      <div
        className="flex flex-col overflow-hidden"
        style={{
          height: WEEK_HEIGHT * props.weeks,
        }}
      >
        <AnimatePresence initial={false}>
          {weeks.map((week, i) => (
            <motion.div
              layout="position"
              key={String(week)}
              style={{
                flex: 1,
                height: WEEK_HEIGHT,
              }}
              initial={{
                opacity: 0,
                y:
                  i === 0
                    ? `-${WEEK_HEIGHT}px`
                    : i === weeks.length - 1
                    ? `${WEEK_HEIGHT}px`
                    : 0,
              }}
              animate={{ opacity: 1, y: 0 }}
              exit={{
                opacity: 0,
                y:
                  i === 0
                    ? `-${WEEK_HEIGHT}px`
                    : i === weeks.length - 1
                    ? `${WEEK_HEIGHT}px`
                    : 0,
              }}
              transition={{ type: 'tween' }}
            >
              <Week
                firstDay={week}
                renderCell={props.renderCell}
                renderHeader={props.renderHeader}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
