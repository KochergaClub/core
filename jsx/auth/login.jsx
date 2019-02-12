import React from 'react';

import styled from 'styled-components';

import { Helmet } from 'react-helmet';

const AuthContainer = styled.div`
  margin: 0 auto;
  margin-top: 30vh;
  max-width: 320px;
  padding: 10px;
`;

class LoginPage extends React.Component {
  render() {
    return (
      <AuthContainer>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Login title</title>
        </Helmet>
        <form method="post" className="login-form">
          <input
            type="hidden"
            name="csrfmiddlewaretoken"
            value={this.props.csrfToken}
          />
          <div dangerouslySetInnerHTML={{ __html: this.props.djangoForm }} />
          <button type="submit">Войти</button>
        </form>
      </AuthContainer>
    );
  }
}

export default LoginPage;
