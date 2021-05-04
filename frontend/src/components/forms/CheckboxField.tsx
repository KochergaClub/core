import get from 'lodash/get';
import React from 'react';
import { FieldError, FieldPath, FieldValues, UseFormReturn } from 'react-hook-form';

import { Column, LabelDiv, Row } from '~/frontkit';

import { FieldErrorMessage } from './FieldErrorMessage';

interface Props<TFieldValues extends FieldValues> {
  name: FieldPath<TFieldValues>;
  title: string;
  form: UseFormReturn<TFieldValues>;
  required?: boolean;
  defaultValue?: boolean;
}

export const CheckboxField = <T extends FieldValues>({
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
            defaultChecked={defaultValue}
            {...form.register(name, { required })}
          />
          {form.formState.errors[name] && (
            <FieldErrorMessage
              error={get(form.formState.errors, name) as FieldError}
            />
          )}
        </Row>
      </Column>
    </label>
  );
};
