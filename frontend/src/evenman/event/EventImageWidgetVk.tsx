import { observer } from 'mobx-react';
import { action, observable } from 'mobx';
import * as React from 'react';

import { Event } from '../stores/Event';
import { VkImageModal } from './VkImageModal';
import { EventImageDropzone } from './EventImageDropzone';
import { A, Column } from '@kocherga/frontkit';

interface Props {
  event: Event;
}

@observer
class EventImageWidgetVk extends React.Component<Props, {}> {
  @observable modalIsOpen = false;

  @action.bound
  toggleModal() {
    this.modalIsOpen = !this.modalIsOpen;
  }

  constructor(props: Props) {
    super(props);
    this.saveLink = this.saveLink.bind(this);
  }

  @action.bound
  async saveLink(link: string) {
    this.modalIsOpen = false;
    await this.props.event.setImageFromUrl(link);
  }

  render() {
    return (
      <Column centered gutter={0}>
        <header>Картинка для ВК:</header>
        <small>
          <A
            href="#"
            onClick={e => {
              e.preventDefault();
              this.toggleModal();
            }}
          >
            создать
          </A>
          <VkImageModal
            isOpen={this.modalIsOpen}
            event={this.props.event}
            toggle={this.toggleModal}
          />
        </small>
        <EventImageDropzone imageType="vk" event={this.props.event} />
      </Column>
    );
  }
}

export default EventImageWidgetVk;
