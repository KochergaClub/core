import React from 'react';

import { PaddedBlock } from '~/components';
import Card, { CardList } from '~/components/Card';

import { TelegramChatFragment } from '../queries.generated';
import { TelegramChatCardContents } from './TelegramChatCardContents';

interface Props {
  chats: TelegramChatFragment[];
  hideProjectLink?: boolean;
}

const TelegramChatsBlock: React.FC<Props> = ({ chats, hideProjectLink }) => {
  return (
    <PaddedBlock width="small">
      <CardList>
        {chats.map((chat) => (
          <Card key={chat.id}>
            <TelegramChatCardContents
              chat={chat}
              hideProjectLink={hideProjectLink}
            />
          </Card>
        ))}
      </CardList>
    </PaddedBlock>
  );
};

export default TelegramChatsBlock;
