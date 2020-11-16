import { Field, FieldProps, Form, Formik, FormikErrors } from 'formik';
import { useCallback, useState } from 'react';
import styled from 'styled-components';

import { useMutation } from '@apollo/client';

import { KkmSignMethodCalculation } from '~/apollo/types.generated';
import { A, Button, Column, Input, Label } from '~/frontkit';

import { KkmRegisterCheckDocument, KkmRegisterCheckMutation } from '../../queries.generated';
import { FormValues, signMethodCalculationLabels } from '../../types';
import MainModal from './MainModal';
import Suggestions from './Suggestions';

const FormSection = styled.section`
  width: 100%;
`;

const WideInput = styled(Input)`
  width: 100%;
`;

type DataOutcome = {
  result: KkmRegisterCheckMutation['result'];
};

type ErrorOutcome = {
  error: unknown;
};

type Outcome = DataOutcome | ErrorOutcome;

const OutcomeComponent: React.FC<{ outcome: Outcome }> = ({ outcome }) => {
  if ('result' in outcome) {
    switch (outcome.result.__typename) {
      case 'KkmRegisterCheckOkResult':
        return (
          <section>
            <h2>Результат</h2>
            <div>
              <a href={outcome.result.url}></a>
            </div>
          </section>
        );
      case 'GenericError':
        return (
          <section>
            <h2>Ошибка</h2>
            <div>{outcome.result.message}</div>
          </section>
        );
      default:
        return <div>Неизвестный результат</div>;
    }
  }

  // possible is backend is down or buggy
  return (
    <section>
      <h2>Ошибка</h2>
      <pre>{JSON.stringify(outcome.error, null, 2)}</pre>
    </section>
  );
};

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

      if (result.data) {
        setOutcome({
          result: result.data.result,
        });
      } else {
        setOutcome({
          error: result.errors || 'Неизвестная ошибка',
        });
      }
    } catch (e) {
      setOutcome({
        error: e,
      });
      cancelSubmit();
    }
  };

  const initialValues: FormValues = {
    email: '',
    title: '',
    amount: 0,
    method: KkmSignMethodCalculation.PrePayment_100,
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
                values={['Консультация']}
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
                values={[3000]}
                current={values.amount}
                setValue={(value) => setFieldValue('amount', value)}
              />
            </FormSection>
            <FormSection>
              <Label>
                <A href="http://www.consultant.ru/document/cons_doc_LAW_214339/731d2f8d127e3614422af34b4ac197612bd2f64d/">
                  Тип чека
                </A>
                : {signMethodCalculationLabels[values.method]}
              </Label>
              <Suggestions
                values={Object.values(KkmSignMethodCalculation)}
                labels={signMethodCalculationLabels}
                current={values.method}
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
            {outcome && <OutcomeComponent outcome={outcome} />}
          </Column>
        </Form>
      )}
    </Formik>
  );
};

export default MainForm;
