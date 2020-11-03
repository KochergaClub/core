import Link from 'next/link';

import { A } from '~/frontkit';

import { cmOrderDetailsRoute } from '../routes';

interface Props {
  order: { id: string };
}

const OrderLink: React.FC<Props> = ({ order }) => (
  <Link href={cmOrderDetailsRoute(order.id)} passHref>
    <A>{order.id}</A>
  </Link>
);

export default OrderLink;
