import { FaArrowRight } from 'react-icons/fa';

import { ActionLayout } from './ActionLayout';
import { CommonActionProps } from './types';

export const LinkActionA: React.FC<{ href?: string }> = ({
  href,
  children,
}) => (
  <a className="text-black no-underline" href={href}>
    {children}
  </a>
);

interface Props extends CommonActionProps {
  href: string;
  children?: null;
}

export const LinkAction: React.FC<Props> = ({ href, icon, title }) => {
  return (
    <LinkActionA href={href}>
      <ActionLayout title={title} icon={icon || FaArrowRight} />
    </LinkActionA>
  );
};
