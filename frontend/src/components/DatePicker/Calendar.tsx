import { addDays, eachWeekOfInterval, isSameDay } from 'date-fns';
import React from 'react';
import styled from 'styled-components';

import { range } from '~/common/utils';
import { colors, Column, fonts, Row } from '~/frontkit';

const Container = styled.div`
  padding: 8px;
`;

const Day = styled.div<{ selected?: boolean; today?: boolean }>`
  width: 32px;
  text-align: center;
  padding: 4px;
  border-radius: 4px;
  font-size: ${fonts.sizes.S};
  font-weight: ${(props) => (props.today ? 'bold' : 'normal')};
  cursor: pointer;
  ${(props) =>
    props.selected
      ? `
        color: white;
        background-color: ${colors.primary[500]};
    `
      : ''}
  &:hover {
    background-color: ${(props) =>
      props.selected ? colors.primary[700] : colors.grey[300]};
  }
`;

type Props = {
  start: Date;
  end: Date;
  selected?: Date;
  onChange: (value: Date) => void;
};

export const Calendar: React.FC<Props> = ({
  start,
  end,
  selected,
  onChange,
}) => {
  return (
    <Container>
      <Column>
        {eachWeekOfInterval(
          {
            start,
            end,
          },
          { weekStartsOn: 1 }
        ).map((weekStart, i) => (
          <Row key={i}>
            {range(7).map((n) => {
              const date = addDays(weekStart, n);
              return (
                <Day
                  key={n}
                  today={isSameDay(new Date(), date)}
                  selected={selected && isSameDay(selected, date)}
                  onClick={() => onChange(date)}
                >
                  {date.getDate()}
                </Day>
              );
            })}
          </Row>
        ))}
      </Column>
    </Container>
  );
};
