import React from 'react';

import styled from 'styled-components';

import CSRFInput from '../components/CSRFInput';
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
          <CSRFInput />
          <div dangerouslySetInnerHTML={{ __html: djangoForm }} />
          <Button type="submit">Войти</Button>
        </Column>
      </LoginForm>
    </AuthContainer>
  </Page>
);

export default LoginPage;
