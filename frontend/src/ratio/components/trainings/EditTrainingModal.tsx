import React from 'react';
import { useForm } from 'react-hook-form';

import { useMutation } from '@apollo/client';

import { BasicInputField, FieldContainer } from '~/components/forms2';
import { Button, Column, ControlsFooter, Input, Modal, Row } from '~/frontkit';

import { RatioTrainingFragment } from '../../queries.generated';
import { UpdateRatioTrainingDocument } from './queries.generated';

interface Props {
  training: RatioTrainingFragment;
  close: () => void;
}

const EditTrainingModal: React.FC<Props> = ({ training, close }) => {
  type FormData = {
    name: string;
    discount_by_email: string;
    discount_percent_by_email: string;
  };

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
