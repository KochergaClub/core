import clsx from 'clsx';

import { ButtonsListType } from './types';

const HeroButton: React.FC<{ href: string; highlight: boolean }> = ({
  href,
  highlight,
  children,
}) => (
  <a
    className={clsx(
      'px-16 py-4 rounded-full font-bold text-center no-underline',
      highlight ? 'bg-accent-700 text-white' : 'bg-gray-200 text-black'
    )}
    href={href}
  >
    {children}
  </a>
);

interface Props {
  buttons: ButtonsListType;
}

export const HeroButtons: React.FC<Props> = ({ buttons }) => (
  <div className="flex flex-col space-y-4 items-center md:flex-row md:space-y-0 md:space-x-4">
    {buttons.map((button, i) => (
      <HeroButton href={button.link} highlight={button.highlight} key={i}>
        {button.title}
      </HeroButton>
    ))}
  </div>
);
