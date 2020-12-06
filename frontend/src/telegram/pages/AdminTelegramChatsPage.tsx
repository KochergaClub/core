import React, { useCallback } from 'react';
import { FaTrash } from 'react-icons/fa';

import { useQuery } from '@apollo/client';

import { NextApolloPage, withApollo, withStaff } from '~/apollo';
import TL02 from '~/blocks/TL02';
import { ApolloQueryResults, ButtonWithModal, DropdownMenu, PaddedBlock, Page } from '~/components';
import { Collection, CustomCardListView } from '~/components/collections';
import { ModalAction, MutationAction } from '~/components/DropdownMenu';
import { useFormModalSmartMutation } from '~/components/forms/hooks';
import { MutationModal } from '~/components/forms/MutationModal';
import { SmartMutationModal } from '~/components/forms/SmartMutationModal';
import { ShapeToValues } from '~/components/forms/types';
import { A } from '~/frontkit';

import { TelegramChatCardContents } from '../components/TelegramChatCardContents';
import {
    AddTelegramChatByInviteLinkDocument, AddTelegramChatDocument, AllTelegramChatsDocument,
    DeleteTelegramChatDocument, PostToTelegramChatDocument, RefreshTelegramChatDataDocument
} from '../queries.generated';

const addShape = [
  { name: 'username', title: 'Username', type: 'string' },
] as const;

const inviteAddShape = [
  {
    name: 'invite_link',
    title: 'Invite link',
    type: 'string',
  },
] as const;

type AddChatValues = ShapeToValues<typeof addShape>;

const AdminTelegramChatsPage: NextApolloPage = () => {
  const queryResults = useQuery(AllTelegramChatsDocument);

  const innerAdd = useFormModalSmartMutation(AddTelegramChatDocument, {
    refetchQueries: ['TelegramChats'],
    expectedTypename: 'TelegramChat',
  });

  const add = useCallback(
    async (values: AddChatValues) => {
      return await innerAdd({
        variables: {
          input: values,
        },
      });
    },
    [innerAdd]
  );

  return (
    <Page title="Управление Telegram-чатами" menu="team">
      <Page.Main>
        <TL02 title="Чаты сообщества Кочерги" />
        <PaddedBlock>
          <div>
            <A href="/wagtail/telegram/chat/">
              Управление порядком чатов и провязка с проектами доступны через
              Wagtail.
            </A>
          </div>
          <ApolloQueryResults {...queryResults} size="block">
            {({ data: { chats } }) => (
              <Collection
                items={chats}
                refetch={queryResults.refetch}
                controls={() => (
                  <div>
                    <ButtonWithModal title="Создать по ссылке">
                      {({ close }) => (
                        <SmartMutationModal
                          close={close}
                          title="Добавить Telegram-чат по ссылке"
                          submitLabel="Добавить"
                          shape={inviteAddShape}
                          expectedTypename="TelegramChat"
                          refetchQueries={['TelegramChats']}
                          mutation={AddTelegramChatByInviteLinkDocument}
                        />
                      )}
                    </ButtonWithModal>
                  </div>
                )}
                names={{
                  plural: 'чаты',
                  genitive: 'чат',
                }}
                add={{
                  cb: add,
                  shape: addShape,
                }}
                view={() => (
                  <CustomCardListView
                    items={chats}
                    renderItem={(chat) => (
                      <TelegramChatCardContents
                        chat={chat}
                        key={chat.id}
                        renderControls={() => (
                          <DropdownMenu>
                            <MutationAction
                              title="Удалить"
                              icon={FaTrash}
                              mutation={DeleteTelegramChatDocument}
                              variables={{ id: chat.id }}
                              refetchQueries={['TelegramChats']}
                              confirmText={`Удалить ${
                                chat.title || chat.username
                              }?`}
                            />
                            <MutationAction
                              title="Обновить"
                              mutation={RefreshTelegramChatDataDocument}
                              variables={{ id: chat.id }}
                            />
                            <ModalAction title="Отправить сообщение">
                              {({ close }) => (
                                <MutationModal
                                  close={close}
                                  title="Отправить сообщение в Telegram-чат через бота"
                                  submitLabel="Отправить"
                                  shape={
                                    [
                                      {
                                        name: 'message',
                                        type: 'string',
                                        title: 'Текст',
                                      },
                                    ] as const
                                  }
                                  valuesToVariables={(v) => ({
                                    input: {
                                      id: chat.id,
                                      message: v.message,
                                    },
                                  })}
                                  mutation={PostToTelegramChatDocument}
                                />
                              )}
                            </ModalAction>
                          </DropdownMenu>
                        )}
                      />
                    )}
                    item2key={(chat) => chat.id}
                  />
                )}
              />
            )}
          </ApolloQueryResults>
        </PaddedBlock>
      </Page.Main>
    </Page>
  );
};

export default withApollo(withStaff(AdminTelegramChatsPage));
