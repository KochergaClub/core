import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';

import { CommonModal } from '~/components';
import { BasicInputField } from '~/components/forms2';
import { Column } from '~/frontkit';

import { CommonFormData, CommonImageFields } from './CommonImageFields';
import { WagtailUploadImageFromUrlMutationVariables } from './queries.generated';
import { Defaults } from './types';

type Props = {
  close: () => void;
  save: (
    params: WagtailUploadImageFromUrlMutationVariables['input']
  ) => Promise<void>;
  defaults: Defaults;
};

type FormData = CommonFormData & {
  url: string;
};

export const UploadFromUrlModal: React.FC<Props> = ({
  close,
  save,
  defaults,
}) => {
  const form = useForm<FormData>({
    defaultValues: {
      url: '',
      title: defaults.title,
      basename: defaults.basename,
    },
  });

  const [submitError, setSubmitError] = useState('');

  const submit = useCallback(
    async ({ url, title, basename, collection }: FormData) => {
      try {
        await save({ url, title, basename, collection_id: collection.value });
        close();
      } catch (e) {
        setSubmitError(String(e));
      }
    },
    [save, close]
  );

  return (
    <CommonModal
      submit={form.handleSubmit(submit)}
      title="Загрузка картинки по ссылке"
      close={close}
      buttonText="Сохранить"
      submitError={submitError}
      loading={form.formState.isSubmitting}
    >
      <form onSubmit={form.handleSubmit(submit)}>
        <Column stretch gutter={16}>
          <BasicInputField
            title="Прямая ссылка на картинку"
            name="url"
            type="url"
            required
            form={form}
          />
          <CommonImageFields
            form={form}
            defaultCollectionId={defaults.collectionId}
          />
        </Column>
      </form>
    </CommonModal>
  );
};
