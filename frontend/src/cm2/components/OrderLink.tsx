import Link from 'next/link';
import { A } from '~/frontkit';

interface Props {
  order: { id: string };
}

const OrderLink: React.FC<Props> = ({ order }) => (
  <Link href="/team/cm/orders/[id]" as={`/team/cm/orders/${order.id}`} passHref>
    <A>{order.id}</A>
  </Link>
);

export default OrderLink;
