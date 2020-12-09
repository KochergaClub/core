import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';

import { useAPI } from '~/common/hooks';
import { CommonModal } from '~/components';

import { CommonFormData, CommonImageFields } from './CommonImageFields';
import { Defaults } from './types';

type Props = {
  file: File;
  close: () => void;
  onChange: (id: string) => Promise<unknown>;
  defaults: Defaults;
};

export const UploadFromFileModal: React.FC<Props> = ({
  file,
  close,
  onChange,
  defaults,
}) => {
  const api = useAPI();
  const form = useForm<CommonFormData>({
    defaultValues: {
      title: defaults.title,
      basename: defaults.basename, // TODO - or file.name?
    },
  });

  const [submitError, setSubmitError] = useState('');

  const submit = useCallback(
    async ({ title, basename, collection }: CommonFormData) => {
      console.log('submitting');
      try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('title', title);
        formData.append('basename', basename);
        formData.append('collection_id', collection.value);

        const result = await api.call(
          'wagtail/upload_image',
          'POST',
          formData,
          {
            stringifyPayload: false,
          }
        );
        const image_id = result.id;
        await onChange(image_id);
        close();
      } catch (e) {
        setSubmitError(String(e));
      }
    },
    [api, file, onChange, close]
  );

  return (
    <CommonModal
      title="Загрузка картинки"
      submit={form.handleSubmit(submit)}
      close={close}
      submitLabel="Сохранить"
      submitError={submitError}
      loading={form.formState.isSubmitting}
    >
      <form onSubmit={form.handleSubmit(submit)}>
        <div>Файл: {file.name}</div>
        <CommonImageFields
          form={form}
          defaultCollectionId={defaults.collectionId}
        />
      </form>
    </CommonModal>
  );
};
