import { useQuery } from '@apollo/client';

import { ApolloQueryResults, PaddedBlock } from '~/components';
import { CustomCardListView, PagedApolloCollection } from '~/components/collections';

import OrderCard from './OrderCard';
import { RatioOrderFragment, RatioOrdersDocument } from './queries.generated';

const isMuted = (order: RatioOrderFragment) => order.fulfilled;

const renderItem = (order: RatioOrderFragment) => <OrderCard order={order} />;

const OrderCollectionBlock: React.FC = () => {
  const queryResults = useQuery(RatioOrdersDocument, {
    variables: {
      first: 5,
    },
  });

  return (
    <PaddedBlock width="max">
      <ApolloQueryResults {...queryResults} size="block">
        {({ data: { orders } }) => (
          <PagedApolloCollection
            connection={orders}
            fetchPage={queryResults.refetch}
            names={{
              plural: 'заказы',
              genitive: 'заказ',
            }}
            view={(props) => (
              <CustomCardListView
                {...props}
                renderItem={renderItem}
                isMuted={isMuted}
              />
            )}
          />
        )}
      </ApolloQueryResults>
    </PaddedBlock>
  );
};

export default OrderCollectionBlock;
