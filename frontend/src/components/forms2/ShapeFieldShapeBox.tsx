import React from 'react';
import { UseFormMethods } from 'react-hook-form';

import { ShapeFieldShape } from '../forms/types';
import FieldContainer from './FieldContainer';
import { FieldShapeBox } from './FieldShapeBox';

// interface Props<T extends Record<string, unknown>> {
//   name: string;
//   form: UseFormMethods<T>;
// }

interface Props<T extends Record<string, unknown>> {
  name: keyof T;
  form: UseFormMethods<T>;
  field: ShapeFieldShape;
}

export const ShapeFieldShapeBox = <T extends Record<string, unknown>>({
  name,
  field,
  form,
}: Props<T>): React.ReactElement => {
  return (
    <FieldContainer title={field.title || field.name} error={undefined}>
      {field.shape.map((subfield, i) => (
        <FieldShapeBox
          key={i}
          name={name + '.' + subfield.name}
          field={subfield}
          form={form}
        />
      ))}
    </FieldContainer>
  );
};
