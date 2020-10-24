import Link from 'next/link';
import React from 'react';

import { A, Label, Row } from '~/frontkit';

import { Badge } from '~/components';

import { RatioTrainingFragment } from '../queries.generated';

const TrainingCard: React.FC<{ training: RatioTrainingFragment }> = ({
  training,
}) => {
  return (
    <div>
      <Link
        href="/team/ratio/training/[slug]"
        as={`/team/ratio/training/${training.slug}`}
        passHref
      >
        <A>{training.name}</A>
      </Link>
      <Row vCentered>
        <Label>Дата:</Label>
        <div>{training.date}</div>
      </Row>
      <Row vCentered>
        <Label>Билетов:</Label>
        <div>{training.tickets_count}</div>
      </Row>
      <Row vCentered>
        <Label>Суммарный доход:</Label>
        <div>{training.total_income}</div>
      </Row>
      {training.telegram_link && (
        <Row vCentered>
          <Label>Telegram-чат:</Label>
          <A href={training.telegram_link}>{training.telegram_link}</A>
        </Row>
      )}
      <Row vCentered>
        <Label>Виды билетов:</Label>
        {training.ticket_types.length ? (
          <Row>
            {training.ticket_types.map((ticket_type) => (
              <Badge key={ticket_type.id}>{ticket_type.price} руб.</Badge>
            ))}
          </Row>
        ) : (
          <Badge type="accent">не настроены</Badge>
        )}
      </Row>
    </div>
  );
};

export default TrainingCard;
