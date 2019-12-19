import React from 'react';

import { FaCheck } from 'react-icons/fa';

import { FormField, FormShape } from '~/components/forms/types';
import { AnyViewProps } from './types';

import { Table, TableHeaderCell } from './tables';

interface Props<I> extends AnyViewProps<I> {
  shape: FormShape;
  extraColumns?: string[];
  renderExtraColumn?: (item: I, id: number) => React.ReactElement;
}

interface CellProps<I> {
  field: FormField;
  item: I;
}

function TableViewCell<I>({ field, item }: CellProps<I>) {
  let value = (item as any)[field.name];

  if (field.type === 'boolean') {
    if (value) {
      // do we need various boolean value styles for different requirements?
      value = <FaCheck />;
    }
  }

  if (field.type === 'date') {
    if (value) {
      value = value.toString();
    }
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

function ShapedTableView<I>(props: Props<I>) {
  if (!props.items.length) {
    return <div>Нет данных.</div>;
  }

  return (
    <Table>
      <thead>
        <tr>
          {props.shape.map(field => (
            <TableHeaderCell key={field.name}>{field.title}</TableHeaderCell>
          ))}
          {(props.extraColumns || []).map((extraColumn, i) => (
            <TableHeaderCell key={i}>{extraColumn}</TableHeaderCell>
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

export default ShapedTableView;
