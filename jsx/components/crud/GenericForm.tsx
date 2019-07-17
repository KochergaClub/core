import React, { useCallback } from 'react';

import { Column, Row, Label, Input } from '@kocherga/frontkit';

import { FormField } from './types';

interface Props {
  fields: FormField[];
  onChange: (fields: FormField[]) => void;
}

interface FieldInputProps {
  field: FormField;
  onChange: (value: any) => void;
}

const FieldInput: React.FC<FieldInputProps> = ({ field, onChange }) => {
  if (field.readonly) {
    return <div>{field.value}</div>;
  }
  switch (field.type) {
    case 'string':
      return (
        <Input
          name={field.name}
          value={field.value || ''}
          onChange={onChange}
        />
      );
    case 'number':
      return (
        <Input
          type="number"
          name={field.name}
          value={field.value || 0}
          onChange={onChange}
        />
      );
    case 'choice':
      // TODO - refactor and speed up
      const cb = (e: React.FormEvent<HTMLInputElement>) => {
        onChange(e);
      };

      return (
        <div>
          {field.options.map(option => (
            <Row key={option}>
              <input
                type="radio"
                name={field.name}
                value={option}
                defaultChecked={option === field.value}
                onChange={cb}
              />
              <span>{option}</span>
            </Row>
          ))}
        </div>
      );
  }
};

const GenericForm = ({ fields, onChange }: Props) => {
  const onFieldChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      const { name, value } = e.currentTarget;
      const newFields: FormField[] = fields.map(field => {
        if (field.name !== name) {
          return field;
        }
        if (field.type === 'number') {
          return {
            ...field,
            value: parseInt(value, 10),
          };
        } else {
          return {
            ...field,
            value: String(value),
          };
        }
      });
      onChange(newFields);
    },
    [fields, onChange]
  );

  return (
    <Column>
      {fields.map(field => (
        <div key={field.name}>
          <Label>{field.name}</Label>
          <FieldInput field={field} onChange={onFieldChange} />
        </div>
      ))}
    </Column>
  );
};

export default GenericForm;
