import styled from 'styled-components';

import { useLazyQuery } from '@apollo/client';

import HeadlessConnection from '~/components/collections/HeadlessConnection';
import SmallPager from '~/components/collections/SmallPager';
import { Badge, colors, Column, Row } from '~/frontkit';

import { RatioTicketTypeFragment } from '../../queries.generated';
import { RatioPromocodesPageDocument } from './queries.generated';

const Container = styled.div`
  padding: 8px;
  border: 1px solid ${colors.grey[200]};
`;

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

  if (ticketType.promocodes.edges.length === 0) {
    return null;
  }

  const connection = queryResults.data
    ? queryResults.data.ratioTicketType.promocodes
    : ticketType.promocodes;

  return (
    <HeadlessConnection connection={connection} fetchPage={fetchPage}>
      {({ items, next, previous }) => (
        <Container>
          <header>
            <strong>Промокоды ({ticketType.promocodes_count})</strong>
          </header>
          <Column>
            {items.map((item) => (
              <Row vCentered key={item.id}>
                <Badge
                  type={
                    item.uses_max && item.uses_count >= item.uses_max
                      ? 'good'
                      : 'default'
                  }
                >
                  {item.code}
                </Badge>
                <small>{item.discount ? `${item.discount} руб.` : null}</small>
                <small>
                  {item.discount_percent ? `${item.discount_percent}%` : null}
                </small>
                <small>
                  Использован: {item.uses_count}
                  {item.uses_max ? `/${item.uses_max}` : ''} раз
                </small>
              </Row>
            ))}
          </Column>
          <SmallPager
            next={next}
            previous={previous}
            pageInfo={connection.pageInfo}
          />
        </Container>
      )}
    </HeadlessConnection>
  );
};

export default PromocodesCollection;
