import { Form, Formik, FormikHelpers } from 'formik';
import { useCallback, useMemo, useState } from 'react';

import { Button, Column, ControlsFooter, Modal } from '@kocherga/frontkit';

import { useCommonHotkeys, useFocusOnFirstModalRender } from '~/common/hooks';

import ButtonWithModal from '../ButtonWithModal';
import AnyFieldWidget from './AnyFieldWidget';
import ErrorLabel from './BasicFieldWidget/ErrorLabel'; // TODO - move ErrorLabel to one level up
import { AnyFormValues, FormField, FormShape } from './types';

interface PostResult {
  close: boolean;
  error?: string;
}

interface Props<Values extends AnyFormValues> {
  shape: FormShape; // FormShape should match Values!
  initialValues?: Values; // used for editing existing data; if initialValues is set then shape.*.default is ignored
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
        value = field.default || false;
        break;
      case 'shape':
        value = buildInitialValues(field.shape);
        break;
      case 'list':
        // throw new Error("Can't handle lists yet");
        value = [];
        break;
      default:
        if (field.default) {
          value = field.default;
        }
    }
    result[field.name] = value;
  }
  return result;
};

type ValidationErrors = { [k: string]: string };

const validateByField = (
  field: FormField,
  value: AnyFormValues[keyof AnyFormValues]
): ValidationErrors | undefined => {
  if (field.type === 'shape') {
    const errors: ValidationErrors = {};
    if (!value || typeof value !== 'object' || Array.isArray(value)) {
      throw new Error(`Internal error. Expected object, got ${value}`);
    }
    const nestedErrors = validateByShape(field.shape, value);
    for (const errorName of Object.keys(nestedErrors)) {
      errors[field.name + '.' + errorName] = nestedErrors[errorName];
    }
    return errors;
  } else if (field.type === 'list') {
    if (!Array.isArray(value)) {
      throw new Error(`Internal error. Expected array, got ${value}`);
    }
    const errors: ValidationErrors = {};
    for (let i = 0; i < value.length; i++) {
      const nestedErrors = validateByField(field.field, value[i]);
      if (nestedErrors) {
        for (const errorName of Object.keys(nestedErrors)) {
          // TODO - should there be a dot after `]`? hmm...
          errors['[' + i + '].' + errorName] = nestedErrors[errorName];
        }
      }
    }
    if (Object.keys(errors).length) {
      return errors;
    }
    return undefined; // no errors
  }
  if (value === '' && !field.optional) {
    return { [field.name]: 'Обязательное поле' };
  }
  if (field.type === 'number' && value !== '') {
    if (typeof value !== 'string' && typeof value !== 'number') {
      throw new Error(
        `Internal error, expected string or number value, got ${value}`
      );
    }
    const numValue: number =
      typeof value === 'string' ? parseInt(value, 10) : value;
    if (field.max !== undefined && numValue > field.max) {
      return { [field.name]: `Значение превышает максимальное: ${field.max}` };
    }
    if (field.min !== undefined && numValue < field.min) {
      return { [field.name]: `Значение меньше минимального: ${field.min}` };
    }
  }

  return undefined;
};

const validateByShape = <Values extends AnyFormValues>(
  shape: FormShape,
  values: Values
) => {
  const errors: { [k: string]: string } = {};
  for (const field of shape) {
    const value = values[field.name];
    const fieldErrors = validateByField(field, value);
    if (fieldErrors !== undefined) {
      for (const key of Object.keys(fieldErrors)) {
        errors[key] = fieldErrors[key]; // TODO - check for duplicate keys?
      }
    }
  }
  return errors;
};

const prepareValueByField = (
  field: FormField,
  value: AnyFormValues[keyof AnyFormValues]
): any => {
  switch (field.type) {
    case 'list':
      if (!Array.isArray(value)) {
        throw new Error('expected array, internal formik bug?');
      }
      return value
        ? value.map((subvalue) => prepareValueByField(field.field, subvalue))
        : undefined;
    case 'shape':
      if (!value || typeof value !== 'object' || Array.isArray(value)) {
        throw new Error(`Internal error. Expected object, got ${value}`);
      }
      return prepareValuesByShape(field.shape, value);
    default:
      // if ('readonly' in field) {
      //   if (field.readonly) {
      //     // set readonly fields
      //     if (field.default) {
      //       return field.default;
      //     }

      //     if (field.type === 'boolean') {
      //       return false;
      //     } else {
      //       return '';
      //     }
      //   } else {
      //     if (field.type === 'number' && value === '') {
      //       return undefined; // TODO - check if the field is optional?
      //     }
      //   }
      // }
      if (field.type === 'number' && value !== undefined) {
        return parseInt(value as string, 10);
      }
      return value;
  }
};

const prepareValuesByShape = <Values extends AnyFormValues>(
  shape: FormShape,
  values: Values
): Values => {
  const result: any = {};
  for (const field of shape) {
    result[field.name] = prepareValueByField(field, values[field.name]);
  }
  return result;
};

function ModalForm<Values extends AnyFormValues>({
  shape,
  post,
  close,
  modalButtonName,
  modalTitle,
  initialValues,
}: ModalProps<Values>) {
  const [submitError, setSubmitError] = useState('');

  const preparedInitialValues = useMemo((): Values => {
    return initialValues || (buildInitialValues(shape) as Values);
  }, [initialValues, shape]);

  const submit = useCallback(
    async (values: Values, actions: FormikHelpers<Values>) => {
      const postValues: Values = prepareValuesByShape(shape, values);
      console.log(postValues);

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
      return validateByShape(shape, values);
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
        initialValues={preparedInitialValues}
        onSubmit={submit}
        validate={validate}
      >
        {({ isSubmitting, isValid, values }) => (
          <Form>
            <Modal.Body ref={focus} {...hotkeys}>
              <Column stretch>
                {shape.map((field) => (
                  <AnyFieldWidget
                    key={field.name}
                    name={field.name}
                    field={field}
                    value={values[field.name]}
                  />
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
                  disabled={isSubmitting || !isValid}
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
