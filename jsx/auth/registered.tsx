import React from 'react';

import Page from '../components/Page';
import AuthContainer from './components/AuthContainer';

export default ({ index_url }) => (
  <Page title="Логин">
    <AuthContainer>
      Вы зарегистрировались!<br />
      <a href={index_url}>Перейти в личный кабинет</a>
    </AuthContainer>
  </Page>
);
