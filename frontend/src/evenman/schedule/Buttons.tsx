import { useState, useCallback } from 'react';
import styled from 'styled-components';

import { A, Button, Column } from '@kocherga/frontkit';

import { AsyncButton } from '~/components';

import DigestEmailModal from './DigestEmailModal';

import {
  useEvenmanDigestToVkMutation,
  useEvenmanDigestToTelegramMutation,
  useEvenmanDigestToMailchimpMutation,
  useEvenmanVkWikiScheduleUpdateMutation,
  EvenmanWeeklyDigestFragment,
} from './queries.generated';

const WideAsyncButton = styled(AsyncButton)`
  width: 100%;
`;

const EmailDigestButton: React.FC = ({ children }) => {
  const [mutation, { loading: acting }] = useEvenmanDigestToMailchimpMutation();

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
      <Button onClick={toggleModal} loading={acting} style={{ width: '100%' }}>
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
  const [postToVk] = useEvenmanDigestToVkMutation();
  const [postToTelegram] = useEvenmanDigestToTelegramMutation();
  const [updateVkWikiSchedule] = useEvenmanVkWikiScheduleUpdateMutation();

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
            <WideAsyncButton act={postToVk}>
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
          <WideAsyncButton act={postToTelegram}>
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
