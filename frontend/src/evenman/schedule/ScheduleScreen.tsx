import { useState, useCallback } from 'react';
import { observer } from 'mobx-react-lite';

import styled from 'styled-components';

import { A, Button, Column } from '@kocherga/frontkit';

import { ImagePreview } from '../ImageDropzone';

import DigestEmailModal from './DigestEmailModal';

import { AnnouncementCommand } from '../stores/AnnouncementToolsStore';

import { useRootStore } from '../common';

const Container = styled.main`
  margin-top: 10px;
`;

const EmailDigestButton: React.FC = observer(({ children }) => {
  const root = useRootStore();
  if (!root) {
    throw new Error('Root store is undefined');
  }
  const announcementToolsStore = root.announcementToolsStore;

  const [showModal, setShowModal] = useState(false);

  const toggleModal = useCallback(() => {
    setShowModal(!showModal);
  }, [showModal]);

  const postEmailDigest = useCallback(
    async (text: string) => {
      await announcementToolsStore.postEmailDigest(text);
      setShowModal(false);
    },
    [announcementToolsStore]
  );

  return (
    <>
      <Button
        onClick={toggleModal}
        loading={announcementToolsStore.loading['postEmailDigest']}
        style={{ width: '100%' }}
      >
        {children}
      </Button>
      <DigestEmailModal
        toggle={toggleModal}
        show={showModal}
        save={postEmailDigest}
      />
    </>
  );
});

const ActionButton: React.FC<{ command: AnnouncementCommand }> = observer(
  ({ command, children }) => {
    const root = useRootStore();
    if (!root) {
      throw new Error('Root store is undefined');
    }
    const announcementToolsStore = root.announcementToolsStore;

    const getAction = (command: AnnouncementCommand) => {
      return () => announcementToolsStore.performCommand(command);
    };

    return (
      <Button
        onClick={getAction(command)}
        loading={announcementToolsStore.loading[command]}
        style={{ width: '100%' }}
      >
        {children}
      </Button>
    );
  }
);

const Buttons: React.FC = () => {
  return (
    <div>
      <section>
        <h3>ВК</h3>
        <Column gutter={8}>
          {/* FIXME - should be customizable */}
          <A href="https://vk.com/page-99973027_50473877">ВК-расписание</A>{' '}
          <ActionButton command="updateVkWikiSchedule">
            Обновить вики-расписание
          </ActionButton>
          <ActionButton command="createVkSchedulePost">
            Создать пост с расписанием
          </ActionButton>
        </Column>
      </section>
      <section>
        <h3>Telegram</h3>
        <ActionButton command="postTelegramSchedule">
          Запостить расписание
        </ActionButton>
      </section>
      <section>
        <h3>Почта</h3>
        <EmailDigestButton>Создать черновик рассылки</EmailDigestButton>
      </section>
    </div>
  );
};

const ScheduleScreen: React.FC = observer(() => {
  const root = useRootStore();
  if (!root) {
    throw new Error('Root store is undefined');
  }
  return (
    <Container>
      <Column centered>
        <ImagePreview url={root.weeklyScheduleImage()} />
        <Buttons />
      </Column>
    </Container>
  );
});

export default ScheduleScreen;
