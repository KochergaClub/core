import React from 'react';

import styled from 'styled-components';

import { Label, colors } from '@kocherga/frontkit';

import { AnyViewProps } from './types';

interface Props<I> extends AnyViewProps<I> {
  extraColumns?: string[];
  renderExtraColumn?: (item: I, id: number) => React.ReactElement;
}

const Table = styled.table`
  border-collapse: collapse;

  td,
  th {
    border: 1px solid ${colors.grey[300]};
    padding: 4px;
  }
`;

function CardListView<I>(props: Props<I>) {
  return (
    <Table>
      <thead>
        <tr>
          {props.shape.map(field => (
            <th>
              <Label>{field.title}</Label>
            </th>
          ))}
          {(props.extraColumns || []).map(extraColumn => (
            <th>
              <Label>{extraColumn}</Label>
            </th>
          ))}
        </tr>
      </thead>
      {props.items.map(item => (
        <tr>
          {props.shape.map(field => (
            <td>{(item as any)[field.name]}</td>
          ))}
          {(props.extraColumns || []).map((_, i) => (
            <td>
              {props.renderExtraColumn
                ? props.renderExtraColumn(item, i)
                : 'renderExtraColumn is unset'}
            </td>
          ))}
        </tr>
      ))}
    </Table>
  );
}

export default CardListView;
