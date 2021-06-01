import { AnimatePresence, motion } from 'framer-motion';

import { Card, CardList } from '~/components/cards';

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
          return (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              layout
              key={props.item2key ? props.item2key(item) : i}
            >
              <Card muted={props.isMuted?.(item)}>
                {props.renderItem(item)}
              </Card>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </CardList>
  );
}

export default CardListView;
