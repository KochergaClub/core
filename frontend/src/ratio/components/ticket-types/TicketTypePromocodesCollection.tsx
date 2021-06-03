import { useLazyQuery } from '@apollo/client';

import { RatioTicketTypeFragment } from '../../queries.generated';
import PromocodesCollection from '../promocodes/PromocodesCollection';
import { RatioTicketTypePromocodesPageDocument } from './queries.generated';

interface Props {
  ticketType: RatioTicketTypeFragment;
}

const TicketTypePromocodesCollection: React.FC<Props> = ({ ticketType }) => {
  const [fetchPromocodes, queryResults] = useLazyQuery(
    RatioTicketTypePromocodesPageDocument
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

  if (ticketType.promocodes.edges.length === 0) {
    return null;
  }

  const connection = queryResults.data
    ? queryResults.data.ratioTicketType.promocodes
    : ticketType.promocodes;

  return (
    <div className="p-2 border border-gray-200">
      <PromocodesCollection
        connection={connection}
        fetchPage={fetchPage}
        total={ticketType.promocodes_count}
      />
    </div>
  );
};

export default TicketTypePromocodesCollection;
