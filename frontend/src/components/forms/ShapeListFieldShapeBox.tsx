import React from 'react';
import FlipMove from 'react-flip-move';
import { FieldPath, FieldValues, useFieldArray, UseFormReturn } from 'react-hook-form';
import styled from 'styled-components';

import { Button, colors, Column, fonts, Label, Row } from '~/frontkit';

import { FieldShapeBox } from './FieldShapeBox';
import { AnyFormValues, FormShape, ShapeListFieldShape } from './types';

const ListContainer = styled.div`
  border: 1px dotted ${colors.grey[300]};
  padding: 4px;
`;

const ItemNumber = styled.div`
  border-radius: 20px;
  padding: 0 8px;
  background-color: ${colors.primary[700]};
  color: white;
  font-size: ${fonts.sizes.XS};
`;

const ItemContainer = styled.div`
  border: 1px dotted ${colors.grey[300]};
  padding: 4px;
  margin-bottom: 4px;

  &:hover {
    background-color: ${colors.grey[100]};
  }
`;

// TODO - move back to utils.ts?
const buildInitialValues = (shape: FormShape): AnyFormValues => {
  const result: AnyFormValues = {};
  for (const field of shape) {
    let value: AnyFormValues[keyof AnyFormValues] = '';

    switch (field.type) {
      case 'boolean':
        value = false;
        break;
      case 'shape':
        value = buildInitialValues(field.shape);
        break;
      case 'shape-list':
        value = [];
        break;
      // TODO - value = 0 for numbers after we adopt `valueAsNumber`
    }
    result[field.name] = value;
  }
  return result;
};

interface Props<TFieldValues extends FieldValues> {
  name: FieldPath<TFieldValues>;
  form: UseFormReturn<TFieldValues>;
  field: ShapeListFieldShape;
}

export const ShapeListFieldShapeBox = <T extends FieldValues>({
  name,
  form,
  field,
}: Props<T>): React.ReactElement => {
  const { fields: hookFields, append, swap, remove } = useFieldArray({
    control: form.control,
    name: (name as string) as any,
  });

  return (
    <ListContainer>
      <Label>{field.title || field.name}</Label>
      <FlipMove>
        {hookFields.map((hookField, i) => (
          <ItemContainer key={hookField.id}>
            <Column stretch>
              <Row spaced vCentered>
                <ItemNumber>{i + 1}</ItemNumber>
                <Row>
                  <Button
                    size="small"
                    type="button"
                    onClick={() => {
                      remove(i);
                    }}
                  >
                    удалить
                  </Button>
                  {i > 0 && (
                    <Button
                      size="small"
                      type="button"
                      onClick={() => {
                        swap(i, i - 1);
                      }}
                    >
                      &uarr;
                    </Button>
                  )}
                  {i < hookFields.length - 1 && (
                    <Button
                      size="small"
                      type="button"
                      onClick={() => {
                        swap(i, i + 1);
                      }}
                    >
                      &darr;
                    </Button>
                  )}
                </Row>
              </Row>
              <div>
                {field.shape.map((subfield) => (
                  <FieldShapeBox
                    key={subfield.name}
                    name={`${name}[${i}].${subfield.name}` as FieldPath<T>}
                    field={subfield}
                    form={form}
                    defaultValue={(hookField as any)[subfield.name]}
                  />
                ))}
              </div>
            </Column>
          </ItemContainer>
        ))}
      </FlipMove>
      <Button
        size="small"
        type="button"
        onClick={() => {
          const result = buildInitialValues(field.shape);
          append(result as any);
        }}
      >
        добавить
      </Button>
    </ListContainer>
  );
};
