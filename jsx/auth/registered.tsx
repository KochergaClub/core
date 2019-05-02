import React from 'react';

import { Screen } from '../common/types';
import Page from '../components/Page';
import AuthContainer from './components/AuthContainer';

const RegisteredPage = ({ index_url }) => (
  <Page title="Логин">
    <AuthContainer>
      Вы зарегистрировались!<br />
      <a href={index_url}>Перейти в личный кабинет</a>
    </AuthContainer>
  </Page>
);

export default {
  component: RegisteredPage,
} as Screen;
