import React from 'react';

import Page from '../components/Page';
import AuthContainer from './components/AuthContainer';

const CheckYourEmailPage = () => (
  <Page title="Логин">
    <AuthContainer>
      Мы отправили вам письмо. Нажмите на ссылку в нём, чтобы войти.
    </AuthContainer>
  </Page>
);

export default {
  component: CheckYourEmailPage,
};
