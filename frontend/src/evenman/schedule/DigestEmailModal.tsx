import { action, observable } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';

import autosize from 'autosize';

import { Button, Modal } from '@kocherga/frontkit';

interface Props {
  show: boolean;
  toggle: () => void;
  save: (text: string) => void;
}

@observer
export default class DigestEmailModal extends React.Component<Props> {
  @observable text = '';
  @observable textarea?: HTMLTextAreaElement;

  @action.bound
  setTextarea(el?: HTMLTextAreaElement) {
    if (el && this.textarea !== el) {
      autosize(el);
    }
    this.textarea = el;
  }

  render() {
    if (!this.props.show) {
      return null;
    }
    return (
      <Modal>
        <Modal.Header toggle={this.props.toggle}>
          Текст еженедельной рассылки
        </Modal.Header>
        <Modal.Body>
          <textarea
            ref={el => this.setTextarea(el || undefined)}
            defaultValue={this.text}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => this.props.save(this.textarea!.value)} primary>
            Создать черновик
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
