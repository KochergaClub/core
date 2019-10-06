import React, { useCallback, useMemo } from 'react';

import { Formik, Form, FormikActions } from 'formik';

import { Column, Button, Modal, ControlsFooter } from '@kocherga/frontkit';

import { useFocusOnFirstModalRender, useCommonHotkeys } from '~/common/hooks';

import ButtonWithModal from '../ButtonWithModal';

import { FormShape } from './types';
import FieldInput from './FieldInput';

interface Props {
  fields: FormShape;
  buttonName: string;
  modalButtonName: string;
  modalTitle: string;
  post: (values: any) => Promise<void>; // FIXME - derive values from fields using `fields = ... as const` and derived types tricks!
}

interface ModalProps extends Props {
  close: () => void;
}

const ModalForm = ({
  fields,
  post,
  close,
  modalButtonName,
  modalTitle,
}: ModalProps) => {
  const initialValues = useMemo(() => {
    const result: { [k: string]: string | number | boolean } = {};
    for (const field of fields) {
      result[field.name] = field.value || '';
    }
    return result;
  }, [fields]);

  const submit = useCallback(
    async (values: any, actions: FormikActions<any>) => {
      const postValues = { ...values };
      for (const field of fields.filter(f => f.readonly)) {
        if (field.value) {
          postValues[field.name] = field.value;
          continue;
        }

        if (field.type === 'boolean') {
          postValues[field.name] = false;
        } else {
          postValues[field.name] = '';
        }
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
              <Column>
                {fields.map(field => (
                  <FieldInput key={field.name} field={field} />
                ))}
              </Column>
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
      {({ close }) => <ModalForm {...props} close={close} />}
    </ButtonWithModal>
  );
};

export default ModalFormButton;
