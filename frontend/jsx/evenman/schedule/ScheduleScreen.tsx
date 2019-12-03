import { action, computed, observable, runInAction } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';

import styled from 'styled-components';

import ScheduleView from '../views/ScheduleView';

import { ImagePreview } from '../ImageDropzone';

import { A, Button, Column } from '@kocherga/frontkit';

import DigestEmailModal from './DigestEmailModal';

import { AnnouncementCommand } from '../stores/AnnouncementToolsStore';

interface Props {
  view: ScheduleView;
}

const Container = styled.main`
  margin-top: 10px;
`;

@observer
export default class ScheduleScreen extends React.Component<Props, {}> {
  @observable showEmailTextModal = false;

  @computed
  get announcementToolsStore() {
    return this.props.view.root.announcementToolsStore;
  }

  @action.bound
  toggleEmailTextModal() {
    this.showEmailTextModal = !this.showEmailTextModal;
  }

  @action.bound
  async postEmailDigest(text: string) {
    await this.announcementToolsStore.postEmailDigest(text);
    runInAction(() => (this.showEmailTextModal = false));
  }

  renderActionButton = (title: string, command: AnnouncementCommand) => {
    const getAction = (command: AnnouncementCommand) => {
      if (command === 'postEmailDigest') {
        return this.toggleEmailTextModal;
      }
      return () => this.announcementToolsStore.performCommand(command);
    };

    return (
      <Button
        key={command}
        onClick={getAction(command)}
        loading={this.announcementToolsStore.loading[command]}
        style={{ width: '100%' }}
      >
        {title}
      </Button>
    );
  };

  renderButtons() {
    return (
      <div>
        <section>
          <h3>ВК</h3>
          <Column gutter={8}>
            <A href="https://vk.com/page-99973027_50473877">ВК-расписание</A>{' '}
            {/* FIXME - should be customizable */}
            {this.renderActionButton(
              'Обновить вики-расписание',
              'updateVkWikiSchedule'
            )}
            {this.renderActionButton(
              'Создать пост с расписанием',
              'createVkSchedulePost'
            )}
          </Column>
        </section>
        <section>
          <h3>Telegram</h3>
          {this.renderActionButton(
            'Запостить расписание',
            'postTelegramSchedule'
          )}
        </section>
        <section>
          <h3>Почта</h3>
          {this.renderActionButton(
            'Создать черновик рассылки',
            'postEmailDigest'
          )}
        </section>
      </div>
    );
  }

  render() {
    return (
      <Container>
        <Column centered>
          <ImagePreview url={this.props.view.root.weeklyScheduleImage()} />
          <div>{this.renderButtons()}</div>
        </Column>
        <DigestEmailModal
          toggle={this.toggleEmailTextModal}
          show={this.showEmailTextModal}
          save={this.postEmailDigest}
        />
      </Container>
    );
  }
}
