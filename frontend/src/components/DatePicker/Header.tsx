import { add, sub } from 'date-fns';
import React, { useCallback } from 'react';
import { BiCaretLeft, BiCaretRight } from 'react-icons/bi';
import styled from 'styled-components';

import { formatDate } from '~/common/utils';
import { colors, Column, fonts, Row } from '~/frontkit';

const Container = styled.div`
  padding: 8px;
  border-bottom: 1px solid ${colors.grey[300]};
  background-color: ${colors.grey[200]};
`;

const Title = styled.div`
  font-weight: bold;
`;

const IconContainer = styled.div`
  font-size: 20px;
  line-height: 1;
  cursor: pointer;
  color: ${colors.grey[400]};
  &:hover {
    color: ${colors.grey[600]};
  }
`;

const Weekday = styled.div`
  width: 32px;
  text-align: center;
  font-size: ${fonts.sizes.SM};
`;

type Props = {
  date: Date;
  onViewChange: (value: Date) => void;
};

export const Header: React.FC<Props> = ({ date, onViewChange }) => {
  const back = useCallback(() => {
    onViewChange(sub(date, { months: 1 }));
  }, [date, onViewChange]);

  const forward = useCallback(() => {
    onViewChange(add(date, { months: 1 }));
  }, [date, onViewChange]);

  return (
    <Container>
      <Column>
        <Row spaced vCentered>
          <IconContainer>
            <BiCaretLeft onClick={back} />
          </IconContainer>
          <Title>{formatDate(date, 'LLLL yyyy')}</Title>
          <IconContainer>
            <BiCaretRight onClick={forward} />
          </IconContainer>
        </Row>
        <Row>
          {['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'].map((weekday) => (
            <Weekday key={weekday}>{weekday}</Weekday>
          ))}
        </Row>
      </Column>
    </Container>
  );
};
