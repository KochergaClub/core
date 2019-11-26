import React from 'react';
import { useSelector } from 'react-redux';
import { Formik, Field, FieldProps, Form, ErrorMessage } from 'formik';
import styled from 'styled-components';

import Link from 'next/link';

import { A, Column, Label, Input, Row, colors } from '@kocherga/frontkit';

import { selectViewingTemplate } from '../selectors';
import { ImageTemplate } from '../types';

interface Props {}

type FormState = { [k: string]: string };

const jsonToQueryString = (json: { [k: string]: string }) => {
  return (
    '?' +
    Object.keys(json)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(json[key]))
      .join('&')
  );
};

const state2link = ({
  name,
  state,
  type,
}: {
  name: string;
  state: FormState;
  type: 'html' | 'png';
}) => `/api/templater/${name}/${type}` + jsonToQueryString(state);

const template2initialValues = (template: ImageTemplate) => {
  const result: { [k: string]: string } = {};
  template.schema.fields.forEach(field => {
    result[field.name] = field.default || '';
  });
  return result;
};

const validateValues = (template: ImageTemplate, values: FormState) => {
  let errors: { [k: string]: string } = {};
  for (const field of template.schema.fields) {
    switch (field.value_type) {
      case 'str':
        break;
      case 'int':
        if (!values[field.name].length) {
          errors[field.name] = 'Обязательное поле';
        } else if (!values[field.name].match(/^\d+$/)) {
          errors[field.name] = 'Должно быть целым числом';
        }
        break;
      case 'date':
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

const CenteredRow = styled(Row)`
  align-items: center;
`;

const ErrorLabel = styled.div`
  color: ${colors.accent[900]};
`;

const Fields = ({ template }: { template: ImageTemplate }) => {
  return (
    <div>
      {template.schema.fields.map(field => (
        <div key={field.name}>
          <Label>{field.name}</Label>
          <CenteredRow gutter={16}>
            <Field
              name={field.name}
              render={({ field }: FieldProps<any>) => (
                <Input {...field} type="text" />
              )}
            />
            <ErrorMessage name={field.name} component={ErrorLabel} />
          </CenteredRow>
        </div>
      ))}
    </div>
  );
};

const Preview: React.FC<{ state: FormState; template: ImageTemplate }> = ({
  state,
  template,
}) => {
  const src = state2link({
    name: template.name,
    state,
    type: 'html',
  });

  const { width, height } = template.sizes;

  return <iframe src={src} style={{ width, height, border: 0 }} />;
};

const ViewingTemplateScreen: React.FC<Props> = ({}) => {
  const template = useSelector(selectViewingTemplate);

  if (!template) {
    throw new Error('Internal logic error');
  }

  return (
    <div>
      <Link href="/team/image-templater" passHref>
        <A>&larr; все шаблоны</A>
      </Link>
      <h2>{template.name}</h2>
      <Column>
        <Formik
          initialValues={template2initialValues(template)}
          onSubmit={() => null}
          validate={values => validateValues(template, values)}
        >
          {({ values, isValid }) => (
            <Form>
              <Column>
                <Fields template={template} />
                {(isValid || !template.schema.fields.length) && (
                  <Column centered>
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
          )}
        </Formik>
      </Column>
    </div>
  );
};

export default ViewingTemplateScreen;
