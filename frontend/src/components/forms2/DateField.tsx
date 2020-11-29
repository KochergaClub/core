import 'react-datepicker/dist/react-datepicker.css';

import { format, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';
import get from 'lodash/get';
import React from 'react';
import DatePicker from 'react-datepicker';
import { Controller, FieldError, UseFormMethods } from 'react-hook-form';

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
    <FieldContainer title={title} error={get(form.errors, name) as FieldError}>
      <Controller
        control={
          form.control as any /* there's something wrong with react-hook-form types, don't know what exactly */
        }
        name={name as string}
        rules={{ required }}
        defaultValue={defaultValue ? parseISO(defaultValue) : new Date()}
        render={({ onChange, value }) => (
          <DatePicker
            selected={value ? parseISO(value) : new Date()}
            onChange={(date: Date | null) => {
              onChange(date ? format(date, 'yyyy-MM-dd') : undefined);
            }}
            dateFormat="yyyy-MM-dd"
            locale={ru}
            inline
          />
        )}
      />
    </FieldContainer>
  );
};
