import Link from 'next/link';

import TelegramIcon from '~/components/icons/TelegramIcon';
import { A, colors, LabelDiv, Row } from '~/frontkit';
import { projectRoute } from '~/projects/routes';

import { TelegramChatFragment } from '../queries.generated';

const ChatLink: React.FC<{ href: string }> = ({ href, children }) => (
  <a href={href} className="no-underline text-black">
    {children}
  </a>
);

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
        <div className="w-12 h-12">
          {chat.photo && chat.photo_x2 ? (
            <img
              className="rounded-full"
              src={chat.photo.url}
              srcSet={`${chat.photo.url}, ${chat.photo_x2.url} 2x`}
            />
          ) : (
            <TelegramIcon size={48} color={colors.grey[400]} />
          )}
        </div>
      </ChatLink>
      <div>
        <ChatLink href={href}>
          <header className="font-bold">{chat.title}</header>
        </ChatLink>
        <Row vCentered>
          <ChatLink href={href}>
            <LabelDiv>
              {chat.username ? `@${chat.username}` : chat.link}
            </LabelDiv>
          </ChatLink>
          {renderControls?.()}
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
