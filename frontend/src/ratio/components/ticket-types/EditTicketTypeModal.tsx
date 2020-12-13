import React from 'react';
import { useForm } from 'react-hook-form';

import { useMutation } from '@apollo/client';

import { useFocusOnFirstInput } from '~/common/hooks';
import { CommonModal } from '~/components';
import { BasicInputField } from '~/components/forms';
import { Column } from '~/frontkit';

import { RatioTicketTypeFragment } from '../../queries.generated';
import { UpdateRatioTicketTypeDocument } from './queries.generated';

interface Props {
  ticketType: RatioTicketTypeFragment;
  close: () => void;
}

const EditTicketTypeModal: React.FC<Props> = ({ ticketType, close }) => {
  type FormData = {
    name: string;
    price: string;
    discount_by_email: string;
    discount_percent_by_email: string;
  };

  const form = useForm<FormData>();

  const [updateMutation] = useMutation(UpdateRatioTicketTypeDocument);

  const updateCb = async (data: FormData) => {
    await updateMutation({
      variables: {
        input: {
          id: ticketType.id,
          price: parseInt(data.price, 10),
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

  const formRef = useFocusOnFirstInput();

  return (
    <CommonModal
      close={close}
      title="Редактирование типа билета"
      submit={form.handleSubmit(updateCb)}
      submitLabel="Сохранить"
      loading={form.formState.isSubmitting}
    >
      <form onSubmit={form.handleSubmit(updateCb)} ref={formRef}>
        <Column gutter={16} stretch>
          <small>
            Якорь для Тильды:{' '}
            <code>#kocherga_order:ticket_type={ticketType.id}</code>
          </small>
          <BasicInputField
            title="Название"
            name="name"
            defaultValue={ticketType.name}
            form={form}
            required
          />
          <BasicInputField
            title="Стоимость"
            name="price"
            type="number"
            defaultValue={String(ticketType.price)}
            form={form}
            required
          />
          <BasicInputField
            title="Сумма одноразового промокода по e-mail'у"
            name="discount_by_email"
            type="number"
            defaultValue={String(ticketType.discount_by_email)}
            form={form}
          />
          <BasicInputField
            title="Процент скидки одноразового промокода по e-mail'у"
            name="discount_percent_by_email"
            type="number"
            defaultValue={String(ticketType.discount_percent_by_email)}
            form={form}
          />
        </Column>
      </form>
    </CommonModal>
  );
};

export default EditTicketTypeModal;
