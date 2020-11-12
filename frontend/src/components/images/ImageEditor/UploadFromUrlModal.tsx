import React, { useCallback, useState } from 'react';
import { Controller, FieldError, useForm } from 'react-hook-form';
import Select from 'react-select';

import { useQuery } from '@apollo/client';

import { ApolloQueryResults, CommonModal } from '~/components';
import { BasicInputField, FieldContainer } from '~/components/forms2';
import { Column } from '~/frontkit';

import {
    WagtailCollectionsForImageUploadDocument, WagtailUploadImageFromUrlMutationVariables
} from './queries.generated';
import { Defaults } from './types';

type Props = {
  close: () => void;
  save: (
    params: WagtailUploadImageFromUrlMutationVariables['input']
  ) => Promise<void>;
  defaults: Defaults;
};

type SelectCollectionType = {
  value: string;
  label: string;
};

type FormData = {
  title: string;
  basename: string;
  url: string;
  collection: SelectCollectionType;
};

const collectionToSelectOption = (c: { id: string; name: string }) => ({
  value: c.id,
  label: c.name,
});

export const UploadFromUrlModal: React.FC<Props> = ({
  close,
  save,
  defaults,
}) => {
  const collectionsQueryResults = useQuery(
    WagtailCollectionsForImageUploadDocument
  );

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
          <BasicInputField
            title="Заголовок"
            name="title"
            required
            form={form}
          />
          <BasicInputField
            title="Название файла"
            name="basename"
            required
            form={form}
          />
          <ApolloQueryResults {...collectionsQueryResults}>
            {({ data: { result: collections } }) => {
              const defaultCollection = defaults.collectionId
                ? collections.find((c) => c.id === defaults.collectionId)
                : undefined;
              const defaultValue = defaultCollection
                ? collectionToSelectOption(defaultCollection)
                : undefined;
              return (
                <FieldContainer
                  title="Коллекция"
                  error={form.errors.collection as FieldError | undefined}
                >
                  <Controller
                    name="collection"
                    as={Select}
                    placeholder="Выбрать..."
                    menuPortalTarget={document.body}
                    styles={{
                      menuPortal: (base: any) => ({
                        ...base,
                        zIndex: 1500,
                      }),
                    }}
                    options={collections.map(collectionToSelectOption)}
                    defaultValue={defaultValue}
                    control={form.control}
                    rules={{ required: true }}
                  />
                </FieldContainer>
              );
            }}
          </ApolloQueryResults>
        </Column>
      </form>
    </CommonModal>
  );
};
