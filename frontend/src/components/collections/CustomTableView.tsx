import { AnyViewProps } from './types';

import { Table, TableHeaderCell } from './tables';

interface Props<I> extends AnyViewProps<I> {
  columns: string[];
  renderHeaderCell: (column: string) => React.ReactElement;
  renderCell: (item: I, column: string) => React.ReactElement;
}

function CustomTableView<I>(props: Props<I>) {
  return (
    <Table>
      <thead>
        <tr>
          {props.columns.map(column => (
            <TableHeaderCell key={column}>
              {props.renderHeaderCell(column)}
            </TableHeaderCell>
          ))}
        </tr>
      </thead>
      <tbody>
        {props.items.map((item, i) => (
          <tr key={i}>
            {props.columns.map(column => (
              <td key={column}>{props.renderCell(item, column)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default CustomTableView;
