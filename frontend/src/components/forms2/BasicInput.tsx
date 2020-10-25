import React from 'react';
import { FieldError, UseFormMethods } from 'react-hook-form';

import { WideInput } from '~/components';
import { Label, Row } from '~/frontkit';

import ErrorMessage from './ErrorMessage';

interface Props<T extends Record<string, unknown>> {
  name: keyof T;
  title: string;
  placeholder?: string;
  form: UseFormMethods<T>;
  required?: boolean;
  type?: 'string' | 'email';
}

const BasicInput = <T extends Record<string, unknown>>({
  name,
  title,
  type,
  placeholder,
  required,
  form,
}: Props<T>): React.ReactElement => {
  return (
    <div>
      <Row>
        <Label>{title}</Label>
        {form.errors[name] && (
          <ErrorMessage error={form.errors[name] as FieldError} />
        )}
      </Row>
      <WideInput
        type={type || 'string'}
        name={name}
        placeholder={placeholder}
        ref={form.register({ required: required || false })}
      />
    </div>
  );
};

export default BasicInput;
