import React from 'react';

import { SmartMutationModal } from '~/components/forms/SmartMutationModal';

import { RatioTrainingFragment } from '../../queries.generated';
import { UpdateRatioTrainingDocument } from './queries.generated';

const stringToSelectOption = (s: string): [string, string] => [
  s,
  s || '(пусто)',
];

const shape = [
  {
    type: 'string',
    name: 'name',
    title: 'Название',
  },
  {
    name: 'training_type',
    title: 'Тип тренинга (для фильтрации билетов в платёжке)',
    type: 'string',
    optional: true,
  },
  {
    name: 'date',
    optional: true,
    title: 'Дата начала',
    type: 'date',
  },
  {
    title: "Сумма одноразового промокода по e-mail'у",
    name: 'discount_by_email',
    type: 'number',
  },
  {
    title: "Процент скидки одноразового промокода по e-mail'у",
    name: 'discount_percent_by_email',
    type: 'number',
  },
  {
    name: 'promocode_email',
    type: 'choice',
    title: 'Шаблон письма с промокодом',
    options: ['notion-template', ''].map(stringToSelectOption),
    optional: true,
  },
  {
    name: 'new_ticket_email',
    type: 'choice',
    title: 'Шаблон письма при регистрации',
    options: ['training', 'wait-for-notion'].map(stringToSelectOption),
    optional: true,
  },
  {
    name: 'notion_created_email',
    type: 'choice',
    title: 'Шаблон письма при заполнении notion-ссылки',
    options: ['notion-template', ''].map(stringToSelectOption),
    optional: true,
  },
] as const;

interface Props {
  training: RatioTrainingFragment;
  close: () => void;
}

const EditTrainingModal: React.FC<Props> = ({ training, close }) => {
  return (
    <SmartMutationModal
      close={close}
      title="Редактирование тренинга"
      submitLabel="Сохранить"
      shape={shape}
      expectedTypename="RatioTraining"
      mutation={UpdateRatioTrainingDocument}
      defaultValues={{
        name: training.name,
        training_type: training.training_type,
        date: training.date || undefined,
        discount_by_email: String(training.discount_by_email),
        discount_percent_by_email: String(training.discount_percent_by_email),
        promocode_email: training.promocode_email,
        new_ticket_email: training.new_ticket_email,
        notion_created_email: training.notion_created_email,
      }}
      valuesToVariables={(values) => ({
        input: {
          id: training.id,
          name: values.name,
          training_type: values.training_type,
          date: values.date,
          discount_by_email: parseInt(values.discount_by_email, 10),
          discount_percent_by_email: parseInt(
            values.discount_percent_by_email,
            10
          ),
          promocode_email: values.promocode_email,
          new_ticket_email: values.new_ticket_email,
          notion_created_email: values.notion_created_email,
        },
      })}
    />
  );
};

export default EditTrainingModal;
