import * as React from 'react';
import { action, observable } from 'mobx';
import { observer } from 'mobx-react';

import { Button, Modal } from '@kocherga/frontkit';

import styled from 'styled-components';

interface Props {
  title: string;
  description: string;
  toggle: () => void;
  save: (text: string) => void;
  isOpen: boolean;
}

const Input = styled.input`
  width: 100%;
`;

const Centered = styled.div`
  text-align: center;
`;

@observer
export class InputModal extends React.Component<Props, {}> {
  @observable value = '';
  private input: HTMLInputElement | null = null;

  @action.bound
  updateValue(e: React.FormEvent<HTMLInputElement>) {
    this.value = e.currentTarget.value;
  }

  save() {
    if (!this.value) {
      return; // nothing to save
    }
    this.props.save(this.value);
  }

  render() {
    if (!this.props.isOpen) {
      return null;
    }
    return (
      <Modal onOpened={() => this.input && this.input.focus()}>
        <Modal.Header toggle={this.props.toggle}>
          {this.props.title}
        </Modal.Header>
        <Modal.Body>
          <Centered>
            {this.props.description}
            <br />
            <Input
              type="text"
              value={this.value}
              onChange={this.updateValue}
              ref={ref => (this.input = ref)}
            />
          </Centered>
        </Modal.Body>
        <Modal.Footer>
          <Button
            disabled={!this.value.startsWith('http')}
            onClick={() => this.save()}
            primary
          >
            Сохранить
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
