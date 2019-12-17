import React from 'react';

import Card, { CardList } from '~/components/Card';
import MutedCard from '~/components/MutedCard';

import { AnyViewProps } from './types';

import ItemDump from './ItemDump';

interface Props<I> extends AnyViewProps<I> {
  isMuted?: (item: I) => boolean;
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
        return (
          <Wrapper key={i}>
            {props.renderItem ? (
              props.renderItem(item)
            ) : (
              <ItemDump item={item} shape={props.shape} />
            )}
          </Wrapper>
        );
      })}
    </CardList>
  );
}

export default CardListView;
