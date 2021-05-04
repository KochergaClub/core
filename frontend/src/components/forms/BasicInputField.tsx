import get from 'lodash/get';
import React from 'react';
import { FieldError, FieldPath, FieldValues, UseFormReturn } from 'react-hook-form';

import { WideInput } from '~/components';

import { FieldContainer } from './FieldContainer';

interface Props<TFieldValues extends FieldValues> {
  name: FieldPath<TFieldValues>;
  title: string;
  type?: 'string' | 'email' | 'number' | 'url' | 'password';
  placeholder?: string;
  form: UseFormReturn<TFieldValues>;
  required?: boolean;
  defaultValue?: string;
}

export const BasicInputField = <T extends Record<string, unknown>>({
  name,
  title,
  type = 'string',
  placeholder,
  defaultValue,
  form,
  required = false,
}: Props<T>): React.ReactElement => {
  return (
    <FieldContainer
      title={title}
      error={get(form.formState.errors, name) as FieldError}
    >
      <WideInput
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        {...form.register(name, {
          required,
          pattern: type === 'email' ? /^\S+@\S+$/i : undefined,
        })}
      />
    </FieldContainer>
  );
};
