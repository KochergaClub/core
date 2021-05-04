import { format, parseISO } from 'date-fns';
import get from 'lodash/get';
import React from 'react';
import { Controller, FieldError, FieldPath, FieldValues, UseFormReturn } from 'react-hook-form';

import { DatePicker } from '~/components/DatePicker';

import { FieldContainer } from './FieldContainer';

interface Props<TFieldValues extends FieldValues> {
  name: FieldPath<TFieldValues>;
  title: string;
  form: UseFormReturn<TFieldValues>;
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
      error={get(form.formState.errors, name) as FieldError}
      stretch={false}
    >
      <Controller
        control={form.control}
        name={name}
        rules={{ required }}
        defaultValue={defaultValue}
        render={({ field: { onChange, value } }) => {
          return (
            <DatePicker
              value={value ? parseISO(String(value)) : undefined}
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
