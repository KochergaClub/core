import get from 'lodash/get';
import React from 'react';
import { FieldError, FieldPath, FieldValues, UseFormReturn } from 'react-hook-form';

import { FieldContainer } from './FieldContainer';

interface Props<TFieldValues extends FieldValues> {
  name: FieldPath<TFieldValues>;
  title: string;
  form: UseFormReturn<TFieldValues>;
  options: readonly (readonly [string, string])[];
  defaultValue?: string;
  required?: boolean;
}

export const RadioField = <T extends FieldValues>({
  name,
  title,
  options,
  form,
  defaultValue,
  required = false,
}: Props<T>): React.ReactElement => {
  return (
    <FieldContainer
      title={title}
      error={get(form.formState.errors, name) as FieldError}
    >
      {options.map((option) => {
        return (
          <div key={option[0]}>
            <label>
              <input
                type="radio"
                value={option[0]}
                defaultChecked={option[0] === defaultValue}
                {...form.register(name, { required })}
              />{' '}
              {option[1]}
            </label>
          </div>
        );
      })}
    </FieldContainer>
  );
};
