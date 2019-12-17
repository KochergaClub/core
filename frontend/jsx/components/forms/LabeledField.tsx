import { Field, FieldProps, ErrorMessage } from 'formik';

import { Row, Label } from '@kocherga/frontkit';

import { AnyFormField, FormField } from './types';
import ErrorLabel from './ErrorLabel';

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
