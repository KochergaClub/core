import { observer } from 'mobx-react';
import { action, observable } from 'mobx';
import * as React from 'react';

import { Button, Column, Modal, Input } from '@kocherga/frontkit';
import { ReactSelect } from '../components/ui';

import EventPrototypeStore from '../stores/EventPrototypeStore';

interface Props {
  store: EventPrototypeStore;
}

@observer
export default class EventPrototypeAdd extends React.Component<Props, {}> {
  @observable isOpen = false;

  @observable title: string = '';
  @observable location: string = '';
  @observable weekday?: number;
  @observable hour?: number;
  @observable minute?: number;
  @observable length?: number;

  @action.bound
  openModal() {
    this.isOpen = true;
  }

  @action.bound
  closeModal() {
    this.isOpen = false;
  }

  @action.bound
  toggleModal() {
    this.isOpen = !this.isOpen;
  }

  canCreate() {
    return (
      this.title &&
      this.location &&
      this.weekday !== undefined &&
      this.hour !== undefined &&
      this.minute !== undefined &&
      this.length !== undefined
    );
  }

  @action.bound
  async create() {
    if (!this.canCreate()) {
      return;
    }
    await this.props.store.create({
      title: this.title!,
      location: this.location!,
      weekday: this.weekday!,
      hour: this.hour!,
      minute: this.minute!,
      length: this.length!,
      active: true,
      timepad_prepaid_tickets: false,
    });

    this.closeModal();
  }

  @action.bound
  updateTitle(e: React.ChangeEvent<HTMLInputElement>) {
    this.title = e.currentTarget.value;
  }

  @action.bound
  updateLocation(e: React.ChangeEvent<HTMLInputElement>) {
    this.location = e.currentTarget.value;
  }

  @action.bound
  updateWeekday(selectOption: any) {
    this.weekday = parseInt(selectOption.value as string, 10);
  }

  @action.bound
  updateHour(e: React.ChangeEvent<HTMLInputElement>) {
    this.hour = parseInt(e.currentTarget.value, 10);
  }

  @action.bound
  updateMinute(e: React.ChangeEvent<HTMLInputElement>) {
    this.minute = parseInt(e.currentTarget.value, 10);
  }

  @action.bound
  updateLength(e: React.ChangeEvent<HTMLInputElement>) {
    this.length = parseInt(e.currentTarget.value, 10);
  }

  renderModal() {
    const weekdays = [
      'Понедельник',
      'Вторник',
      'Среда',
      'Четверг',
      'Пятница',
      'Суббота',
      'Воскресенье',
    ];

    if (!this.isOpen) {
      return null;
    }

    return (
      <Modal>
        <Modal.Header toggle={this.toggleModal}>Создать прототип</Modal.Header>
        <Modal.Body>
          <Column stretch>
            <Input
              type="text"
              placeholder="Название"
              value={this.title}
              onChange={this.updateTitle}
            />
            <Input
              type="text"
              placeholder="Комната"
              value={this.location}
              onChange={this.updateLocation}
            />
            <ReactSelect
              placeholder="День недели"
              options={[0, 1, 2, 3, 4, 5, 6].map(n => ({
                value: n,
                label: weekdays[n],
              }))}
              value={
                this.weekday === undefined
                  ? null
                  : { value: this.weekday, label: weekdays[this.weekday] }
              }
              onChange={(option: any) => this.updateWeekday(option)}
            />
            <Input
              type="number"
              placeholder="Час"
              value={this.hour}
              onChange={this.updateHour}
            />
            <Input
              type="number"
              placeholder="Минута"
              value={this.minute}
              onChange={this.updateMinute}
            />
            <Input
              type="number"
              placeholder="Продолжительность (в минутах)"
              value={this.length}
              onChange={this.updateLength}
            />
          </Column>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={this.create}
            loading={this.props.store.creating}
            disabled={!this.canCreate()}
            primary
          >
            Создать
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  render() {
    return (
      <React.Fragment>
        <Button onClick={this.openModal}>Создать прототип</Button>
        {this.renderModal()}
      </React.Fragment>
    );
  }
}
