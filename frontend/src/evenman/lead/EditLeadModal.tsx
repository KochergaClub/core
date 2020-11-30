import React from 'react';
import { useForm } from 'react-hook-form';

import { useMutation } from '@apollo/client';

import { CommonModal } from '~/components';
import { FormShapeFields } from '~/components/forms/FormShapeFields';

import { EvenmanLeadFragment, UpdateEvenmanLeadDocument } from './queries.generated';

const shape = [
  {
    name: 'name',
    type: 'string',
    title: 'Имя',
  },
  {
    name: 'description',
    type: 'richtext',
    title: 'Описание',
    optional: true,
  },
] as const;

type FormData = {
  name: string;
  description: string;
};

interface Props {
  lead: EvenmanLeadFragment;
  close: () => void;
}

export const EditLeadModal: React.FC<Props> = ({ lead, close }) => {
  const form = useForm<FormData>({
    defaultValues: {
      name: lead.name,
      description: lead.description,
    },
  });

  const [updateMutation] = useMutation(UpdateEvenmanLeadDocument);

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
      loading={form.formState.isSubmitting}
    >
      <form onSubmit={form.handleSubmit(submit)}>
        <FormShapeFields shape={shape} form={form} />
      </form>
    </CommonModal>
  );
};
