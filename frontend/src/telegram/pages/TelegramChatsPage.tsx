import { useQuery } from '@apollo/client';

import { NextApolloPage, withApollo, withStaff } from '~/apollo';
import TL02 from '~/blocks/TL02';
import { ApolloQueryResults, Page } from '~/components';

import TelegramChatsBlock from '../components/TelegramChatsBlock';
import { TelegramChatsDocument } from '../queries.generated';

const TelegramChatsPage: NextApolloPage = () => {
  const queryResults = useQuery(TelegramChatsDocument);

  return (
    <Page title="Чаты сообщества Кочерги">
      <Page.Main>
        <TL02 title="Чаты сообщества Кочерги" />
        <ApolloQueryResults {...queryResults} size="block">
          {({ data: { telegramChats } }) => (
            <TelegramChatsBlock chats={telegramChats} />
          )}
        </ApolloQueryResults>
      </Page.Main>
    </Page>
  );
};

export default withApollo(withStaff(TelegramChatsPage));
