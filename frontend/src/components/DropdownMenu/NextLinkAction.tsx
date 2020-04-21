import Link from 'next/link';

import { LinkActionA } from './LinkAction';
import ActionContainer from './ActionContainer';

interface Props {
  href: string;
  as: string;
}

const NextLinkAction: React.FC<Props> = ({ children, href, as }) => {
  return (
    <Link href={href} as={as} passHref>
      <LinkActionA>
        <ActionContainer>{children}</ActionContainer>
      </LinkActionA>
    </Link>
  );
};

export default NextLinkAction;
