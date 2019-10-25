import React from 'react';

import { Label, Input } from '@kocherga/frontkit';

import LabeledField from './LabeledField';

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
      return (
        <LabeledField for={field}>
          {({ field }) => <Input {...field} type="text" />}
        </LabeledField>
      );
    case 'email':
      return (
        <LabeledField for={field}>
          {({ field }) => <Input {...field} type="email" />}
        </LabeledField>
      );
    case 'date':
      return (
        <LabeledField for={field}>
          {({ field }) => <Input {...field} type="date" />}
        </LabeledField>
      );
    case 'password':
      return (
        <LabeledField for={field}>
          {({ field }) => <Input {...field} type="password" />}
        </LabeledField>
      );
    case 'number':
      return (
        <LabeledField for={field}>
          {({ field: formikField }) => (
            <Input
              {...formikField}
              type="number"
              min={field.min}
              max={field.max}
            />
          )}
        </LabeledField>
      );
    case 'choice':
      return (
        <LabeledField for={field}>
          {({ field: formikField }) => (
            <React.Fragment>
              {field.options.map(option => {
                return (
                  <div key={option}>
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
                );
              })}
            </React.Fragment>
          )}
        </LabeledField>
      );
    case 'boolean':
      return (
        <LabeledField for={field}>
          {({ field }) => <Input {...field} type="checkbox" />}
        </LabeledField>
      );
  }
};

export default FieldInput;
