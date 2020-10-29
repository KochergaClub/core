import Link from 'next/link';
import React from 'react';

import { Badge, MutationButton } from '~/components';
import { A, Label, Row } from '~/frontkit';

import { RatioTrainingFragment } from '../../queries.generated';
import TicketTypeBadge from '../ticket-types/TicketTypeBadge';
import { DeleteRatioTrainingDocument } from './queries.generated';

const TrainingCard: React.FC<{ training: RatioTrainingFragment }> = ({
  training,
}) => {
  return (
    <div>
      <Row spaced>
        <Link
          href="/team/ratio/training/[slug]"
          as={`/team/ratio/training/${training.slug}`}
          passHref
        >
          <A>{training.name}</A>
        </Link>
        {training.tickets_count === 0 && training.ticket_types.length === 0 && (
          <MutationButton
            mutation={DeleteRatioTrainingDocument}
            variables={{ slug: training.slug }}
            confirmText="Возможно удаление только полностью пустых тренингов, без билетов и типов билетов."
            refetchQueries={['RatioTrainings']}
            size="small"
          >
            Удалить
          </MutationButton>
        )}
      </Row>
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
              <TicketTypeBadge key={ticket_type.id} ticketType={ticket_type} />
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
