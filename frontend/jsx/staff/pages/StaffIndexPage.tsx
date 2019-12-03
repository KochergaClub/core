import React from 'react';
import { useSelector } from 'react-redux';

import Link from 'next/link';

import { A, Column } from '@kocherga/frontkit';

import { NextPage } from '~/common/types';
import Page from '~/components/Page';

import { Member } from '~/staff/types';
import { loadMembers } from '~/staff/actions';
import { selectMembers } from '~/staff/selectors';

const MemberList = ({
  title,
  members,
}: {
  title: string;
  members: Member[];
}) => (
  <Column centered>
    <h2>{title}</h2>
    {members.map(member => (
      <Link
        href="/team/staff/[id]"
        as={`/team/staff/${member.id}`}
        key={member.id}
        passHref
      >
        <A>{member.full_name}</A>
      </Link>
    ))}
  </Column>
);

interface Props {}

const StaffIndexPage: NextPage<Props> = ({}) => {
  const members = useSelector(selectMembers);
  return (
    <Page title="Список сотрудников" team>
      <Page.Main>
        <Column centered gutter={20}>
          <h1>Список сотрудников</h1>
          <MemberList
            title="Менеджеры"
            members={members.filter(
              m => m.is_current && ['FOUNDER', 'MANAGER'].includes(m.role)
            )}
          />
          <MemberList
            title="Рацио"
            members={members.filter(
              m => m.is_current && ['TRAINER'].includes(m.role)
            )}
          />
          <MemberList
            title="Админы"
            members={members.filter(
              m => m.is_current && ['WATCHMAN'].includes(m.role)
            )}
          />
          <MemberList
            title="Прочие"
            members={members.filter(
              m =>
                m.is_current &&
                !['WATCHMAN', 'FOUNDER', 'MANAGER', 'TRAINER'].includes(m.role)
            )}
          />
          <MemberList
            title="Бывшие сотрудники"
            members={members.filter(m => !m.is_current)}
          />
        </Column>
      </Page.Main>
    </Page>
  );
};

StaffIndexPage.getInitialProps = async ({ store: { dispatch } }) => {
  await dispatch(loadMembers());
  return {};
};

export default StaffIndexPage;
