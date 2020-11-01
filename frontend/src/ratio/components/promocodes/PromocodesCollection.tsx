import HeadlessConnection from '~/components/collections/HeadlessConnection';
import SmallPager from '~/components/collections/SmallPager';
import { Badge, Column, Row } from '~/frontkit';
import { RatioPromocodeConnectionFragment } from '~/ratio/queries.generated';

interface Props {
  connection: RatioPromocodeConnectionFragment;
  total: number;
  fetchPage: (args?: {
    before?: string | null;
    after?: string | null;
    first?: number | null;
    last?: number | null;
  }) => Promise<void>;
}

const PromocodesCollection: React.FC<Props> = ({
  connection,
  total,
  fetchPage,
}) => {
  return (
    <HeadlessConnection connection={connection} fetchPage={fetchPage}>
      {({ items, next, previous }) => (
        <div>
          <header>
            <strong>Промокоды ({total})</strong>
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
        </div>
      )}
    </HeadlessConnection>
  );
};

export default PromocodesCollection;
