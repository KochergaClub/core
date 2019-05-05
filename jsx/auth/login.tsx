import React from 'react';

import styled from 'styled-components';

import { Screen } from '../common/types';
import Page from '../components/Page';

import { Button, Column } from '@kocherga/frontkit';
import AuthContainer from './components/AuthContainer';

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: stretch;

  input {
    height: 32px;
    width: 100%;
    border: 1px solid #ddd;
    padding: 0 4px;
  }
`;

const SmallNote = styled.small`
  font-size: 0.6rem;
  line-height: 1.3;
  margin-bottom: 8px;
`;

const LoginPage = () => (
  <Page title="Логин">
    <AuthContainer>
      <LoginForm method="post">
        <Column stretch gutter={16}>
          <div>
            <label htmlFor="id_email">Email:</label>
            <input
              type="email"
              name="email"
              maxLength={255}
              required
              id="id_email"
            />
          </div>
          <Column stretch gutter={0}>
            <label htmlFor="id_password">Пароль:</label>
            <SmallNote>
              (если вы оставите это поле пустым, ссылка для логина придёт на
              почту)
            </SmallNote>
            <input
              type="password"
              name="password"
              maxLength={255}
              id="id_password"
            />
          </Column>
          <Button type="submit">Войти</Button>
        </Column>
      </LoginForm>
    </AuthContainer>
  </Page>
);

const screen: Screen<{}> = {
  component: LoginPage,
};

export default screen;
