import { useLazyQuery } from '@apollo/client';

import { PagedApolloCollection } from '~/components/collections';
import { AnyViewProps } from '~/components/collections/types';
import { Badge, Column } from '~/frontkit';

import { RatioPromocodeFragment, RatioTicketTypeFragment } from '../../queries.generated';
import { RatioPromocodesPageDocument } from './queries.generated';

const View: React.FC<AnyViewProps<RatioPromocodeFragment>> = (props) => (
  <Column>
    {props.items.map((item) => (
      <Badge key={item.id}>{item.code}</Badge>
    ))}
  </Column>
);

interface Props {
  ticketType: RatioTicketTypeFragment;
}

const PromocodesCollection: React.FC<Props> = ({ ticketType }) => {
  const [fetchPromocodes, queryResults] = useLazyQuery(
    RatioPromocodesPageDocument
  );

  const fetchPage = async (args?: {
    before?: string | null;
    after?: string | null;
    first?: number | null;
    last?: number | null;
  }) => {
    await fetchPromocodes({
      variables: {
        ...(args || {}),
        ticket_type_id: ticketType.id,
      },
    });
  };

  return (
    <PagedApolloCollection
      names={{
        plural: 'промокоды',
        genitive: 'промокод',
      }}
      fetchPage={fetchPage}
      connection={
        queryResults.data
          ? queryResults.data.ratioTicketType.promocodes
          : ticketType.promocodes
      }
      view={View}
    />
  );
};

export default PromocodesCollection;

{
  /* <HeadlessCollection
    fetchPage={...}
    connection={...}
    >
    {
        ({ items }) => (
            <div>
                <CollectionHeader />
                <Collection items={items} view={View} />
                <Pager />
            </div>
        )
    }
</HeadlessCollection> */
}
