import React from 'react';
import { FaComments, FaEdit, FaPlus, FaRegListAlt } from 'react-icons/fa';

import { DropdownMenu, PaddedBlock } from '~/components';
import { ModalAction } from '~/components/DropdownMenu';
import { A, colors, Column, Label, Row } from '~/frontkit';
import { RatioTrainingFragment } from '~/ratio/queries.generated';
import { adminTrainingScheduleRoute } from '~/ratio/routes';

import CreatePromocodeModal from '../promocodes/CreatePromocodeModal';
import EditTrainingModal from './EditTrainingModal';

const LinkWithIcon = ({
  icon,
  href,
  text,
}: {
  icon: React.ElementType;
  href: string;
  text: string;
}) => {
  const Icon = icon;
  return (
    <Row vCentered>
      <Icon style={{ color: colors.grey[500] }} />
      <A href={href}>{text}</A>
    </Row>
  );
};

interface Props {
  training: RatioTrainingFragment;
}

export const TrainingInfoBlock: React.FC<Props> = ({ training }) => {
  return (
    <PaddedBlock>
      <Column>
        <Row>
          <div>Управление:</div>
          <DropdownMenu>
            <ModalAction title="Редактировать" icon={FaEdit}>
              {({ close }) => (
                <EditTrainingModal close={close} training={training} />
              )}
            </ModalAction>
            <ModalAction title="Создать промокод" icon={FaPlus}>
              {({ close }) => (
                <CreatePromocodeModal close={close} trainingId={training.id} />
              )}
            </ModalAction>
          </DropdownMenu>
        </Row>
        <Row vCentered>
          <Label>Шаблон письма с промокодом:</Label>
          <div>{training.promocode_email || '(пусто)'}</div>
        </Row>
        <Row vCentered>
          <Label>Шаблон письма при регистрации:</Label>
          <div>{training.new_ticket_email || '(пусто)'}</div>
        </Row>
        <Row vCentered>
          <Label>Шаблон письма при заполнении notion-ссылки:</Label>
          <div>{training.notion_created_email || '(пусто)'}</div>
        </Row>
        {training.date && (
          <Row vCentered>
            <Label>Когда:</Label>
            <strong>{training.date}</strong>
          </Row>
        )}

        {training.date && (
          <LinkWithIcon
            href={adminTrainingScheduleRoute(training.slug)}
            text="Расписание"
            icon={FaRegListAlt}
          />
        )}

        {training.telegram_link && (
          <LinkWithIcon
            href={training.telegram_link}
            text="Telegram-чат"
            icon={FaComments}
          />
        )}
      </Column>
    </PaddedBlock>
  );
};
