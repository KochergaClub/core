import * as React from 'react';
import { observer } from 'mobx-react';

import { Button, Modal } from '@kocherga/frontkit';

import { Context } from './common';

@observer
export class FbLoginModal extends React.Component {
  static contextType = Context;
  context!: React.ContextType<typeof Context>;

  isOpen() {
    const status = this.context!.fbStore.status;

    if (status === 'connected' || status === 'starting') {
      return false;
    }

    return true;
  }

  isConnecting() {
    return this.context!.fbStore.status === 'connecting';
  }

  login() {
    this.context!.fbStore.login();
  }

  render() {
    const isOpen = this.isOpen();
    if (!isOpen) {
      return null;
    }
    return (
      <Modal>
        <Modal.Header>Залогиньтесь через Facebook</Modal.Header>
        <Modal.Body>
          <p>
            Для корректной работы с Facebook-мероприятиями вам понадобится войти
            через Facebook вдобавок к существующему логину.
          </p>
          <Button
            primary
            small
            onClick={() => this.login()}
            disabled={this.isConnecting()}
          >
            Войти через FB
          </Button>
        </Modal.Body>
      </Modal>
    );
  }
}
