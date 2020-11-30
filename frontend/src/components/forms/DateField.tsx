import { format, parseISO } from 'date-fns';
import get from 'lodash/get';
import React from 'react';
import { Controller, FieldError, UseFormMethods } from 'react-hook-form';

import { DatePicker } from '~/components/DatePicker';

import { FieldContainer } from './FieldContainer';

interface Props<T extends Record<string, unknown>> {
  name: keyof T;
  title: string;
  form: UseFormMethods<T>;
  defaultValue?: string;
  required?: boolean;
}

export const DateField = <T extends Record<string, unknown>>({
  name,
  title,
  form,
  defaultValue,
  required = false,
}: Props<T>): React.ReactElement | null => {
  return (
    <FieldContainer
      title={title}
      error={get(form.errors, name) as FieldError}
      stretch={false}
    >
      <Controller
        control={
          form.control as any /* there's something wrong with react-hook-form types, don't know what exactly */
        }
        name={name as string}
        rules={{ required }}
        defaultValue={defaultValue}
        render={({ onChange, value }) => {
          return (
            <DatePicker
              value={value ? parseISO(value) : undefined}
              onChange={(date: Date | null) => {
                onChange(date ? format(date, 'yyyy-MM-dd') : undefined);
              }}
            />
          );
        }}
      />
    </FieldContainer>
  );
};
