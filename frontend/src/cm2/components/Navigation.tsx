import Link from 'next/link';

import { A, Row } from '~/frontkit';

import { cmClosedOrdersRoute, cmCustomersRoute, cmRootRoute } from '../routes';

const Navigation: React.FC = () => (
  <Row centered gutter={32}>
    <Link href={cmRootRoute()} passHref>
      <A>Открытые заказы</A>
    </Link>
    <Link href={cmCustomersRoute()} passHref>
      <A>Клиенты</A>
    </Link>
    <Link href={cmClosedOrdersRoute()} passHref>
      <A>Закрытые заказы</A>
    </Link>
  </Row>
);

export default Navigation;
