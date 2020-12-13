import { parseISO } from 'date-fns';
import React from 'react';
import { FaRegCreditCard, FaRegMoneyBillAlt } from 'react-icons/fa';

import { HumanizedDateTime, RowWithIcon } from '~/components';
import { Card } from '~/components/cards';
import { Badge, Column, Row } from '~/frontkit';

import { OfdShiftFragment } from './queries.generated';

interface Props {
  shift: OfdShiftFragment;
}

const OfdShiftCard: React.FC<Props> = ({ shift }) => {
  return (
    <Card>
      <Column>
        <Row gutter={8} vCentered>
          <small>#{shift.shift_id}</small>
          <small>
            <HumanizedDateTime date={parseISO(shift.open_dt)} />
          </small>
          {shift.close_dt ? (
            <>
              <small>—</small>
              <small>
                <HumanizedDateTime date={parseISO(shift.close_dt)} />
              </small>
              <Badge>Закрыта</Badge>
            </>
          ) : (
            <Badge type="accent">Открыта</Badge>
          )}
        </Row>
        {shift.cash ? (
          <RowWithIcon icon={FaRegMoneyBillAlt} hint="Наличный платёж">
            {shift.cash} руб.
          </RowWithIcon>
        ) : null}
        {shift.electronic ? (
          <RowWithIcon icon={FaRegCreditCard} hint="Безналичный платёж">
            {shift.electronic} руб.
          </RowWithIcon>
        ) : null}
      </Column>
    </Card>
  );
};

export default OfdShiftCard;
