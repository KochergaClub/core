import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';

import { ActionLayout } from './ActionLayout';
import { LinkActionA } from './LinkAction';
import { CommonActionProps } from './types';

interface Props extends CommonActionProps {
  href: string;
  children?: null;
}

const NextLinkAction: React.FC<Props> = ({ href, icon, title }) => {
  return (
    <Link href={href} passHref>
      <LinkActionA>
        <ActionLayout title={title} icon={icon || FaArrowRight} />
      </LinkActionA>
    </Link>
  );
};

export default NextLinkAction;
