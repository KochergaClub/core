import React from 'react';
import { useSelector } from 'react-redux';

import { NextPage } from '~/common/types';
import Page from '~/components/Page';

import { fetchAndViewMember } from '~/staff/actions';
import { selectViewingMember } from '~/staff/selectors';

import MemberProfile from '~/staff/components/MemberProfile';

interface Props {}

const StaffMemberPage: NextPage<Props> = () => {
  const member = useSelector(selectViewingMember);

  if (!member) {
    return <div>Внутренняя ошибка. Не удалось загрузить сотрудника.</div>;
  }

  return (
    <Page title={`${member.full_name} | Профиль сотрудника`} team>
      <Page.Main>
        <MemberProfile />
      </Page.Main>
    </Page>
  );
};

StaffMemberPage.getInitialProps = async ({ store: { dispatch }, query }) => {
  const id = parseInt(query.id as string);
  await dispatch(fetchAndViewMember(id));
  return {};
};

export default StaffMemberPage;
