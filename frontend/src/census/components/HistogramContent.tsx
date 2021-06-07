import clsx from 'clsx';
import { scaleLinear } from 'd3-scale';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useCallback, useContext, useMemo, useState } from 'react';

import { MainContext } from '../contexts';
import { collapseTail, data2histogram, histogram2items } from '../tools';
import { Data, Histogram } from '../types';
import { LeftRight } from './LeftRight';

const HistogramV2 = ({
  histogram,
  expandTail,
}: {
  histogram: Histogram;
  expandTail: () => void;
}) => {
  const data = histogram2items(histogram);
  const { rightSideWidth, total } = useContext(MainContext);

  if (total === null || rightSideWidth === null) {
    throw new Error('context is not configured');
  }

  const barWidth = rightSideWidth - 20;
  const x = scaleLinear().domain([0, total]).range([0, barWidth]);

  return (
    <div className="space-y-1">
      <AnimatePresence initial={false}>
        {data.map((item) => {
          const barPercentage = (() => {
            if (x(item.count) <= 20) {
              return; // the bar is too short, the number won't fit
            }
            if (histogram.data.multiple && item.id === 'tail') {
              return; // percentage is meaningless for tails
            }
            return Math.round(100 * (item.count / total)) + '%';
          })();

          const special2colors = {
            normal: 'bg-primary-700 hover:bg-primary-500',
            tail: 'bg-gray-700 hover:bg-primary-500',
            empty: 'bg-primary-700 hover:bg-primary-500',
          };

          let el = (
            <LeftRight>
              <div className="text-right leading-tight break-words self-center">
                {histogram.data.shortcuts[item.name] || item.name}
              </div>
              <div className="flex items-center">
                <div
                  className={clsx(
                    'h-4 flex items-center justify-end',
                    special2colors[item.special || 'normal']
                  )}
                  style={{ width: Math.max(1, x(item.count)) }}
                >
                  {barPercentage ? (
                    <div className="text-white mr-1">{barPercentage}</div>
                  ) : null}
                </div>
                <div className="ml-1">{item.count}</div>
              </div>
            </LeftRight>
          );

          if (item.id === 'tail') {
            el = (
              <a
                className="block text-primary-700"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  expandTail();
                }}
              >
                {el}
              </a>
            );
          }
          return (
            <motion.div initial={{ y: -100 }} animate={{ y: 0 }} key={item.id}>
              {el}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

const HistogramContent = ({ name, data }: { name: string; data: Data }) => {
  const [limit, setLimit] = useState(data.limit);

  const expandTail = useCallback(() => {
    let expandCount = 10;
    if (name === 'hobby') {
      expandCount = 30;
    }
    setLimit(limit + expandCount);
  }, [limit, setLimit, name]);

  const histogram = useMemo(() => data2histogram(data), [data]);

  const collapsedHistogram = useMemo(() => {
    return collapseTail(histogram, limit);
  }, [histogram, limit]);

  return <HistogramV2 histogram={collapsedHistogram} expandTail={expandTail} />;
};

export default HistogramContent;
