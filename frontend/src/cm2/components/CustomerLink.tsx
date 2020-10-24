import Link from 'next/link';
import { A } from '~/frontkit';

import { CustomerFragment } from '../queries.generated';

interface Props {
  customer: CustomerFragment;
}

const CustomerLink: React.FC<Props> = ({ customer }) => (
  <Link
    href="/team/cm/customers/[id]"
    as={`/team/cm/customers/${customer.id}`}
    passHref
  >
    <A>
      {customer.first_name} {customer.last_name}
    </A>
  </Link>
);

export default CustomerLink;
