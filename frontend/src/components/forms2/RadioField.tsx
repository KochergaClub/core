import React from 'react';
import { FieldError, UseFormMethods } from 'react-hook-form';

import FieldContainer from './FieldContainer';

interface Props<T extends Record<string, unknown>> {
  name: keyof T;
  title: string;
  form: UseFormMethods<T>;
  options: readonly (readonly [string, string])[];
  required?: boolean;
}

export const RadioField = <T extends Record<string, unknown>>({
  name,
  title,
  options,
  form,
  required = false,
}: Props<T>): React.ReactElement => {
  return (
    <FieldContainer title={title} error={form.errors[name] as FieldError}>
      {options.map((option) => {
        return (
          <div key={option[0]}>
            <label>
              <input
                type="radio"
                name={name as string}
                value={option[0]}
                ref={form.register({ required })}
              />{' '}
              {option[1]}
            </label>
          </div>
        );
      })}
    </FieldContainer>
  );
};
