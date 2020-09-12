import { FieldArray } from 'formik';
import { useState } from 'react';
import FlipMove from 'react-flip-move';
import styled from 'styled-components';

import { Button, colors, Column, fonts, Label, Row } from '@kocherga/frontkit';

import AnyFieldWidget from './AnyFieldWidget';
import { AnyFormValues, ListFormField } from './types';
import { buildInitialValues } from './utils';

interface Props {
  field: ListFormField;
  values: AnyFormValues[];
  name: string;
  hideLabel?: boolean;
}

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

const ListFieldWidget: React.FC<Props> = ({
  field,
  values,
  name,
  hideLabel,
}) => {
  const [keys, setKeys] = useState(() => {
    return values.map((v, i) => i);
  });

  return (
    <FieldArray name={name}>
      {({ push, remove, swap }) => (
        <ListContainer>
          {hideLabel ? null : <Label>{field.title || field.name}</Label>}
          <FlipMove>
            {values.map((value, i) => {
              const wrappedSwap = (a: number, b: number) => {
                swap(a, b);
                const newKeys = [...keys];
                const t = newKeys[a];
                newKeys[a] = newKeys[b];
                newKeys[b] = t;
                setKeys(newKeys);
              };
              return (
                <ItemContainer key={keys[i]}>
                  <Column stretch>
                    <Row spaced vCentered>
                      <ItemNumber>{i + 1}</ItemNumber>
                      <Row>
                        <Button
                          size="small"
                          type="button"
                          onClick={() => {
                            const newKeys = [...keys];
                            newKeys.splice(i, 1);
                            setKeys(newKeys);
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
                              wrappedSwap(i, i - 1);
                            }}
                          >
                            &uarr;
                          </Button>
                        )}
                        {i < values.length - 1 && (
                          <Button
                            size="small"
                            type="button"
                            onClick={() => {
                              wrappedSwap(i, i + 1);
                            }}
                          >
                            &darr;
                          </Button>
                        )}
                      </Row>
                    </Row>
                    <AnyFieldWidget
                      field={field.field}
                      value={value}
                      name={name + '[' + i + ']'}
                      hideLabel={true}
                    />
                  </Column>
                </ItemContainer>
              );
            })}
          </FlipMove>
          <Button
            size="small"
            type="button"
            onClick={() => {
              const result = buildInitialValues([field.field]);
              push(result[field.field.name]);
              setKeys([...keys, Math.max(...keys) + 1]);
            }}
          >
            добавить
          </Button>
        </ListContainer>
      )}
    </FieldArray>
  );
};

export default ListFieldWidget;
