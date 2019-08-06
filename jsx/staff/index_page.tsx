import React from 'react';
import { connect } from 'react-redux';

import { A, Column } from '@kocherga/frontkit';

import { Screen, InitialLoader } from '~/common/types';
import Page from '~/components/Page';
import { State } from '~/redux/store';

import { Member } from './types';
import { loadMembers } from './actions';
import { selectMembers } from './selectors';

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
      <A key={member.id} href={`/team/staff/${member.id}`}>
        {member.full_name}
      </A>
    ))}
  </Column>
);

interface Props {
  members: Member[];
}

const StaffIndexPage = ({ members }: Props) => (
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

const ConnectedPage = connect((state: State) => ({
  members: selectMembers(state),
}))(StaffIndexPage);

const getInitialData: InitialLoader<{}> = async ({
  api,
  store: { dispatch },
}) => {
  await dispatch(loadMembers(api));
  return {};
};

const screen: Screen<{}> = {
  component: ConnectedPage,
  getInitialData,
};

export default screen;
