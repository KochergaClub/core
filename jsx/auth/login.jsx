import React from 'react';

import styled from 'styled-components';

import { Helmet } from 'react-helmet';

import { Button } from '@kocherga/frontkit';

const AuthContainer = styled.div`
  margin: 0 auto;
  margin-top: 30vh;
  max-width: 320px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0px 2px 4px 0 #bbb;
`;

class LoginPage extends React.Component {
  render() {
    return (
      <AuthContainer>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Логин</title>
        </Helmet>
        <form method="post" className="login-form">
          <input
            type="hidden"
            name="csrfmiddlewaretoken"
            value={this.props.csrfToken}
          />
          <div dangerouslySetInnerHTML={{ __html: this.props.djangoForm }} />
          <Button type="submit">Войти</Button>
        </form>
      </AuthContainer>
    );
  }
}

export default LoginPage;
