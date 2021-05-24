import React from 'react';
import styled from 'styled-components';

import { useMutation } from '@apollo/client';

import { MutationModalButton } from '~/components/forms';
import { SmartMutationButton } from '~/components/SmartMutationButton';
import { A, AsyncButton, Column, Row } from '~/frontkit';

import {
    EvenmanCancelMailchimpDocument, EvenmanDigestToMailchimpDocument,
    EvenmanDigestToTelegramDocument, EvenmanDigestToVkDocument, EvenmanSendMailchimpDocument,
    EvenmanVkWikiScheduleUpdateDocument, EvenmanWeeklyDigestFragment
} from './queries.generated';

const WideAsyncButton = styled(AsyncButton)`
  width: 100%;
`;

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
          <div>
            <A href={digest.mailchimp.link} target="_blank">
              Рассылка в Mailchimp
            </A>
            {digest.mailchimp.is_sent ? null : (
              <Row>
                <SmartMutationButton
                  mutation={EvenmanCancelMailchimpDocument}
                  variables={{}}
                  expectedTypename="EventsWeeklyDigest"
                  size="small"
                >
                  Отменить
                </SmartMutationButton>
                <SmartMutationButton
                  mutation={EvenmanSendMailchimpDocument}
                  variables={{}}
                  expectedTypename="EventsWeeklyDigest"
                  size="small"
                  kind="primary"
                  confirmText="Вы уверены? Письмо будет отправлено всем подписчикам."
                >
                  Отправить
                </SmartMutationButton>
              </Row>
            )}
          </div>
        ) : (
          <MutationModalButton
            mutation={EvenmanDigestToMailchimpDocument}
            buttonLabel="Создать черновик рассылки"
            shape={[
              {
                type: 'markdown',
                name: 'text_before',
                title: 'Текст в начале',
                optional: true,
              },
              {
                type: 'markdown',
                name: 'text_after',
                title: 'Текст в конце',
                optional: true,
              },
            ]}
            modalSubmitLabel="Создать"
            modalTitle="Создать черновик рассылки"
            kind="primary"
          />
        )}
      </section>
    </div>
  );
};

export default Buttons;
