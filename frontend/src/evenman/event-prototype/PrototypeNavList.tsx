import Router from 'next/router';

import { Row } from '~/frontkit';

import { NavList, NavListItem } from '../components/NavList';
import { NumberBadge, MutedSpan } from '../components/ui';

import { EventsPrototype_SummaryFragment } from './queries.generated';
import { prototypeRoute } from '../routes';

interface Props {
  items: EventsPrototype_SummaryFragment[];
  selectedId?: string;
  title: string;
}

const weekdayLetterCodes = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];
const padToTwoDigits = (value: number) =>
  value < 10 ? `0${value}` : `${value}`;

const TimeInfo: React.FC<{ prototype: EventsPrototype_SummaryFragment }> = ({
  prototype,
}) => (
  <span>
    <b>{weekdayLetterCodes[prototype.weekday]}</b>{' '}
    <MutedSpan>
      {padToTwoDigits(prototype.hour)}:{padToTwoDigits(prototype.minute)}
    </MutedSpan>
  </span>
);

const PrototypeItem: React.FC<{
  prototype: EventsPrototype_SummaryFragment;
}> = ({ prototype }) => (
  <div>
    <Row spaced>
      {prototype.title}
      {Boolean(prototype.suggested_dates.length) && (
        <NumberBadge>{prototype.suggested_dates.length}</NumberBadge>
      )}
    </Row>
    <TimeInfo prototype={prototype} />
  </div>
);

const PrototypeNavList: React.FC<Props> = ({ items, title, selectedId }) => {
  return (
    <NavList title={title}>
      {items.map(item => (
        <NavListItem
          key={item.id}
          selected={item.id === selectedId}
          select={() => {
            const route = prototypeRoute(item.id);
            Router.push(route.href, route.as);
          }}
        >
          <PrototypeItem prototype={item} />
        </NavListItem>
      ))}
    </NavList>
  );
};

export default PrototypeNavList;
