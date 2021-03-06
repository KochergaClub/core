import Link from 'next/link';

import { A, Badge, Row } from '~/frontkit';
import { staffMemberRoute } from '~/staff/routes';

import { MaybeStaffUserFragment } from '../queries.generated';

const UserInfo: React.FC<{ user: MaybeStaffUserFragment }> = ({ user }) => {
  if (user.staff_member) {
    return (
      <div>
        <Link href={staffMemberRoute(user.staff_member.id)} passHref>
          <A>{user.staff_member.full_name}</A>
        </Link>
      </div>
    );
  }
  return (
    <Row vCentered>
      <div>{user.email}</div>
      <Badge type="accent">не сотрудник</Badge>
    </Row>
  );
};

export default UserInfo;
