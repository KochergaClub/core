import React from 'react';

import styled from 'styled-components';

import { Label, colors } from '@kocherga/frontkit';

import { FormField, FormShape } from '~/components/forms/types';
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

interface CellProps<I> {
  field: FormField;
  item: I;
}

function TableViewCell<I>({ field, item }: CellProps<I>) {
  let value = (item as any)[field.name];

  if (field.type === 'boolean') {
    value = value ? '1' : '0'; // TODO - v/x icon
  }

  return <td>{value}</td>;
}

interface RowProps<I> {
  shape: FormShape;
  item: I;
  extraColumns?: string[];
  renderExtraColumn?: (item: I, id: number) => React.ReactElement;
}

function TableViewRow<I>({
  shape,
  item,
  extraColumns,
  renderExtraColumn,
}: RowProps<I>) {
  return (
    <tr>
      {shape.map(field => (
        <TableViewCell key={field.name} field={field} item={item} />
      ))}
      {(extraColumns || []).map((_, i) => (
        <td key={i}>
          {renderExtraColumn
            ? renderExtraColumn(item, i)
            : 'renderExtraColumn is unset'}
        </td>
      ))}
    </tr>
  );
}

function TableView<I>(props: Props<I>) {
  if (!props.items.length) {
    return <div>Нет данных.</div>;
  }

  return (
    <Table>
      <thead>
        <tr>
          {props.shape.map(field => (
            <th key={field.name}>
              <Label>{field.title}</Label>
            </th>
          ))}
          {(props.extraColumns || []).map((extraColumn, i) => (
            <th key={i}>
              <Label>{extraColumn}</Label>
            </th>
          ))}
        </tr>
      </thead>
      {props.items.map((item, i) => (
        <TableViewRow
          shape={props.shape}
          item={item}
          key={i}
          extraColumns={props.extraColumns}
          renderExtraColumn={props.renderExtraColumn}
        />
      ))}
    </Table>
  );
}

export default TableView;
