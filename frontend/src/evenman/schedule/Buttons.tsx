import { useCallback, useState } from 'react';
import styled from 'styled-components';

import { useMutation } from '@apollo/client';

import { A, AsyncButton, Button, Column } from '~/frontkit';

import DigestEmailModal from './DigestEmailModal';
import {
    EvenmanDigestToMailchimpDocument, EvenmanDigestToTelegramDocument, EvenmanDigestToVkDocument,
    EvenmanVkWikiScheduleUpdateDocument, EvenmanWeeklyDigestFragment
} from './queries.generated';

const WideAsyncButton = styled(AsyncButton)`
  width: 100%;
`;

const EmailDigestButton: React.FC = ({ children }) => {
  const [mutation, { loading: acting }] = useMutation(
    EvenmanDigestToMailchimpDocument
  );

  const [showModal, setShowModal] = useState(false);

  const toggleModal = useCallback(() => {
    setShowModal(!showModal);
  }, [showModal]);

  const post = useCallback(
    async (text: string) => {
      await mutation({
        variables: {
          text,
        },
      });
      setShowModal(false);
    },
    [mutation]
  );

  return (
    <>
      <Button
        onClick={toggleModal}
        loading={acting}
        style={{ width: '100%' }}
        kind="primary"
      >
        {children}
      </Button>
      {showModal && <DigestEmailModal close={toggleModal} save={post} />}
    </>
  );
};

interface Props {
  digest: EvenmanWeeklyDigestFragment;
}

const Buttons: React.FC<Props> = ({ digest }) => {
  const [postToVk] = useMutation(EvenmanDigestToVkDocument);
  const [postToTelegram] = useMutation(EvenmanDigestToTelegramDocument);
  const [updateVkWikiSchedule] = useMutation(
    EvenmanVkWikiScheduleUpdateDocument
  );

  return (
    <div>
      <section>
        <h3>ВК</h3>
        <Column gutter={8}>
          {/* FIXME - should be customizable */}
          <A href="https://vk.com/page-99973027_50473877">ВК-расписание</A>{' '}
          <WideAsyncButton act={updateVkWikiSchedule}>
            Обновить вики-расписание
          </WideAsyncButton>
          {digest.vk?.link ? (
            <A href={digest.vk.link} target="_blank">
              Анонс в VK
            </A>
          ) : (
            <WideAsyncButton act={postToVk} kind="primary">
              Создать пост с расписанием
            </WideAsyncButton>
          )}
        </Column>
      </section>
      <section>
        <h3>Telegram</h3>
        {digest.telegram?.link ? (
          <A href={digest.telegram.link} target="_blank">
            Анонс в Telegram
          </A>
        ) : (
          <WideAsyncButton act={postToTelegram} kind="primary">
            Запостить расписание
          </WideAsyncButton>
        )}
      </section>
      <section>
        <h3>Почта</h3>
        {digest.mailchimp?.link ? (
          <A href={digest.mailchimp.link} target="_blank">
            Рассылка в Mailchimp
          </A>
        ) : (
          <EmailDigestButton>Создать черновик рассылки</EmailDigestButton>
        )}
      </section>
    </div>
  );
};

export default Buttons;
