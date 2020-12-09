import Link from 'next/link';
import styled from 'styled-components';

import TelegramIcon from '~/components/icons/TelegramIcon';
import { A, colors, LabelDiv, Row } from '~/frontkit';
import { projectRoute } from '~/projects/routes';

import { TelegramChatFragment } from '../queries.generated';

const ImgContainer = styled.div`
  width: 50px;
  height: 50px;
  > img {
    border-radius: 25px;
  }
`;

const ChatLink = styled.a`
  text-decoration: none;
  color: black;
`;

const Header = styled.header`
  font-weight: bold;
`;

interface Props {
  chat: TelegramChatFragment;
  hideProjectLink?: boolean;
  renderControls?: () => React.ReactNode;
}

export const TelegramChatCardContents: React.FC<Props> = ({
  chat,
  hideProjectLink,
  renderControls,
}) => {
  const href = chat.link;
  return (
    <Row gutter={16}>
      <ChatLink href={href}>
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
      </ChatLink>
      <div>
        <ChatLink href={href}>
          <Header>{chat.title}</Header>
        </ChatLink>
        <Row vCentered>
          <ChatLink href={href}>
            <LabelDiv>
              {chat.username ? `@${chat.username}` : chat.link}
            </LabelDiv>
          </ChatLink>
          {renderControls ? renderControls() : null}
        </Row>
        {chat.project && !hideProjectLink ? (
          <small>
            Чат проекта{' '}
            <Link href={projectRoute(chat.project.meta.slug)} passHref>
              <A>{chat.project.title}</A>
            </Link>
          </small>
        ) : null}
      </div>
    </Row>
  );
};
