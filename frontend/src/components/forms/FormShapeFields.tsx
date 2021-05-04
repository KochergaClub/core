import React from 'react';
import { FieldPath, UseFormReturn } from 'react-hook-form';

import { Column } from '~/frontkit';

import { FieldShapeBox } from './FieldShapeBox';
import { FormShape, ShapeToValues } from './types';

type Props<S extends FormShape> = {
  shape: S;
  form: UseFormReturn<ShapeToValues<S>>;
};

export const FormShapeFields = <S extends FormShape>({
  shape,
  form,
}: Props<S>): React.ReactElement | null => {
  return (
    <Column gutter={16} stretch>
      {shape.map((field) => (
        <FieldShapeBox
          key={field.name}
          name={field.name as FieldPath<ShapeToValues<S>>}
          field={field}
          form={form}
        />
      ))}
    </Column>
  );
};
