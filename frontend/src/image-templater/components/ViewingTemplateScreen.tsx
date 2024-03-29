import { ErrorMessage, Field, FieldProps, Form, Formik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import React, { useCallback } from 'react';

import { ImageTemplateValueType } from '~/apollo/types.generated';
import { PaddedBlock } from '~/components';
import { A, Column, Input, Label, Row } from '~/frontkit';

import { TemplateFragment } from '../queries.generated';
import { imageTemplaterRootRoute } from '../routes';
import { FormState, jsonToQueryString, state2link } from '../utils';
import Preview from './Preview';

const template2initialValues = (
  template: TemplateFragment,
  query: ParsedUrlQuery
) => {
  const result: { [k: string]: string } = {};
  template.schema.fields.forEach((field) => {
    let value = field.default;
    const queryValue = query[field.name];
    if (queryValue) {
      value = Array.isArray(queryValue) ? queryValue[0] : queryValue;
    }
    result[field.name] = value || '';
  });
  return result;
};

const validateValues = (template: TemplateFragment, values: FormState) => {
  const errors: { [k: string]: string } = {};
  for (const field of template.schema.fields) {
    switch (field.type) {
      case ImageTemplateValueType.String:
        break;
      case ImageTemplateValueType.Int:
        if (!String(values[field.name]).length) {
          errors[field.name] = 'Обязательное поле';
        } else if (!String(values[field.name]).match(/^\d+$/)) {
          errors[field.name] = 'Должно быть целым числом';
        }
        break;
      case ImageTemplateValueType.Float:
        if (!String(values[field.name]).length) {
          errors[field.name] = 'Обязательное поле';
        } else if (!String(values[field.name]).match(/^\d+(?:\.\d+)?$/)) {
          errors[field.name] = 'Должно быть числом';
        }
        break;
      case ImageTemplateValueType.Date:
        if (!values[field.name].match(/^\d{4}-\d{2}-\d{2}$/)) {
          errors[field.name] = 'Нужна дата в формате YYYY-MM-DD';
        }
        break;
      default:
        errors[field.name] = 'Поле неизвестного типа';
    }
  }
  return errors;
};

const ErrorLabel: React.FC = ({ children }) => (
  <div className="text-accent-900">{children}</div>
);

const Fields = ({ template }: { template: TemplateFragment }) => {
  return (
    <div>
      {template.schema.fields.map((field) => (
        <div key={field.name}>
          <Label>{field.name}</Label>
          <Row gutter={16} vCentered>
            <Field name={field.name}>
              {({ field }: FieldProps<any>) => <Input {...field} type="text" />}
            </Field>
            <ErrorMessage name={field.name} component={ErrorLabel} />
          </Row>
        </div>
      ))}
    </div>
  );
};

interface Props {
  template: TemplateFragment;
}

const ViewingTemplateScreen: React.FC<Props> = ({ template }) => {
  const router = useRouter();

  if (!template) {
    throw new Error('Internal logic error');
  }

  const validate = useCallback(
    (values: { [k: string]: string }) => {
      validateValues(template, values);

      const path = router.asPath.split('?')[0];
      const query = jsonToQueryString(values);
      window.history.replaceState(window.history.state, '', path + query);
    },
    [template, router]
  );

  return (
    <PaddedBlock>
      <Link href={imageTemplaterRootRoute()} passHref>
        <A>&larr; все шаблоны</A>
      </Link>
      <h2>{template.name}</h2>
      <Column>
        <Formik
          initialValues={template2initialValues(template, router.query)}
          onSubmit={() => undefined}
          validate={validate}
        >
          {({ values, isValid }) => {
            return (
              <Form>
                <Column gutter={16}>
                  <Fields template={template} />
                  {(isValid || !template.schema.fields.length) && (
                    <Column>
                      <Preview state={values} template={template} />
                      <A
                        href={state2link({
                          name: template.name,
                          state: values,
                          type: 'png',
                        })}
                      >
                        Скачать png
                      </A>
                    </Column>
                  )}
                </Column>
              </Form>
            );
          }}
        </Formik>
      </Column>
    </PaddedBlock>
  );
};

export default ViewingTemplateScreen;
