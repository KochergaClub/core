import { addWeeks, startOfWeek } from 'date-fns';
import { ru } from 'date-fns/locale';
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion';
import React, { useMemo } from 'react';

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
  const weeks = useMemo(() => {
    const firstDay = startOfWeek(props.date, { locale: ru });

    const result = [];
    let day = firstDay;
    do {
      result.push(day);
      day = addWeeks(day, 1);
    } while (result.length < props.weeks);

    return result;
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
        <AnimateSharedLayout>
          <motion.div layout className="relative">
            <AnimatePresence initial={false}>
              {weeks.map((week, i) => (
                <motion.div
                  key={String(week)}
                  layout="position"
                  style={{
                    height: WEEK_HEIGHT,
                    backgroundColor: 'white',
                  }}
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 1,
                  }}
                  exit={{
                    opacity: 0,
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
              {/* fake div outside of viewable area to fix animations */}
              <motion.div
                key={String(addWeeks(weeks[weeks.length - 1], 1))}
                layout="position"
                style={{
                  height: WEEK_HEIGHT,
                  backgroundColor: 'white',
                }}
              />
            </AnimatePresence>
          </motion.div>
        </AnimateSharedLayout>
      </div>
    </div>
  );
};
