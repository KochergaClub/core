import Link from 'next/link';

import { A, Row } from '~/frontkit';

const Navigation: React.FC = () => (
  <Row centered gutter={32}>
    <Link href="/team/cm" passHref>
      <A>Открытые заказы</A>
    </Link>
    <Link href="/team/cm/customers" passHref>
      <A>Клиенты</A>
    </Link>
    <Link href="/team/cm/orders/closed" passHref>
      <A>Закрытые заказы</A>
    </Link>
  </Row>
);

export default Navigation;
