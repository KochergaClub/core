import React from 'react';

import Card, { CardList } from '~/components/Card';
import MutedCard from '~/components/MutedCard';

import { AnyViewProps } from './types';

interface Props<I> extends AnyViewProps<I> {
  isMuted?: (item: I) => boolean;
  renderItem: (item: I) => React.ReactElement;
}

function CardListView<I>(props: Props<I>) {
  return (
    <CardList>
      {props.items.map((item, i) => {
        const Wrapper = props.isMuted
          ? props.isMuted(item)
            ? MutedCard
            : Card
          : Card;

        /* TODO - props.item2key */
        return <Wrapper key={i}>{props.renderItem(item)} </Wrapper>;
      })}
    </CardList>
  );
}

export default CardListView;
