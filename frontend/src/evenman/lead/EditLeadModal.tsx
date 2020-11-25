import React from 'react';
import { useForm } from 'react-hook-form';

import { useMutation } from '@apollo/client';

import { CommonModal } from '~/components';
import { BasicInputField } from '~/components/forms2';
import RichTextField from '~/components/forms2/RichTextField';
import { Column } from '~/frontkit';

import { EvenmanLeadFragment, UpdateEvenmanLeadDocument } from './queries.generated';

type FormData = {
  name: string;
  description: string;
};

interface Props {
  lead: EvenmanLeadFragment;
  close: () => void;
}

export const EditLeadModal: React.FC<Props> = ({ lead, close }) => {
  const form = useForm<FormData>();

  const [updateMutation, mutationResult] = useMutation(
    UpdateEvenmanLeadDocument
  );

  const submit = async (data: FormData) => {
    await updateMutation({
      variables: {
        input: {
          id: lead.id,
          name: data.name,
          description: data.description,
        },
      },
    });
    close();
  };

  return (
    <CommonModal
      title="Редактирование лида"
      close={close}
      submit={form.handleSubmit(submit)}
      submitOnEnter={false} // otherwise RichTextField won't behave properly
      loading={mutationResult.loading}
    >
      <form onSubmit={form.handleSubmit(submit)}>
        <Column gutter={16} stretch>
          <BasicInputField
            title="Имя"
            name="name"
            defaultValue={lead.name}
            form={form}
            required
          />
          <RichTextField
            title="Описание"
            name="description"
            defaultValue={lead.description}
            form={form}
          />
        </Column>
      </form>
    </CommonModal>
  );
};
