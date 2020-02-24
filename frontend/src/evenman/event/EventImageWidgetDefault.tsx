import { observer } from 'mobx-react';
import { action, observable } from 'mobx';
import * as React from 'react';

import { Event } from '../stores/Event';
import { InputModal } from '../InputModal';
import EventImageDropzone from './EventImageDropzone';
import { A, Column } from '@kocherga/frontkit';

interface Props {
  event: Event;
}

@observer
class EventImageWidgetDefault extends React.Component<Props, {}> {
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
        <header>Основная картинка:</header>
        <small>
          <A
            href="#"
            onClick={e => {
              e.preventDefault();
              this.toggleModal();
            }}
          >
            добавить по ссылке
          </A>
          <InputModal
            title="Ссылка на картинку"
            description="Вставьте сюда прямую ссылку на картинку:"
            isOpen={this.modalIsOpen}
            toggle={this.toggleModal}
            save={this.saveLink}
          />
        </small>
        <EventImageDropzone imageType="default" event={this.props.event} />
      </Column>
    );
  }
}

export default EventImageWidgetDefault;
