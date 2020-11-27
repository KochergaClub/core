import React from 'react';
import { UseFormMethods } from 'react-hook-form';

import { Column } from '~/frontkit';

import {
    BooleanFieldShape, ChoiceFieldShape, FieldShape, FormShape, ImageFieldShape, ListFieldShape,
    NumberFieldShape, RichTextFieldShape, ShapeFieldShape, StringFieldShape
} from '../forms/types';
import { FieldShapeBox } from './FieldShapeBox';

type FieldToValue<T extends FieldShape> = (
    T extends StringFieldShape ? string :
    T extends NumberFieldShape ? string : // number is represented as string in form.handleSubmit
    T extends RichTextFieldShape ? string :
    T extends BooleanFieldShape ? boolean :
    T extends ImageFieldShape ? string :
    T extends ChoiceFieldShape ? string :
    T extends ShapeFieldShape ? ShapeToValues<T['shape']> :
    T extends ListFieldShape ? FieldToValue<T['field']>[] :
    never
);

type _FilterKey<T extends FormShape, K extends keyof T> = 
  T[K] extends FieldShape ? (K extends number ? never : T[K]['name']) : never;

type _ValueByKey<T extends FormShape, K extends keyof T> = 
  T[K] extends FieldShape ? (K extends number ? never : FieldToValue<T[K]>) : never;

export type ShapeToValues<T extends FormShape> = T extends readonly [unknown, ...unknown[]] ? {
  [K in keyof T as _FilterKey<T, K>]: _ValueByKey<T, K>
} : Record<string, unknown>;

type Props<S extends FormShape> = {
  shape: S;
  form: UseFormMethods<ShapeToValues<S>>;
};

export const FormShapeFields = <S extends FormShape>({
  shape, form
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
