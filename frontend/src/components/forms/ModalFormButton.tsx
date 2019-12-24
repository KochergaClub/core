import { useCallback, useMemo, useState } from 'react';

import { Formik, Form, FormikHelpers } from 'formik';

import { Column, Button, Modal, ControlsFooter } from '@kocherga/frontkit';

import { useFocusOnFirstModalRender, useCommonHotkeys } from '~/common/hooks';

import ButtonWithModal from '../ButtonWithModal';

import { FormShape } from './types';
import FieldWidget from './FieldWidget';
import ErrorLabel from './FieldWidget/ErrorLabel'; // TODO - move ErrorLabel to one level up?

interface PostResult {
  close: boolean;
  error?: string;
}

interface Props<Values extends {}> {
  fields: FormShape; // FormShape should match Values!
  buttonName: string;
  modalButtonName: string;
  modalTitle: string;
  small?: boolean;
  post: (values: Values) => Promise<PostResult | void>;
}

interface ModalProps<Values> extends Props<Values> {
  close: () => void;
}

function ModalForm<Values>({
  fields,
  post,
  close,
  modalButtonName,
  modalTitle,
}: ModalProps<Values>) {
  const [submitError, setSubmitError] = useState('');

  const initialValues = useMemo(() => {
    const result: { [k: string]: string | number | boolean } = {};
    for (const field of fields) {
      let value: string | number | boolean = '';
      if (field.value) {
        value = field.value;
      } else {
        if (field.type === 'boolean') {
          // Without this special case the initial value of boolean field becomes '', which leads to "Required" errors for untouched fields.
          // TODO - check if this was fixed in formik v2
          value = false;
        }
      }
      result[field.name] = value;
    }
    return (result as any) as Values;
  }, [fields]);

  const submit = useCallback(
    async (values: Values, actions: FormikHelpers<Values>) => {
      // Values should match FormShape, so this should be ok (but it still feels ugly)
      const postValues = { ...values } as any;

      for (const field of fields) {
        if (field.readonly) {
          // set readonly fields
          if (field.value) {
            postValues[field.name] = field.value;
            continue;
          }

          if (field.type === 'boolean') {
            postValues[field.name] = false;
          } else {
            postValues[field.name] = '';
          }
        } else {
          if (field.type === 'number' && postValues[field.name] === '') {
            delete postValues[field.name]; // TODO - check if the field is optional?
          }
        }
      }
      const postResult = (await post(postValues as Values)) || { close: true };
      actions.setSubmitting(false);
      if (postResult.close) {
        close();
      }
      if (postResult.error) {
        setSubmitError(postResult.error);
      }
    },
    [fields, post]
  );

  const validate = useCallback(
    values => {
      let errors: { [k: string]: string } = {};
      for (const field of fields) {
        const value = values[field.name];
        if (value === '' && !field.optional) {
          errors[field.name] = 'Обязательное поле';
        }
        if (field.type === 'number' && value !== '') {
          const numValue = parseInt(value, 10);
          if (field.max !== undefined && numValue > field.max) {
            errors[
              field.name
            ] = `Значение превышает максимальное: ${field.max}`;
          }
          if (field.min !== undefined && numValue < field.min) {
            errors[field.name] = `Значение меньше минимального: ${field.min}`;
          }
        }
      }
      return errors;
    },
    [fields]
  );

  const focus = useFocusOnFirstModalRender();
  const hotkeys = useCommonHotkeys({
    onEscape: close,
  });

  return (
    <Modal isOpen={true}>
      <Modal.Header toggle={close}>{modalTitle}</Modal.Header>
      <Formik
        initialValues={initialValues}
        onSubmit={submit}
        validate={validate}
      >
        {({ isSubmitting }) => (
          <Form>
            <Modal.Body ref={focus} {...hotkeys}>
              <Column stretch>
                {fields.map(field => (
                  <FieldWidget key={field.name} field={field} />
                ))}
              </Column>
            </Modal.Body>
            <Modal.Footer>
              {submitError ? (
                <div>
                  <ErrorLabel>{submitError}</ErrorLabel>
                </div>
              ) : null}
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
}

function ModalFormButton<Values>(props: Props<Values>) {
  return (
    <ButtonWithModal title={props.buttonName} small={props.small}>
      {({ close }) => <ModalForm {...props} close={close} />}
    </ButtonWithModal>
  );
}

export default ModalFormButton;
