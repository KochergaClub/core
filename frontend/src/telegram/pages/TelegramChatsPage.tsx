import styled from 'styled-components';

import { useQuery } from '@apollo/client';
import { Column, Label, Row } from '@kocherga/frontkit';

import { NextApolloPage, withApollo, withStaff } from '~/apollo';
import TL02 from '~/blocks/TL02';
import { ApolloQueryResults, PaddedBlock, Page } from '~/components';

import { TelegramChatFragment, TelegramChatsDocument } from '../queries.generated';

const ImgContainer = styled.div`
  width: 50px;
  height: 50px;
  > img {
    border-radius: 25px;
  }
`;

const Link = styled.a`
  text-decoration: none;
  color: black;
`;

const Header = styled.header`
  font-weight: bold;
`;

const TelegramChat: React.FC<{ chat: TelegramChatFragment }> = ({ chat }) => {
  const href = `https://t.me/${chat.username}`;
  return (
    <Row vCentered gutter={16}>
      <Link href={href}>
        <ImgContainer>
          {
            chat.photo && chat.photo_x2 ? (
              <img
                src={chat.photo.url}
                srcSet={`${chat.photo.url}, ${chat.photo_x2.url} 2x`}
              />
            ) : null /* TODO - blank image */
          }
        </ImgContainer>
      </Link>
      <div>
        <Link href={href}>
          <Header>{chat.title}</Header>
          <Label>@{chat.username}</Label>
        </Link>
      </div>
    </Row>
  );
};

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
                  <TelegramChat key={chat.id} chat={chat} />
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
