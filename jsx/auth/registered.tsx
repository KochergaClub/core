import React from 'react';

import { A } from '@kocherga/frontkit';

import { Screen } from '~/common/types';
import Page from '~/components/Page';

import AuthContainer from './components/AuthContainer';

interface Props {}

const RegisteredPage = () => (
  <Page title="Логин">
    <AuthContainer>
      Вы зарегистрировались!
      <br />
      <A href="/my/">Перейти в личный кабинет</A>
    </AuthContainer>
  </Page>
);

const screen: Screen<Props> = {
  component: RegisteredPage,
};

export default screen;
