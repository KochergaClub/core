import Link from 'next/link';
import React from 'react';

import { MutationButton } from '~/components';
import { A, Badge, Label, Row } from '~/frontkit';
import { adminTrainingRoute } from '~/ratio/routes';

import TicketTypeBadge from '../ticket-types/TicketTypeBadge';
import { DeleteRatioTrainingDocument, RatioTraining_SummaryFragment } from './queries.generated';

interface Props {
  training: RatioTraining_SummaryFragment;
}

const TrainingCard: React.FC<Props> = ({ training }) => {
  return (
    <div>
      <Row spaced>
        <Link href={adminTrainingRoute(training.slug)} passHref>
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
      {training.date && (
        <Row vCentered>
          <Label>Дата:</Label>
          <div>{training.date}</div>
        </Row>
      )}
      <Row vCentered>
        <Label>Билетов:</Label>
        <div>{training.tickets_count}</div>
      </Row>
      <Row vCentered>
        <Label>Суммарный доход:</Label>
        <div>{training.total_income} руб.</div>
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
