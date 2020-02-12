import * as React from 'react';
import { inject, observer } from 'mobx-react';

import {
  GoogleLogin,
  GoogleLoginResponse,
} from 'react-google-login';

import { Icon } from 'react-icons-kit';
import { signOut } from 'react-icons-kit/fa/signOut';

import { MainStore } from './store';

const GOOGLE_CLIENT_ID =
  '462291115265-7ft6f9ssdpprl899q1v0le90lrto8th9.apps.googleusercontent.com';

interface Props {
  store?: MainStore;
}

@inject('store')
@observer
export class AuthButton extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
    this.renderLoginButton.bind(this);
  }

  async onGoogleLogin(googleUser: GoogleLoginResponse) {
    await this.props.store!.authStore.auth(googleUser);
  }

  renderLoginButton(props?: { onClick: () => void }) {
    return (
      <button className="btn btn-outline-primary google-button" onClick={props!.onClick}>
        Войти через Google
      </button>
    );
  }

  render() {
    if (this.props.store!.authStore.token) {
      return (
        <button
          className="btn btn-outline-secondary btn-sm line-with-icons"
          onClick={() => this.props.store!.authStore.logout()}
        >
          Выйти&nbsp;<Icon size={20} icon={signOut} />
        </button>
      );
    } else {
      return (
        <GoogleLogin
          clientId={GOOGLE_CLIENT_ID}
          render={this.renderLoginButton}
          onSuccess={r => this.onGoogleLogin(r as GoogleLoginResponse)}
          onFailure={arg => window.alert(JSON.stringify(arg))}
        />
      );
    }
  }
}
