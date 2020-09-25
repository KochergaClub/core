import styled from 'styled-components';

import { colors, LabelDiv, Row } from '@kocherga/frontkit';

import TelegramIcon from '~/components/icons/TelegramIcon';

import { TelegramChatFragment } from '../queries.generated';

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

const TelegramChatCard: React.FC<{ chat: TelegramChatFragment }> = ({
  chat,
}) => {
  const href = `https://t.me/${chat.username}`;
  return (
    <Row vCentered gutter={16}>
      <Link href={href}>
        <ImgContainer>
          {chat.photo && chat.photo_x2 ? (
            <img
              src={chat.photo.url}
              srcSet={`${chat.photo.url}, ${chat.photo_x2.url} 2x`}
            />
          ) : (
            <TelegramIcon size={50} color={colors.grey[500]} />
          )}
        </ImgContainer>
      </Link>
      <div>
        <Link href={href}>
          <Header>{chat.title}</Header>
          <LabelDiv>@{chat.username}</LabelDiv>
        </Link>
      </div>
    </Row>
  );
};

export default TelegramChatCard;
