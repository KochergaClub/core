import React from 'react';
import { Controller, FieldError, UseFormMethods } from 'react-hook-form';
import Select from 'react-select';

import { useQuery } from '@apollo/client';

import { ApolloQueryResults } from '~/components';
import { BasicInputField, FieldContainer } from '~/components/forms2';
import { Column } from '~/frontkit';

import { WagtailCollectionsForImageUploadDocument } from './queries.generated';

type SelectCollectionType = {
  value: string;
  label: string;
};

export type CommonFormData = {
  title: string;
  basename: string;
  collection: SelectCollectionType;
};

const collectionToSelectOption = (c: { id: string; name: string }) => ({
  value: c.id,
  label: c.name,
});

type Props = {
  form: UseFormMethods<any>; // sorry :( we can't use UseFormFields<CommonFormData> here
  defaultCollectionId?: string;
};

export const CommonImageFields: React.FC<Props> = ({
  form,
  defaultCollectionId,
}) => {
  const collectionsQueryResults = useQuery(
    WagtailCollectionsForImageUploadDocument
  );

  return (
    <Column stretch gutter={16}>
      <BasicInputField title="Заголовок" name="title" required form={form} />
      <BasicInputField
        title="Название файла"
        name="basename"
        required
        form={form}
      />
      <ApolloQueryResults {...collectionsQueryResults}>
        {({ data: { result: collections } }) => {
          const defaultCollection = defaultCollectionId
            ? collections.find((c) => c.id === defaultCollectionId)
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
  );
};