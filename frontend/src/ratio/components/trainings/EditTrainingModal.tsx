import get from 'lodash/get';
import React from 'react';
import { Controller, FieldError, useForm, UseFormMethods } from 'react-hook-form';
import Select from 'react-select';

import { useMutation } from '@apollo/client';

import { BasicInputField, FieldContainer } from '~/components/forms2';
import { Button, Column, ControlsFooter, Modal } from '~/frontkit';

import { RatioTrainingFragment } from '../../queries.generated';
import { UpdateRatioTrainingDocument } from './queries.generated';

type SelectOptionType = {
  value: string;
  label: string;
};

const stringToOption = (s: string): SelectOptionType => ({
  value: s,
  label: s || '(пусто)',
});

type FormData = {
  name: string;
  discount_by_email: string;
  discount_percent_by_email: string;
  promocode_email: SelectOptionType;
  new_ticket_email: SelectOptionType;
  notion_created_email: SelectOptionType;
};

const DumbSelectField: React.FC<{
  field: keyof FormData;
  title: string;
  values: string[];
  defaultValue: string;
  form: UseFormMethods<FormData>;
}> = ({ field, title, values, defaultValue, form }) => (
  <FieldContainer title={title} error={get(form.errors, field) as FieldError}>
    <Controller
      name={field}
      as={Select}
      menuPortalTarget={document.body}
      styles={{
        menuPortal: (base: any) => ({
          ...base,
          zIndex: 1500,
        }),
      }}
      placeholder="Выбрать..."
      options={values.map(stringToOption)}
      defaultValue={stringToOption(defaultValue)}
      control={form.control}
      rules={{ required: true }}
    />
  </FieldContainer>
);

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
          promocode_email: data.promocode_email.value,
          new_ticket_email: data.new_ticket_email.value,
          notion_created_email: data.notion_created_email.value,
        },
      },
    });
    close();
  };

  return (
    <Modal>
      <Modal.Header close={close}>Редактирование тренинга</Modal.Header>
      <form onSubmit={form.handleSubmit(updateCb)}>
        <Modal.Body>
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
            <DumbSelectField
              field="promocode_email"
              title="Шаблон письма с промокодом"
              values={['notion-template', '']}
              defaultValue={training.promocode_email}
              form={form}
            />
            <DumbSelectField
              field="new_ticket_email"
              title="Шаблон письма при регистрации"
              values={['training', 'wait-for-notion']}
              defaultValue={training.new_ticket_email}
              form={form}
            />
            <DumbSelectField
              field="notion_created_email"
              title="Шаблон письма при заполнении notion-ссылки"
              values={['notion-template', '']}
              defaultValue={training.notion_created_email}
              form={form}
            />
          </Column>
        </Modal.Body>
        <Modal.Footer>
          <ControlsFooter>
            <Button
              loading={form.formState.isSubmitting}
              disabled={form.formState.isSubmitting}
              kind="primary"
              type="submit"
            >
              Сохранить
            </Button>
          </ControlsFooter>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default EditTrainingModal;
