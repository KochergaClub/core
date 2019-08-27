import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { Formik, Field, Form, FormikActions } from 'formik';

import {
  Button,
  Modal,
  ControlsFooter,
  Column,
  Label,
} from '@kocherga/frontkit';

import ButtonWithModal from '~/components/ButtonWithModal';
import LabeledFormField from '~/components/LabeledFormField';

import { addWatchman, AddWatchmanProps } from '../api';
import { loadWatchmen } from '../actions';

import {
  useAPI,
  useFocusOnFirstModalRender,
  useCommonHotkeys,
} from '~/common/hooks';

const AddWatchmanModal: React.FC<{ close: () => void }> = ({ close }) => {
  const api = useAPI();
  const dispatch = useDispatch();

  const submit = useCallback(
    async (
      values: AddWatchmanProps,
      actions: FormikActions<AddWatchmanProps>
    ) => {
      await addWatchman(api, values);
      await dispatch(loadWatchmen());
      actions.setSubmitting(false);
      close();
    },
    [close]
  );

  const validate = () => {
    let errors: { [k: string]: string } = {};
    return errors;
  };

  const initialValues: AddWatchmanProps = {
    full_name: '',
    short_name: '',
    email: '',
    password: '',
    vk: '',
    gender: 'FEMALE',
  };

  const focus = useFocusOnFirstModalRender();
  const hotkeys = useCommonHotkeys({
    onEscape: close,
  });

  return (
    <Modal isOpen={true}>
      <Formik
        initialValues={initialValues}
        onSubmit={submit}
        validate={validate}
      >
        {({ isSubmitting }) => (
          <Form>
            <Modal.Header toggle={close}>Создать админа</Modal.Header>
            <Modal.Body ref={focus} {...hotkeys}>
              <Column>
                <LabeledFormField name="email" type="email" />
                <LabeledFormField name="short_name" />
                <LabeledFormField name="full_name" />
                <LabeledFormField name="password" type="password" />
                <LabeledFormField name="vk" />
                <Label>Пол</Label>
                <Field component="select" name="gender">
                  <option value="MALE">М</option>
                  <option value="FEMALE">Ж</option>
                </Field>
              </Column>
            </Modal.Body>
            <Modal.Footer>
              <ControlsFooter>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  loading={isSubmitting}
                >
                  Создать
                </Button>
              </ControlsFooter>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

const AddWatchman: React.FC = () => (
  <div>
    <ButtonWithModal title="Добавить">
      {({ close }) => <AddWatchmanModal close={close} />}
    </ButtonWithModal>
  </div>
);

export default AddWatchman;
