import { observer } from 'mobx-react';

import Router from 'next/router';

import { NavList, NavListItem } from '../components/NavList';
import { NumberBadge, MutedSpan } from '../components/ui';
import { Row } from '@kocherga/frontkit';

import { EventsPrototype_SummaryFragment } from './queries.generated';

interface Props {
  items: EventsPrototype_SummaryFragment[];
  selectedId?: string;
  title: string;
}

const weekdayLetterCodes = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];
const padToTwoDigits = (value: number) =>
  value < 10 ? `0${value}` : `${value}`;

const TimeInfo = observer(
  ({ prototype }: { prototype: EventsPrototype_SummaryFragment }) => (
    <span>
      <b>{weekdayLetterCodes[prototype.weekday]}</b>{' '}
      <MutedSpan>
        {padToTwoDigits(prototype.hour)}:{padToTwoDigits(prototype.minute)}
      </MutedSpan>
    </span>
  )
);

const PrototypeItem = observer(
  ({ prototype }: { prototype: EventsPrototype_SummaryFragment }) => (
    <div>
      <Row spaced>
        {prototype.title}
        {Boolean(prototype.suggested_dates.length) && (
          <NumberBadge>{prototype.suggested_dates.length}</NumberBadge>
        )}
      </Row>
      <TimeInfo prototype={prototype} />
    </div>
  )
);

const PrototypeNavList: React.FC<Props> = observer(
  ({ items, title, selectedId }) => {
    return (
      <NavList title={title}>
        {items.map(item => (
          <NavListItem
            key={item.id}
            selected={item.id === selectedId}
            select={() =>
              Router.push(
                '/team/evenman/event-prototypes/[id]',
                `/team/evenman/event-prototypes/${item.id}`
              )
            }
          >
            <PrototypeItem prototype={item} />
          </NavListItem>
        ))}
      </NavList>
    );
  }
);

export default PrototypeNavList;
