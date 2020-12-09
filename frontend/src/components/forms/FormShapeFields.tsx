import React from 'react';
import { UseFormMethods } from 'react-hook-form';

import { Column } from '~/frontkit';

import { FieldShapeBox } from './FieldShapeBox';
import { FormShape, ShapeToValues } from './types';

type Props<S extends FormShape> = {
  shape: S;
  form: UseFormMethods<ShapeToValues<S>>;
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
          name={field.name}
          field={field}
          form={form}
        />
      ))}
    </Column>
  );
};
