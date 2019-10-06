import React from 'react';

import { Field, FieldProps } from 'formik';

import { Label } from '@kocherga/frontkit';

import LabeledFormField from './LabeledFormField';

import { FormField } from './types';

interface Props {
  field: FormField;
}

const FieldInput: React.FC<Props> = ({ field }) => {
  if (field.readonly) {
    return (
      <div>
        <Label>{field.name}</Label>
        <div>{field.value}</div>
      </div>
    );
  }
  switch (field.type) {
    case 'string':
      return <LabeledFormField name={field.name} title={field.title} />;
    case 'email':
      return (
        <LabeledFormField name={field.name} title={field.title} type="email" />
      );
    case 'date':
      return (
        <LabeledFormField name={field.name} title={field.title} type="date" />
      );
    case 'password':
      return (
        <LabeledFormField
          name={field.name}
          title={field.name}
          type="password"
        />
      );
    case 'number':
      return (
        <LabeledFormField name={field.name} title={field.title} type="number" />
      );
    case 'choice':
      return (
        <div>
          <Field
            name={field.name}
            render={({ field: formikField }: FieldProps<any>) => (
              <div>
                <Label>{field.name}</Label>
                {field.options.map(option => {
                  return (
                    <div>
                      <label key={option}>
                        <input
                          type="radio"
                          {...formikField}
                          checked={formikField.value === option}
                          value={option}
                        />{' '}
                        {option}
                      </label>
                    </div>
                  ); // FIXME - error message???
                })}
              </div>
            )}
          />
        </div>
      );
    case 'boolean':
      return (
        <LabeledFormField
          name={field.name}
          title={field.title}
          type="checkbox"
        />
      );
  }
};

export default FieldInput;
