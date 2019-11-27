import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import Link from 'next/link';

import { Formik, Field, FieldProps, Form, ErrorMessage } from 'formik';

import { A, Column, Label, Input, Row, colors } from '@kocherga/frontkit';

import { selectViewingTemplate } from '../selectors';
import { ImageTemplate } from '../types';
import { FormState, state2link } from '../utils';

import Preview from './Preview';

interface Props {}

const template2initialValues = (
  template: ImageTemplate,
  query: ParsedUrlQuery
) => {
  const result: { [k: string]: string } = {};
  template.schema.fields.forEach(field => {
    let value = field.default;
    const queryValue = query[field.name];
    if (queryValue) {
      value = Array.isArray(queryValue) ? queryValue[0] : queryValue;
    }
    result[field.name] = value || '';
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
        if (!String(values[field.name]).length) {
          errors[field.name] = 'Обязательное поле';
        } else if (!String(values[field.name]).match(/^\d+$/)) {
          errors[field.name] = 'Должно быть целым числом';
        }
        break;
      case 'number':
        if (!String(values[field.name]).length) {
          errors[field.name] = 'Обязательное поле';
        } else if (!String(values[field.name]).match(/^\d+(?:\.\d+)?$/)) {
          errors[field.name] = 'Должно быть числом';
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
            <Field name={field.name}>
              {({ field }: FieldProps<any>) => <Input {...field} type="text" />}
            </Field>
            <ErrorMessage name={field.name} component={ErrorLabel} />
          </CenteredRow>
        </div>
      ))}
    </div>
  );
};

const ViewingTemplateScreen: React.FC<Props> = ({}) => {
  const template = useSelector(selectViewingTemplate);
  const router = useRouter();

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
          initialValues={template2initialValues(template, router.query)}
          onSubmit={() => null}
          validate={values => validateValues(template, values)}
        >
          {({ values, isValid }) => {
            console.log(router.route);
            console.log(router.pathname);
            // router.push(router.href, router.as, { shallow: true });
            return (
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
            );
          }}
        </Formik>
      </Column>
    </div>
  );
};

export default ViewingTemplateScreen;
