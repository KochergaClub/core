import React, { useCallback, useMemo } from 'react';

import { Formik, Form, Field, FormikActions, FieldProps } from 'formik';

import { Label, Row, Button, Modal, ControlsFooter } from '@kocherga/frontkit';

import {
  useAPI,
  useFocusOnFirstModalRender,
  useCommonHotkeys,
} from '~/common/hooks';

import { FormField } from './types';

import ButtonWithModal from '../ButtonWithModal';
import LabeledFormField from '../LabeledFormField';

interface Props {
  apiEndpoint: string;
  fields: FormField[];
  displayName?: string;
  onCreate: () => void;
}

interface ModalProps extends Props {
  close: () => void;
}

interface FieldInputProps {
  field: FormField;
}

const FieldInput: React.FC<FieldInputProps> = ({ field }) => {
  if (field.readonly) {
    return (
      <div>
        <Label>{field.name}</Label>
        <div>{field.value}</div>
      </div>
    );
  }
  switch (field.type) {
    case 'string':
      return <LabeledFormField name={field.name} title={field.name} />;
    case 'number':
      return (
        <LabeledFormField name={field.name} title={field.name} type="number" />
      );
    case 'choice':
      return (
        <div>
          <Field
            name={field.name}
            render={({ field: formikField }: FieldProps<any>) => {
              return (
                <div>
                  <Label>{field.name}</Label>
                  {field.options.map(option => {
                    return (
                      <div>
                        <label key={option}>
                          <input
                            type="radio"
                            {...formikField}
                            checked={formikField.value === option}
                            value={option}
                          />{' '}
                          {option}
                        </label>
                      </div>
                    );
                  })}
                </div>
              );
            }}
          />
        </div>
      );
  }
};

const CreateModal = ({
  fields,
  apiEndpoint,
  close,
  displayName,
  onCreate,
}: ModalProps) => {
  const api = useAPI();

  const initialValues = useMemo(() => {
    const result: { [k: string]: string | number } = {};
    for (const field of fields) {
      result[field.name] = field.value || '';
    }
    return result;
  }, [fields]);

  const submit = useCallback(
    async (values: any, actions: FormikActions<any>) => {
      const postValues = { ...values };
      for (const field of fields.filter(f => f.readonly)) {
        postValues[field.name] = field.value || '';
      }
      await api.call(apiEndpoint, 'POST', postValues);
      actions.setSubmitting(false);
      close();
      if (onCreate) {
        onCreate();
      }
    },
    [api, fields, apiEndpoint, onCreate]
  );

  const focus = useFocusOnFirstModalRender();
  const hotkeys = useCommonHotkeys({
    onEscape: close,
  });

  return (
    <Modal isOpen={true}>
      <Modal.Header toggle={close}>
        Добавить{displayName && ': ' + displayName}
      </Modal.Header>
      <Formik initialValues={initialValues} onSubmit={submit}>
        {({ isSubmitting }) => (
          <Form>
            <Modal.Body ref={focus} {...hotkeys}>
              {fields.map(field => (
                <FieldInput key={field.name} field={field} />
              ))}
            </Modal.Body>
            <Modal.Footer>
              <ControlsFooter>
                <Button
                  type="submit"
                  loading={isSubmitting}
                  disabled={isSubmitting}
                >
                  Добавить
                </Button>
              </ControlsFooter>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

const CreateButton = (props: Props) => {
  return (
    <ButtonWithModal title="Добавить">
      {({ close }) => <CreateModal {...props} close={close} />}
    </ButtonWithModal>
  );
};

export default CreateButton;
