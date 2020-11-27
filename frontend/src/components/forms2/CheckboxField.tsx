import React from 'react';
import { FieldError, UseFormMethods } from 'react-hook-form';

import { Column, LabelDiv, Row } from '~/frontkit';

import FieldErrorMessage from './FieldErrorMessage';

interface Props<T extends Record<string, unknown>> {
  name: keyof T;
  title: string;
  form: UseFormMethods<T>;
  required?: boolean;
  defaultValue?: string;
}

export const CheckboxField = <T extends Record<string, unknown>>({
  name,
  title,
  defaultValue,
  form,
  required = false,
}: Props<T>): React.ReactElement => {
  return (
    <label>
      <Column gutter={4} stretch>
        <Row vCentered>
          <LabelDiv>{title}</LabelDiv>
          <input
            type="checkbox"
            name={name as string}
            defaultValue={defaultValue}
            ref={form.register({ required })}
          />
          {form.errors[name] && (
            <FieldErrorMessage error={form.errors[name] as FieldError} />
          )}
        </Row>
      </Column>
    </label>
  );
};
