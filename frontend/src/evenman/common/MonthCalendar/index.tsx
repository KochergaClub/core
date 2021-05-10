import { addWeeks, startOfWeek } from 'date-fns';
import { ru } from 'date-fns/locale';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import MonthHeader from './MonthHeader';
import Week from './Week';

interface Props {
  date: Date;
  renderCell: (date: Date) => React.ReactNode;
  renderHeader?: (date: Date) => React.ReactNode;
  weeks: number;
}

const WEEK_HEIGHT = 80;

const WeeksContainer = styled.div<{ weeks: number; weekHeight: number }>`
  display: flex;
  flex-direction: column;
  > * {
    flex: 1;
    height: ${(props) => props.weekHeight}px;
  }
  height: ${(props) => props.weekHeight * props.weeks}px;
  overflow: hidden;
`;

export const MonthCalendar = (props: Props) => {
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

      <WeeksContainer weekHeight={WEEK_HEIGHT} weeks={props.weeks}>
        <AnimatePresence initial={false}>
          {weeks.map((week, i) => (
            <motion.div
              layout="position"
              key={String(week)}
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
      </WeeksContainer>
    </div>
  );
};
