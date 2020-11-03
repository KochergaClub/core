import Link from 'next/link';

import ActionContainer from './ActionContainer';
import { LinkActionA } from './LinkAction';

interface Props {
  href: string;
}

const NextLinkAction: React.FC<Props> = ({ children, href }) => {
  return (
    <Link href={href} passHref>
      <LinkActionA>
        <ActionContainer>{children}</ActionContainer>
      </LinkActionA>
    </Link>
  );
};

export default NextLinkAction;
