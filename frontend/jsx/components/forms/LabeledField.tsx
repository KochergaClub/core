import styled from 'styled-components';

import { Field, FieldProps, ErrorMessage } from 'formik';

import { colors, Row, Label } from '@kocherga/frontkit';

import { AnyFormField, FormField } from './types';

const ErrorLabel = styled.div`
  color: ${colors.accent[900]};
`;

interface Props {
  for: AnyFormField;
  children: (fieldProps: FieldProps<any>) => React.ReactNode;
}

const LabeledField: React.FC<Props> = ({ for: field, children }) => {
  if ((field as FormField).type === 'boolean') {
    return (
      <div>
        <Label>
          <Row vCentered>
            <Field name={field.name}>{children}</Field>
            <span>{field.title || field.name}</span>
          </Row>
        </Label>
        <ErrorMessage name={field.name} component={ErrorLabel} />
      </div>
    );
  }
  return (
    <div>
      <Label>{field.title || field.name}</Label>
      <Field name={field.name}>{children}</Field>
      <ErrorMessage name={field.name} component={ErrorLabel} />
    </div>
  );
};

export default LabeledField;
