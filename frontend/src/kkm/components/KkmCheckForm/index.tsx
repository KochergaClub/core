import { Field, FieldProps, Form, Formik, FormikErrors } from 'formik';
import { useCallback, useState } from 'react';
import styled from 'styled-components';

import { useMutation } from '@apollo/client';

import { A, Button, Column, Input, Label } from '~/frontkit';

import { KkmRegisterCheckDocument } from '../../queries.generated';
import { FormValues, SignMethodCalculation } from '../../types';
import MainModal from './MainModal';
import Suggestions from './Suggestions';

const FormSection = styled.section`
  width: 100%;
`;

const WideInput = styled(Input)`
  width: 100%;
`;

interface Outcome {
  result: unknown;
  error: unknown;
}

const MainForm: React.FC = () => {
  const [confirmingValues, setConfirmingValues] = useState<
    FormValues | undefined
  >(undefined);
  const [registerMutation] = useMutation(KkmRegisterCheckDocument);
  const [outcome, setOutcome] = useState<Outcome | undefined>(undefined);

  const submit = useCallback((values: FormValues) => {
    setConfirmingValues(values);
  }, []);

  const cancelSubmit = useCallback(() => {
    setConfirmingValues(undefined);
  }, []);

  const finalSubmit = async () => {
    if (!confirmingValues) {
      return;
    }
    const request = {
      title: confirmingValues.title,
      sign_method_calculation: confirmingValues.method,
      email: confirmingValues.email,
      sum: confirmingValues.amount,
    };

    try {
      const result = await registerMutation({
        variables: {
          params: request,
        },
      });
      setOutcome({
        result: result.data || {},
        error: {},
      });
    } catch (e) {
      setOutcome({
        result: {},
        error: e,
      });
      cancelSubmit();
    }
  };

  const initialValues: FormValues = {
    email: '',
    title: '',
    amount: 0,
    method: SignMethodCalculation.PrePayment100,
  };

  const validate = (values: FormValues) => {
    const errors: FormikErrors<FormValues> = {};
    if (!values.title) {
      errors.title = 'Обязательное поле';
    }
    if (!values.email) {
      errors.email = 'Обязательное поле';
    }
    if (!values.amount) {
      errors.amount = 'Обязательное поле';
    }
    return errors;
  };

  return (
    <Formik initialValues={initialValues} onSubmit={submit} validate={validate}>
      {({ isValid, isSubmitting, values, setFieldValue }) => (
        <Form>
          <Column gutter={16}>
            <FormSection>
              <Label>Название:</Label>
              <Field name="title">
                {({ field }: FieldProps<string>) => (
                  <WideInput {...field} type="text" />
                )}
              </Field>
              <Suggestions
                values={[
                  'Консультация',
                  'Участие в воркшопе по прикладной рациональности',
                ]}
                current={values.title}
                setValue={(value) => setFieldValue('title', value)}
              />
            </FormSection>
            <FormSection>
              <Label>Сумма:</Label>
              <Field name="amount">
                {({ field }: FieldProps<number>) => (
                  <Input {...field} type="number" />
                )}
              </Field>
              <Suggestions
                values={[3000, 12000, 30000, 36000]}
                current={values.amount}
                setValue={(value) => setFieldValue('amount', value)}
              />
            </FormSection>
            <FormSection>
              <Label>
                <A href="http://www.consultant.ru/document/cons_doc_LAW_214339/731d2f8d127e3614422af34b4ac197612bd2f64d/">
                  Тип чека
                </A>
                : {SignMethodCalculation[values.method]}
              </Label>
              <Suggestions
                values={[1, 2, 3, 4, 5, 6, 7]}
                current={values.method as number}
                setValue={(value) => setFieldValue('method', value)}
              />
            </FormSection>
            <FormSection>
              <Label>e-mail:</Label>
              <Field name="email">
                {({ field }: FieldProps<string>) => (
                  <Input {...field} type="email" />
                )}
              </Field>
            </FormSection>
            <Button
              type="submit"
              disabled={!isValid || isSubmitting}
              size="big"
            >
              Пробить
            </Button>
            {confirmingValues && (
              <MainModal
                values={confirmingValues}
                submit={finalSubmit}
                close={cancelSubmit}
              />
            )}
            {outcome && (
              <section>
                <h2>Результат</h2>
                <pre>{JSON.stringify(outcome.result, null, 2)}</pre>
                <h2>Ошибка</h2>
                <pre>{JSON.stringify(outcome.error, null, 2)}</pre>
              </section>
            )}
          </Column>
        </Form>
      )}
    </Formik>
  );
};

export default MainForm;
