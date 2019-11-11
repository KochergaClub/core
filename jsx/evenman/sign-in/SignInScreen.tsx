import { observer } from 'mobx-react';
import React from 'react';

import styled from 'styled-components';

import SignInView from '../views/SignInView';

import { GoogleLogin, GoogleLoginResponse } from 'react-google-login';

const GOOGLE_CLIENT_ID =
  '462291115265-7ft6f9ssdpprl899q1v0le90lrto8th9.apps.googleusercontent.com';

interface Props {
  view: SignInView;
}

const Container = styled.div`
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
`;

@observer
export default class SignInScreen extends React.Component<Props, {}> {
  async onGoogleLogin(googleUser: GoogleLoginResponse) {
    await this.props.view.root.apiStore.auth(googleUser);
  }

  onGoogleFailure(arg: any) {
    alert(arg);
  }

  render() {
    return (
      <Container>
        <GoogleLogin
          clientId={GOOGLE_CLIENT_ID}
          buttonText="Войти через Google"
          onSuccess={r => this.onGoogleLogin(r as GoogleLoginResponse)}
          onFailure={arg => this.onGoogleFailure(arg)}
        />
      </Container>
    );
  }
}
