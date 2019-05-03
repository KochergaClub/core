import React from 'react';

import { Screen } from '../common/types';
import Page from '../components/Page';
import AuthContainer from './components/AuthContainer';

interface Props {}

const RegisteredPage = () => (
  <Page title="Логин">
    <AuthContainer>
      Вы зарегистрировались!<br />
      <a href="/my/">Перейти в личный кабинет</a>
    </AuthContainer>
  </Page>
);

const screen: Screen<Props> = {
  component: RegisteredPage,
};

export default screen;
