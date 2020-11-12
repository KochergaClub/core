import React, { useCallback, useState } from 'react';
import { Controller, FieldError, useForm } from 'react-hook-form';
import Select from 'react-select';

import { useQuery } from '@apollo/client';

import { useCommonHotkeys, useFocusOnFirstModalRender } from '~/common/hooks';
import { ApolloQueryResults } from '~/components';
import { BasicInputField, ErrorMessage, FieldContainer } from '~/components/forms2';
import { Button, Column, ControlsFooter, Modal, Row } from '~/frontkit';

import {
    WagtailCollection_ForImageUploadFragment, WagtailCollectionsForImageUploadDocument,
    WagtailUploadImageFromUrlMutationVariables
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

type InnerProps = Props & {
  collections: WagtailCollection_ForImageUploadFragment[];
};

const UploadFromUrlModalInner: React.FC<InnerProps> = ({
  close,
  save,
  defaults,
  collections,
}) => {
  const defaultCollection = defaults.collectionId
    ? collections.find((c) => c.id === defaults.collectionId)
    : undefined;
  const form = useForm<FormData>({
    defaultValues: {
      url: '',
      title: defaults.title,
      basename: defaults.basename,
      collection: defaultCollection
        ? collectionToSelectOption(defaultCollection)
        : undefined,
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

  const focus = useFocusOnFirstModalRender();
  const hotkeys = useCommonHotkeys({
    onEnter: form.handleSubmit(submit),
    onEscape: close,
  });

  return (
    <form onSubmit={form.handleSubmit(submit)}>
      <Modal.Header close={close}>Ссылка на страницу</Modal.Header>
      <Modal.Body {...hotkeys} ref={focus}>
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
              control={form.control}
              rules={{ required: true }}
            />
          </FieldContainer>
        </Column>
      </Modal.Body>
      <Modal.Footer>
        <ControlsFooter>
          <Row vCentered gutter={16}>
            {submitError && <ErrorMessage>{submitError}</ErrorMessage>}
            <Button
              type="submit"
              kind="primary"
              loading={form.formState.isSubmitting}
              disabled={form.formState.isSubmitting}
            >
              Сохранить
            </Button>
          </Row>
        </ControlsFooter>
      </Modal.Footer>
    </form>
  );
};

export const UploadFromUrlModal: React.FC<Props> = (props) => {
  const collectionsQueryResults = useQuery(
    WagtailCollectionsForImageUploadDocument
  );

  return (
    <Modal>
      <ApolloQueryResults {...collectionsQueryResults}>
        {({ data: { result } }) => (
          <UploadFromUrlModalInner {...props} collections={result} />
        )}
      </ApolloQueryResults>
    </Modal>
  );
};
