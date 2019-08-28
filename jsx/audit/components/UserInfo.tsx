import React from 'react';
import { useSelector } from 'react-redux';

import Link from 'next/link';

import { A, Row } from '@kocherga/frontkit';

import { State } from '~/redux/store';

import { selectMemberById } from '~/staff/selectors';
import { Member } from '~/staff/types';

import Badge from '~/components/Badge';

import { User } from '../types';

const UserInfo: React.FC<{ user: User }> = ({ user }) => {
  const staffMember = useSelector<State, Member | undefined>(state =>
    user.staff_member ? selectMemberById(state, user.staff_member) : undefined
  );

  if (staffMember) {
    return (
      <div>
        <Link
          href="/team/staff/[id]"
          as={`/team/staff/${staffMember.id}`}
          passHref
        >
          <A>{staffMember.full_name}</A>
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
