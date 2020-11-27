import React from 'react';
import FlipMove from 'react-flip-move';
import { useFieldArray, UseFormMethods } from 'react-hook-form';
import styled from 'styled-components';

import { ListFieldShape } from '~/components/forms/types';
import { buildInitialValues } from '~/components/forms/utils';
import { Button, colors, Column, fonts, Label, Row } from '~/frontkit';

import { FieldShapeBox } from './FieldShapeBox';

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

interface Props<T extends Record<string, unknown>> {
  name: string;
  form: UseFormMethods<T>;
  field: ListFieldShape;
}

export const ListFieldShapeBox = <T extends Record<string, unknown>>({
  name,
  form,
  field,
}: Props<T>): React.ReactElement => {
  const { fields: hookFields, append, swap, remove } = useFieldArray({
    control: form.control as any,
    name,
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
              <FieldShapeBox
                name={`name[${i}].${field.field.name}`}
                field={field.field}
                form={form}
              />
            </Column>
          </ItemContainer>
        ))}
      </FlipMove>
      <Button
        size="small"
        type="button"
        onClick={() => {
          const result = buildInitialValues([field.field]);
          append(result);
        }}
      >
        добавить
      </Button>
    </ListContainer>
  );
};
