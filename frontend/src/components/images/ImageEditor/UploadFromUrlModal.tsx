import React, { useCallback, useState } from 'react';
import { Controller, FieldError, useForm } from 'react-hook-form';
import Select from 'react-select';

import { useQuery } from '@apollo/client';

import { useCommonHotkeys, useFocusOnFirstModalRender } from '~/common/hooks';
import { BasicInputField, ErrorMessage, FieldContainer } from '~/components/forms2';
import { Button, Column, ControlsFooter, Modal, Row } from '~/frontkit';

import { WagtailCollectionsForImageUploadDocument } from './queries.generated';
import { Defaults } from './types';

interface Props {
  close: () => void;
  save: (params: {
    url: string;
    title: string;
    basename: string;
  }) => Promise<void>;
  defaults: Defaults;
}

type FormData = {
  title: string;
  basename: string;
  url: string;
  collection_id: string;
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

  const collectionsQueryResults = useQuery(
    WagtailCollectionsForImageUploadDocument
  );

  const [submitError, setSubmitError] = useState('');

  const submit = useCallback(
    async ({ url, title, basename }: FormData) => {
      try {
        await save({ url, title, basename }); // TODO - pass collection_id
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
    <Modal>
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
              error={form.errors.collection_id as FieldError | undefined}
            >
              <Controller
                name="collection_id"
                as={Select}
                placeholder="Выбрать..."
                menuPortalTarget={document.body}
                styles={{
                  menuPortal: (base: any) => ({
                    ...base,
                    zIndex: 1500,
                  }),
                }}
                options={
                  collectionsQueryResults.data
                    ? collectionsQueryResults.data.result.map((c) => ({
                        label: c.name,
                        value: c.id,
                      }))
                    : []
                }
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
    </Modal>
  );
};
