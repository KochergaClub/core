import { useQuery } from '@apollo/client';
import { Column } from '@kocherga/frontkit';

import { NextApolloPage, withApollo, withStaff } from '~/apollo';
import TL02 from '~/blocks/TL02';
import { ApolloQueryResults, PaddedBlock, Page } from '~/components';

import TelegramChatCard from '../components/TelegramChatCard';
import { TelegramChatsDocument } from '../queries.generated';

const TelegramChatsPage: NextApolloPage = () => {
  const queryResults = useQuery(TelegramChatsDocument);

  return (
    <Page title="Чаты сообщества Кочерги">
      <Page.Main>
        <TL02 title="Чаты сообщества Кочерги" />
        <PaddedBlock width="small">
          <ApolloQueryResults {...queryResults} size="block">
            {({ data: { telegramChats } }) => (
              <Column gutter={32}>
                {telegramChats.map((chat) => (
                  <TelegramChatCard key={chat.id} chat={chat} />
                ))}
              </Column>
            )}
          </ApolloQueryResults>
        </PaddedBlock>
      </Page.Main>
    </Page>
  );
};

export default withApollo(withStaff(TelegramChatsPage));
