import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { FieldPath, FieldValues, useFieldArray, UseFormReturn } from 'react-hook-form';

import { Button, Label, Row } from '~/frontkit';

import { FieldShapeBox } from './FieldShapeBox';
import { AnyFormValues, FormShape, ShapeListFieldShape } from './types';

const ItemNumber: React.FC = ({ children }) => (
  <div className="rounded-full px-2 bg-primary-700 text-white text-xs">
    {children}
  </div>
);

const ItemContainer: React.FC = ({ children }) => (
  <motion.div
    className="border border-dotted border-gray-300 p-1 mb-1 hover:bg-gray-100"
    layout
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.5 }}
  >
    {children}
  </motion.div>
);

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
    <div className="p-1 border border-dotted border-gray-300">
      <Label>{field.title || field.name}</Label>
      <AnimatePresence initial={false}>
        {hookFields.map((hookField, i) => (
          <ItemContainer key={hookField.id}>
            <div className="space-y-1">
              <Row spaced vCentered>
                <ItemNumber>{i + 1}</ItemNumber>
                <div className="flex space-x-1">
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
                </div>
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
            </div>
          </ItemContainer>
        ))}
      </AnimatePresence>
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
    </div>
  );
};
