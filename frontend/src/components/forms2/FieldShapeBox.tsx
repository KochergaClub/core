import React from 'react';
import { UseFormMethods } from 'react-hook-form';

import { FieldShape } from '../forms/types';
import { AsyncSelectField } from './AsyncSelectField';
import BasicInputField from './BasicInputField';
import { CheckboxField } from './CheckboxField';
import { DateField } from './DateField';
import { ImageField } from './ImageField';
import { ListFieldShapeBox } from './ListFieldShapeBox';
import { RadioField } from './RadioField';
import RichTextField from './RichTextField';
import { SelectField } from './SelectField';
import { ShapeFieldShapeBox } from './ShapeFieldShapeBox';

type Props<V extends Record<string, unknown>> = {
  name: string;
  field: FieldShape;
  form: UseFormMethods<V>;
};

export const FieldShapeBox = <V extends Record<string, unknown>>({
  name,
  field,
  form,
}: Props<V>): React.ReactElement => {
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
          required={!field.optional}
          form={form}
        />
      );
    case 'date':
      return (
        <DateField
          name={name}
          title={field.title || field.name}
          form={form}
          required={!field.optional}
        />
      );
    case 'boolean':
      return (
        <CheckboxField
          name={name}
          title={field.title || field.name}
          form={form}
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
          required={!field.optional}
        />
      );
    case 'image':
      return (
        <ImageField
          name={name}
          title={field.title || field.name}
          form={form}
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
            options={field.options}
            required={!field.optional}
          />
        );
      }
    case 'shape':
      return <ShapeFieldShapeBox name={name} form={form} field={field} />;
    case 'list':
      return <ListFieldShapeBox name={name} form={form} field={field} />;
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
