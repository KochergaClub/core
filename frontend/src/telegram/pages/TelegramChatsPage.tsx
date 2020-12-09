import { useQuery } from '@apollo/client';

import { NextApolloPage, withApollo } from '~/apollo';
import TL02 from '~/blocks/TL02';
import { ApolloQueryResults, Page } from '~/components';

import TelegramChatsBlock from '../components/TelegramChatsBlock';
import { PublicTelegramChatsDocument } from '../queries.generated';

const TelegramChatsPage: NextApolloPage = () => {
  const queryResults = useQuery(PublicTelegramChatsDocument);

  return (
    <Page
      title="Чаты сообщества Кочерги"
      description="Список ссылок на телеграм-чаты сообщества"
    >
      <Page.Main>
        <TL02 title="Чаты сообщества Кочерги" />
        <ApolloQueryResults {...queryResults} size="block">
          {({ data: { chats } }) => <TelegramChatsBlock chats={chats} />}
        </ApolloQueryResults>
      </Page.Main>
    </Page>
  );
};

export default withApollo(TelegramChatsPage);
