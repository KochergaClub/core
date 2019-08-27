import React, { useCallback, useMemo } from 'react';

import { Formik, Form, Field, FormikActions, FieldProps } from 'formik';

import { Label, Button, Modal, ControlsFooter } from '@kocherga/frontkit';

import { useFocusOnFirstModalRender, useCommonHotkeys } from '~/common/hooks';

import { FormField } from './types';

import ButtonWithModal from '../ButtonWithModal';
import LabeledFormField from '../LabeledFormField';

interface Props {
  fields: FormField[];
  buttonName: string;
  modalButtonName: string;
  modalTitle: string;
  post: (values: any) => Promise<void>;
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
    case 'email':
      return (
        <LabeledFormField name={field.name} title={field.name} type="email" />
      );
    case 'password':
      return (
        <LabeledFormField
          name={field.name}
          title={field.name}
          type="password"
        />
      );
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
  post,
  close,
  modalButtonName,
  modalTitle,
}: ModalProps) => {
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
      await post(postValues);
      actions.setSubmitting(false);
      close();
    },
    [fields, post]
  );

  const focus = useFocusOnFirstModalRender();
  const hotkeys = useCommonHotkeys({
    onEscape: close,
  });

  return (
    <Modal isOpen={true}>
      <Modal.Header toggle={close}>{modalTitle}</Modal.Header>
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
                  {modalButtonName}
                </Button>
              </ControlsFooter>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

const ModalFormButton = (props: Props) => {
  return (
    <ButtonWithModal title={props.buttonName}>
      {({ close }) => <CreateModal {...props} close={close} />}
    </ButtonWithModal>
  );
};

export default ModalFormButton;
