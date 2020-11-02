import styled from 'styled-components';

import { useLazyQuery } from '@apollo/client';

import { colors } from '~/frontkit';

import { RatioTicketTypeFragment } from '../../queries.generated';
import PromocodesCollection from '../promocodes/PromocodesCollection';
import { RatioTicketTypePromocodesPageDocument } from './queries.generated';

const Container = styled.div`
  padding: 8px;
  border: 1px solid ${colors.grey[200]};
`;

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
    <Container>
      <PromocodesCollection
        connection={connection}
        fetchPage={fetchPage}
        total={ticketType.promocodes_count}
      />
    </Container>
  );
};

export default TicketTypePromocodesCollection;
