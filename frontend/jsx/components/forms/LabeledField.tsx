import React from 'react';
import styled from 'styled-components';

import { Field, FieldProps, ErrorMessage } from 'formik';

import { colors, Label } from '@kocherga/frontkit';

import { AnyFormField } from './types';

const ErrorLabel = styled.div`
  color: ${colors.accent[900]};
`;

interface Props {
  for: AnyFormField;
  children: (fieldProps: FieldProps<any>) => React.ReactNode;
}

const LabeledField: React.FC<Props> = ({ for: field, children }) => (
  <div>
    <Label>{field.title || field.name}</Label>
    <Field name={field.name} render={children} />
    <ErrorMessage name={field.name} component={ErrorLabel} />
  </div>
);

export default LabeledField;
