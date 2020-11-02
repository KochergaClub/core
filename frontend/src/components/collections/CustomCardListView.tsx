import { AnimatePresence, motion } from 'framer-motion';

import Card, { CardList } from '~/components/Card';
import MutedCard from '~/components/MutedCard';

import { AnyViewProps } from './types';

interface Props<I> extends AnyViewProps<I> {
  isMuted?: (item: I) => boolean;
  renderItem: (item: I) => React.ReactElement;
}

function CardListView<I>(props: Props<I>) {
  // animations are broken here for some complicated/unknown reason
  return (
    <CardList>
      <AnimatePresence initial={false}>
        {props.items.map((item, i) => {
          const Wrapper = props.isMuted
            ? props.isMuted(item)
              ? MutedCard
              : Card
            : Card;

          return (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              layout
              key={props.item2key ? props.item2key(item) : i}
            >
              <Wrapper>{props.renderItem(item)}</Wrapper>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </CardList>
  );
}

export default CardListView;
