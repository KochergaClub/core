import React from 'react';
import { useForm } from 'react-hook-form';

import { useMutation } from '@apollo/client';

import { CommonModal } from '~/components';
import { BasicInputField } from '~/components/forms';
import { SelectField } from '~/components/forms/SelectField';
import { Column } from '~/frontkit';

import { RatioTrainingFragment } from '../../queries.generated';
import { UpdateRatioTrainingDocument } from './queries.generated';

const stringToSelectOption = (s: string): [string, string] => [
  s,
  s || '(пусто)',
];

type FormData = {
  name: string;
  discount_by_email: string;
  discount_percent_by_email: string;
  promocode_email: string;
  new_ticket_email: string;
  notion_created_email: string;
};

interface Props {
  training: RatioTrainingFragment;
  close: () => void;
}

const EditTrainingModal: React.FC<Props> = ({ training, close }) => {
  const form = useForm<FormData>();

  const [updateMutation] = useMutation(UpdateRatioTrainingDocument);

  const updateCb = async (data: FormData) => {
    await updateMutation({
      variables: {
        input: {
          id: training.id,
          name: data.name,
          discount_by_email: parseInt(data.discount_by_email, 10),
          discount_percent_by_email: parseInt(
            data.discount_percent_by_email,
            10
          ),
          promocode_email: data.promocode_email,
          new_ticket_email: data.new_ticket_email,
          notion_created_email: data.notion_created_email,
        },
      },
    });
    close();
  };

  return (
    <CommonModal
      close={close}
      title="Редактирование тренинга"
      submitLabel="Сохранить"
      loading={form.formState.isSubmitting}
      submit={form.handleSubmit(updateCb)}
    >
      <form onSubmit={form.handleSubmit(updateCb)}>
        <Column gutter={16} stretch>
          <BasicInputField
            title="Название"
            name="name"
            defaultValue={training.name}
            form={form}
            required
          />
          <BasicInputField
            title="Сумма одноразового промокода по e-mail'у"
            name="discount_by_email"
            type="number"
            defaultValue={String(training.discount_by_email)}
            form={form}
          />
          <BasicInputField
            title="Процент скидки одноразового промокода по e-mail'у"
            name="discount_percent_by_email"
            type="number"
            defaultValue={String(training.discount_percent_by_email)}
            form={form}
          />
          <SelectField
            name="promocode_email"
            title="Шаблон письма с промокодом"
            options={['notion-template', ''].map(stringToSelectOption)}
            defaultValue={training.promocode_email}
            form={form}
          />
          <SelectField
            name="new_ticket_email"
            title="Шаблон письма при регистрации"
            options={['training', 'wait-for-notion'].map(stringToSelectOption)}
            defaultValue={training.new_ticket_email}
            form={form}
            required={true}
          />
          <SelectField
            name="notion_created_email"
            title="Шаблон письма при заполнении notion-ссылки"
            options={['notion-template', ''].map(stringToSelectOption)}
            defaultValue={training.notion_created_email}
            form={form}
          />
        </Column>
      </form>
    </CommonModal>
  );
};

export default EditTrainingModal;
