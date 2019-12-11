import { action, autorun, observable } from 'mobx';
import { observer } from 'mobx-react';

import * as React from 'react';

import { Button, Column, Modal, Input } from '@kocherga/frontkit';

import { Event } from '../stores/Event';

interface Props {
  event: Event;
  toggle: () => void;
  isOpen: boolean;
}

@observer
export class VkImageModal extends React.Component<Props, {}> {
  @observable title?: string;
  @observable header?: string;

  private titleInput: HTMLInputElement | null = null;
  private headerInput: HTMLInputElement | null = null;

  constructor(props: Props) {
    super(props);
    const fillVars = autorun(() => {
      this.header = '';
      this.title = this.props.event.title;
    });

    fillVars();
  }

  @action.bound
  updateHeader() {
    this.header = this.headerInput!.value;
  }

  @action.bound
  updateTitle() {
    this.title = this.titleInput!.value;
  }

  async save() {
    await this.props.event.vkImageGenerate(this.header || '', this.title || '');
    this.props.toggle();
  }

  renderImage() {
    return (
      <Column stretch>
        <Input
          type="text"
          value={this.header}
          onChange={this.updateHeader}
          ref={ref => (this.headerInput = ref)}
        />
        <Input
          type="text"
          value={this.title}
          onChange={this.updateTitle}
          ref={ref => (this.titleInput = ref)}
        />
        <iframe
          src={this.props.event.vkImageTemplater(
            this.header,
            this.title,
            'html'
          )}
          style={{ width: 550, height: 350, border: 0 }}
        />
      </Column>
    );
  }

  render() {
    if (!this.props.isOpen) {
      return null;
    }
    return (
      <Modal>
        <Modal.Header toggle={this.props.toggle}>Картинка для ВК</Modal.Header>
        <Modal.Body>{this.renderImage()}</Modal.Body>
        <Modal.Footer>
          <Button onClick={() => this.save()} primary>
            Сохранить
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
