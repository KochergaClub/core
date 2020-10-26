import React from 'react';
import { FieldError, UseFormMethods } from 'react-hook-form';

import { WideInput } from '~/components';

import FieldContainer from './FieldContainer';

interface Props<T extends Record<string, unknown>> {
  name: keyof T;
  title: string;
  type?: 'string' | 'email' | 'number';
  placeholder?: string;
  form: UseFormMethods<T>;
  required?: boolean;
  defaultValue?: string;
}

const BasicInputField = <T extends Record<string, unknown>>({
  name,
  title,
  type = 'string',
  placeholder,
  defaultValue,
  form,
  required = false,
}: Props<T>): React.ReactElement => {
  return (
    <FieldContainer title={title} error={form.errors[name] as FieldError}>
      <WideInput
        type={type}
        name={name as string}
        placeholder={placeholder}
        defaultValue={defaultValue}
        ref={form.register({ required })}
      />
    </FieldContainer>
  );
};

export default BasicInputField;
