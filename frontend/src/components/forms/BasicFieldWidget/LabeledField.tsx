import { ErrorMessage, Field, FieldProps } from 'formik';

import { Label, Row } from '~/frontkit';

import { AnyFormField, FormField } from '../types';
import ErrorLabel from './ErrorLabel';

interface Props {
  for: AnyFormField;
  name: string;
  children: (fieldProps: FieldProps<any>) => React.ReactNode;
}

const LabeledField: React.FC<Props> = ({ for: field, name, children }) => {
  if ((field as FormField).type === 'boolean') {
    return (
      <div>
        <Label>
          <Row vCentered>
            <Field name={name} type="checkbox">
              {children}
            </Field>
            <span>{field.title || field.name}</span>
          </Row>
        </Label>
        <ErrorMessage name={name} component={ErrorLabel} />
      </div>
    );
  }
  return (
    <div>
      <Label>{field.title || field.name}</Label>
      <Field name={name}>{children}</Field>
      <ErrorMessage name={name} component={ErrorLabel} />
    </div>
  );
};

export default LabeledField;
