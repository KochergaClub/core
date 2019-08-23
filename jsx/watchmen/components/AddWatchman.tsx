import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import {
  Formik,
  Field,
  FieldProps,
  Form,
  ErrorMessage,
  FormikActions,
} from 'formik';

import {
  colors,
  Button,
  Modal,
  ControlsFooter,
  Column,
  Label,
  Input,
} from '@kocherga/frontkit';

import { addWatchman } from '../api';
import { loadWatchmen } from '../actions';

import { useAPI } from '~/common/hooks';

// FIXME - copy-pasted from ViewingTemplateScreen
const ErrorLabel = styled.div`
  color: ${colors.accent[900]};
`;

const LabeledField: React.FC<{
  name: string;
  title?: string;
  type?: string;
}> = ({ name, title, type }) => (
  <div>
    <Label>{title || name}</Label>
    <Field
      name={name}
      render={({ field }: FieldProps<any>) => (
        <Input {...field} type={type || 'text'} />
      )}
    />
    <ErrorMessage name={name} component={ErrorLabel} />
  </div>
);

interface FormValues {
  full_name: string;
  short_name: string;
  email: string;
  password: string;
}

const AddWatchmanModal: React.FC<{ close: () => void }> = ({ close }) => {
  const api = useAPI();
  const dispatch = useDispatch();

  const submit = useCallback(
    async (values: FormValues, actions: FormikActions<FormValues>) => {
      await addWatchman(api, values);
      await dispatch(loadWatchmen());
      actions.setSubmitting(false);
    },
    [close]
  );

  const validate = () => {
    let errors: { [k: string]: string } = {};
    return errors;
  };

  const initialValues: FormValues = {
    full_name: '',
    short_name: '',
    email: '',
    password: '',
  };

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
            <Modal.Body>
              <Column>
                <LabeledField name="email" type="email" />
                <LabeledField name="short_name" />
                <LabeledField name="full_name" />
                <LabeledField name="password" type="password" />
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

const AddWatchman: React.FC = () => {
  const [addingWatchman, setAddingWatchman] = useState(false);

  return (
    <div>
      <Button small onClick={() => setAddingWatchman(true)}>
        Добавить
      </Button>
      {addingWatchman && (
        <AddWatchmanModal close={() => setAddingWatchman(false)} />
      )}
    </div>
  );
};

export default AddWatchman;
