import React from 'react';
import styled from 'styled-components';

import { Field, FieldProps, ErrorMessage } from 'formik';

import { colors, Label, Input } from '@kocherga/frontkit';

const ErrorLabel = styled.div`
  color: ${colors.accent[900]};
`;

const LabeledFormField: React.FC<{
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

export default LabeledFormField;
