import React from 'react';
import { UseFormMethods } from 'react-hook-form';

import { FieldToValue, ShapeFieldShape, ShapeToValues } from '../forms/types';
import { FieldContainer } from './FieldContainer';
import { FieldShapeBox } from './FieldShapeBox';

interface Props<T extends Record<string, unknown>, F extends ShapeFieldShape> {
  name: keyof T;
  form: UseFormMethods<T>;
  field: F;
  defaultValue?: ShapeToValues<F['shape']>;
}

export const ShapeFieldShapeBox = <
  T extends Record<string, unknown>,
  F extends ShapeFieldShape
>({
  name,
  field,
  defaultValue,
  form,
}: Props<T, F>): React.ReactElement => {
  return (
    <FieldContainer title={field.title || field.name} error={undefined}>
      {field.shape.map((subfield, i) => (
        <FieldShapeBox
          key={i}
          name={name + '.' + subfield.name}
          field={subfield}
          defaultValue={
            defaultValue
              ? (defaultValue[subfield.name] as FieldToValue<typeof subfield>)
              : undefined
          }
          form={form}
        />
      ))}
    </FieldContainer>
  );
};
