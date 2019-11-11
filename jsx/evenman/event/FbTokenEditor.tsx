import React from 'react';
import { action, observable, runInAction } from 'mobx';
import { observer } from 'mobx-react';

import { FbStore } from '../stores/FbStore';

import { A, Button, Modal, Column, Input } from '@kocherga/frontkit';

interface Props {
  store: FbStore;
}

@observer
class FbTokenEditor extends React.Component<Props> {
  @observable isOpen = false;
  @observable isSaving = false;

  @observable accessToken: string = '';

  @action.bound
  toggle() {
    this.isOpen = !this.isOpen;
  }

  @action.bound
  async save() {
    this.isSaving = true;
    await this.props.store.saveToken(this.accessToken);
    runInAction(() => (this.isSaving = false));
    this.toggle();
  }

  @action.bound
  changeAccessToken(e: React.FormEvent<HTMLInputElement>) {
    this.accessToken = e.currentTarget.value;
  }

  render() {
    return (
      <React.Fragment>
        <Modal isOpen={this.isOpen}>
          <Modal.Header toggle={this.toggle}>
            Вставьте{' '}
            <A href="https://developers.facebook.com/tools/explorer/">
              FB access token
            </A>
          </Modal.Header>
          <Modal.Body>
            <Column stretch>
              <Input
                type="text"
                value={this.accessToken}
                onChange={this.changeAccessToken}
              />
            </Column>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.save} primary loading={this.isSaving}>
              Сохранить
            </Button>
          </Modal.Footer>
        </Modal>
        <Button onClick={this.toggle} small>
          редактировать токен
        </Button>
      </React.Fragment>
    );
  }
}

export default FbTokenEditor;
