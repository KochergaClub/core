import React from 'react';

import styled from 'styled-components';

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

const LoginPage = ({ djangoForm }) => (
  <Page title="Логин">
    <AuthContainer>
      <LoginForm method="post">
        <Column stretch>
          <div>
            <p>
              <label htmlFor="id_email">Email:</label>
              <input
                type="email"
                name="email"
                maxLength={255}
                required
                id="id_email"
              />
            </p>
          </div>
          <Button type="submit">Войти</Button>
        </Column>
      </LoginForm>
    </AuthContainer>
  </Page>
);

export default {
  component: LoginPage,
};
