import { useLazyQuery } from '@apollo/client';

import HeadlessConnection from '~/components/collections/HeadlessConnection';
import SmallPager from '~/components/collections/SmallPager';
import { Badge, Column } from '~/frontkit';

import { RatioTicketTypeFragment } from '../../queries.generated';
import { RatioPromocodesPageDocument } from './queries.generated';

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
  const connection = queryResults.data
    ? queryResults.data.ratioTicketType.promocodes
    : ticketType.promocodes;

  return (
    <HeadlessConnection connection={connection} fetchPage={fetchPage}>
      {({ items, next, previous }) => (
        <div>
          <header>
            <strong>Промокоды</strong>
          </header>
          <Column>
            {items.map((item) => (
              <Badge key={item.id}>{item.code}</Badge>
            ))}
          </Column>
          <SmallPager
            next={next}
            previous={previous}
            pageInfo={connection.pageInfo}
          />
        </div>
      )}
    </HeadlessConnection>
  );
};

export default PromocodesCollection;
