import React from 'react';
import { UseFormMethods } from 'react-hook-form';

import { FieldShape, FieldToValue } from '../forms/types';
import { AsyncSelectField } from './AsyncSelectField';
import { BasicInputField } from './BasicInputField';
import { CheckboxField } from './CheckboxField';
import { DateField } from './DateField';
import { ImageField } from './ImageField';
import { RadioField } from './RadioField';
import { RichTextField } from './RichTextField';
import { SelectField } from './SelectField';
import { ShapeFieldShapeBox } from './ShapeFieldShapeBox';
import { ShapeListFieldShapeBox } from './ShapeListFieldShapeBox';

type Props<V extends Record<string, unknown>, F extends FieldShape> = {
  name: string;
  field: F;
  form: UseFormMethods<V>;
  // We _mostly_ don't need this prop since `defaultValues` argument to useForm() is usually better.
  // But we still need it because fields built by useFieldArray require an explicit defaultValue,
  // and ShapeListFieldShapeBox children can include any fields (even nested).
  // Note that, unlike `defaultValues` in useForm(), this field is not DeepPartial, at least for now.
  defaultValue?: FieldToValue<F>;
};

export const FieldShapeBox = <
  V extends Record<string, unknown>,
  F extends FieldShape
>({
  name,
  field: _field,
  defaultValue,
  form,
}: Props<V, F>): React.ReactElement => {
  // ts can't discriminate unions over generic parameters
  const field: FieldShape = _field;

  switch (field.type) {
    case 'string':
    case 'email':
    case 'number':
    case 'password':
      return (
        <BasicInputField
          name={name}
          title={field.title || field.name}
          type={field.type}
          defaultValue={defaultValue as FieldToValue<typeof field> | undefined}
          required={!field.optional}
          form={form}
        />
      );
    case 'date':
      return (
        <DateField
          name={name}
          title={field.title || field.name}
          defaultValue={defaultValue as FieldToValue<typeof field> | undefined}
          required={!field.optional}
          form={form}
        />
      );
    case 'boolean':
      return (
        <CheckboxField
          name={name}
          title={field.title || field.name}
          form={form}
          defaultValue={defaultValue as FieldToValue<typeof field> | undefined}
          // checkboxes are never required (for now)
          // required={!field.optional}
        />
      );
    case 'richtext':
      return (
        <RichTextField
          name={name}
          title={field.title || field.name}
          form={form}
          defaultValue={defaultValue as FieldToValue<typeof field> | undefined}
          required={!field.optional}
        />
      );
    case 'image':
      return (
        <ImageField
          name={name}
          title={field.title || field.name}
          form={form}
          defaultValue={defaultValue as FieldToValue<typeof field> | undefined}
          required={!field.optional}
        />
      );
    case 'choice':
      if (field.widget === 'radio') {
        return (
          <RadioField
            name={name}
            title={field.title || field.name}
            form={form}
            defaultValue={
              defaultValue as FieldToValue<typeof field> | undefined
            }
            options={field.options}
            required={!field.optional}
          />
        );
      } else {
        return (
          <SelectField
            name={name}
            title={field.title || field.name}
            form={form}
            defaultValue={
              defaultValue as FieldToValue<typeof field> | undefined
            }
            options={field.options}
            required={!field.optional}
          />
        );
      }
    case 'shape':
      return (
        <ShapeFieldShapeBox
          name={name}
          form={form}
          field={field}
          defaultValue={defaultValue as FieldToValue<typeof field> | undefined}
        />
      );
    case 'shape-list':
      return (
        <ShapeListFieldShapeBox
          name={name}
          form={form}
          field={field}
          // TODO - defaultValue for shape-list is not supported yet
          // defaultValue={defaultValue as FieldToValue<typeof field> | undefined}
        />
      );
    case 'fk':
      return (
        <AsyncSelectField
          name={name}
          title={field.title || field.name}
          form={form}
          required={!field.optional}
          display={field.widget.display}
          load={field.widget.load}
          getValue={field.widget.getValue}
        />
      );
  }
};
