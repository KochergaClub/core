import { PaddedBlock } from '~/components';
import { CardList } from '~/components/Card';

import { TelegramChatFragment } from '../queries.generated';
import TelegramChatCard from './TelegramChatCard';

interface Props {
  chats: TelegramChatFragment[];
  hideProjectLink?: boolean;
}

const TelegramChatsBlock: React.FC<Props> = ({ chats, hideProjectLink }) => {
  return (
    <PaddedBlock width="small">
      <CardList>
        {chats.map((chat) => (
          <TelegramChatCard
            key={chat.id}
            chat={chat}
            hideProjectLink={hideProjectLink}
          />
        ))}
      </CardList>
    </PaddedBlock>
  );
};

export default TelegramChatsBlock;
