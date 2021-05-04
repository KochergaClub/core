import React from 'react';
import { FieldPath, FieldValues, UseFormReturn } from 'react-hook-form';

import { FieldContainer } from './FieldContainer';
import { FieldShapeBox } from './FieldShapeBox';
import { FieldToValue, ShapeFieldShape, ShapeToValues } from './types';

interface Props<TFieldValues extends FieldValues, F extends ShapeFieldShape> {
  name: FieldPath<TFieldValues>;
  form: UseFormReturn<TFieldValues>;
  field: F;
  defaultValue?: ShapeToValues<F['shape']>;
}

export const ShapeFieldShapeBox = <
  T extends FieldValues,
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
          name={`${name}.${subfield.name}` as FieldPath<T>}
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
