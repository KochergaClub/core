import { observer } from 'mobx-react';
import * as React from 'react';

import { NavList, NavListItem } from '../components/NavList';
import { NumberBadge, MutedSpan } from '../components/ui';
import { Row } from '@kocherga/frontkit';

import EventPrototype from '../stores/EventPrototype';

interface Props {
  items: EventPrototype[];
  selectedId?: number;
  select: (id: number) => void;
  title: string;
}

const weekdayLetterCodes = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];
const padToTwoDigits = (value: number) => (value < 10 ? `0${value}` : `${value}`);

const TimeInfo = observer(
  ({ prototype }: { prototype: EventPrototype }) => (
    <span>
      <b>{weekdayLetterCodes[prototype.weekday]}</b>
      {' '}
      <MutedSpan>
        {padToTwoDigits(prototype.hour)}:{padToTwoDigits(prototype.minute)}
      </MutedSpan>
    </span>
  )
);

const PrototypeItem = observer(
  ({ prototype }: { prototype: EventPrototype }) => (
    <div>
      <Row spaced>
        {prototype.title}
        {
          Boolean(prototype.upcomingCount) &&
          <NumberBadge>{prototype.upcomingCount}</NumberBadge>
        }
      </Row>
      <TimeInfo prototype={prototype} />
    </div>
  )
);

const PrototypeNavList = observer(
  ({ items, title, selectedId, select }: Props) => {
    return (
      <NavList title={title}>
        {items.map(item => (
          <NavListItem
            key={item.id}
            selected={item.id === selectedId}
            select={() => select(item.id)}
          >
            <PrototypeItem prototype={item} />
          </NavListItem>
        ))}
      </NavList>
    );
  }
);

export default PrototypeNavList;
