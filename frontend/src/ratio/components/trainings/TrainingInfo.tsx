import React from 'react';
import { FaComments } from 'react-icons/fa';

import { ButtonWithModal } from '~/components';
import { A, colors, Column, Label, Row } from '~/frontkit';
import { RatioTrainingFragment } from '~/ratio/queries.generated';

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
      <Icon style={{ color: colors.grey[400] }} />
      <A href={href}>{text}</A>
    </Row>
  );
};

interface Props {
  training: RatioTrainingFragment;
}

export const TrainingInfo: React.FC<Props> = ({ training }) => {
  return (
    <Column gutter={16}>
      <h2>Настройки тренинга</h2>
      <Row>
        <ButtonWithModal title="Редактировать тренинг" size="small">
          {({ close }) => (
            <EditTrainingModal close={close} training={training} />
          )}
        </ButtonWithModal>
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
      {training.training_type !== '' ? (
        <Row vCentered>
          <Label>
            Якорь для Tilda (регистрация на тренинги типа{' '}
            {training.training_type}):
          </Label>
          <div>#kocherga_order:training_type={training.training_type}</div>
          <CopyToCl4pboardIcon
            text={`#kocherga_order:training_type=${training.training_type}`}
          />
        </Row>
      ) : null}

      {training.telegram_link && (
        <LinkWithIcon
          href={training.telegram_link}
          text="Telegram-чат"
          icon={FaComments}
        />
      )}
    </Column>
  );
};
