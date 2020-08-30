import { Form, Formik, FormikHelpers } from 'formik';
import { useCallback, useMemo, useState } from 'react';

import { Button, Column, ControlsFooter, Modal } from '@kocherga/frontkit';

import { useCommonHotkeys, useFocusOnFirstModalRender } from '~/common/hooks';

import ButtonWithModal from '../ButtonWithModal';
import FieldWidget from './FieldWidget';
import ErrorLabel from './FieldWidget/ErrorLabel'; // TODO - move ErrorLabel to one level up?
import { AnyFormValues, FormShape } from './types';

interface PostResult {
  close: boolean;
  error?: string;
}

interface Props<Values extends AnyFormValues> {
  shape: FormShape; // FormShape should match Values!
  buttonName: string;
  modalButtonName: string;
  modalTitle: string;
  small?: boolean;
  post: (values: Values) => Promise<PostResult | void>;
}

interface ModalProps<Values extends AnyFormValues> extends Props<Values> {
  close: () => void;
}

const buildInitialValues = (shape: FormShape): AnyFormValues => {
  const result: AnyFormValues = {};
  for (const field of shape) {
    let value: AnyFormValues[keyof AnyFormValues] = '';

    switch (field.type) {
      case 'boolean':
        // Without this special case the initial value of boolean field becomes '', which leads to "Required" errors for untouched fields.
        // TODO - check if this was fixed in formik v2
        value = field.value || false;
        break;
      case 'shape':
        value = buildInitialValues(field.shape);
        break;
      case 'list':
        // throw new Error("Can't handle lists yet");
        value = [];
        break;
      default:
        if (field.value) {
          value = field.value;
        }
    }
    result[field.name] = value;
  }
  return result;
};

function ModalForm<Values extends AnyFormValues>({
  shape,
  post,
  close,
  modalButtonName,
  modalTitle,
}: ModalProps<Values>) {
  const [submitError, setSubmitError] = useState('');

  const initialValues = useMemo(() => {
    return buildInitialValues(shape) as Values;
  }, [shape]);

  const submit = useCallback(
    async (values: Values, actions: FormikHelpers<Values>) => {
      // Values should match FormShape, so this should be ok (but it still feels ugly)
      const postValues = { ...values } as any;

      for (const field of shape) {
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
      let postResult: PostResult | undefined;
      try {
        postResult = (await post(postValues as Values)) || { close: true };
      } catch (e) {
        postResult = {
          close: false,
          error: String(e),
        };
      }
      actions.setSubmitting(false);
      if (postResult.close) {
        close();
      }
      if (postResult.error) {
        setSubmitError(postResult.error);
      }
    },
    [shape, post, close]
  );

  const validate = useCallback(
    (values) => {
      const errors: { [k: string]: string } = {};
      for (const field of shape) {
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
    [shape]
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
                {shape.map((field) => (
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
                  loading={isSubmitting || undefined}
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

function ModalFormButton<Values extends AnyFormValues>(props: Props<Values>) {
  return (
    <ButtonWithModal title={props.buttonName} small={props.small}>
      {({ close }) => <ModalForm {...props} close={close} />}
    </ButtonWithModal>
  );
}

export default ModalFormButton;
