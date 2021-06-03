import clsx from 'clsx';
import { isBefore, parseISO } from 'date-fns';
import Link from 'next/link';

import { formatDate } from '~/common/utils';
import { A } from '~/frontkit';

import { MutedSpan } from '../../components/ui';
import { evenmanEventRoute } from '../../routes';
import { EventsPrototypeFragment } from '../queries.generated';

const commonCellClasses = 'border border-gray-300 px-1.5 py-0.5';

const Cell: React.FC = ({ children }) => (
  <td className={clsx(commonCellClasses)}>{children}</td>
);

const TableHeader: React.FC = ({ children }) => (
  <th className={clsx(commonCellClasses, 'bg-gray-200')}>{children}</th>
);

const TableRow: React.FC<{ past: boolean }> = ({ past, children }) => (
  <tr className={past ? 'bg-gray-100' : 'bg-white'}>{children}</tr>
);

interface Props {
  prototype: EventsPrototypeFragment;
}

const ExistingEvents: React.FC<Props> = ({ prototype }) => {
  const instances = prototype.instances;

  return (
    <div>
      {instances.length ? (
        <table className="border-collapse w-full">
          <tbody>
            <tr>
              <TableHeader>Дата</TableHeader>
              <TableHeader>Название</TableHeader>
              <TableHeader>Посетителей</TableHeader>
            </tr>
            {instances.map((e) => (
              <TableRow
                key={e.id}
                past={isBefore(parseISO(e.start), new Date())}
              >
                <Cell>{formatDate(parseISO(e.start), 'd MMMM')} </Cell>
                <Cell>
                  <Link href={evenmanEventRoute(e.id)} passHref>
                    <A>{e.title}</A>
                  </Link>
                </Cell>
                <Cell>{e.visitors}</Cell>
              </TableRow>
            ))}
          </tbody>
        </table>
      ) : (
        <MutedSpan>Нет мероприятий</MutedSpan>
      )}
    </div>
  );
};

export default ExistingEvents;
