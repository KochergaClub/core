import clsx from 'clsx';
import Link from 'next/link';
import React, { useContext, useState } from 'react';

import { staticUrl } from '~/common/utils';

import { Search } from '../Search';
import { MenuKind } from '../types';
import { kind2color, MenuContext } from './constants';
import { MenuItems } from './MenuItems';
import { MobileHeader } from './MobileHeader';
import UserButtons from './UserButtons';

const LOGO_HEIGHT = 50;

const LogoImage = () => (
  <img
    src={staticUrl('menu-logo.png')}
    alt="Логотип"
    width="190"
    height={LOGO_HEIGHT}
  />
);

const Logo: React.FC<Props> = ({ kind }) => {
  const href = kind === 'team' ? '/team' : '/';

  return (
    <Link href={href} passHref>
      <a className="block" style={{ height: LOGO_HEIGHT }}>
        <LogoImage />
      </a>
    </Link>
  );
};

const DesktopMenu: React.FC = () => {
  const { kind } = useContext(MenuContext);
  return (
    <div
      className={clsx(
        'h-14 px-10 flex justify-between items-center',
        kind2color[kind]
      )}
    >
      <div className="flex items-center space-x-12">
        <Logo kind={kind} />
        <MenuItems kind={kind} />
        <Search />
      </div>
      <UserButtons kind={kind} />
    </div>
  );
};

const MobileExpandedMenu: React.FC = () => {
  const { kind } = useContext(MenuContext);

  return (
    <div className={clsx('flex flex-col items-center py-5', kind2color[kind])}>
      <div className="flex flex-col mb-5 items-center space-y-4">
        <Logo kind={kind} />
        <MenuItems kind={kind} />
        <Search />
      </div>
      <UserButtons kind={kind} />
    </div>
  );
};

const MobileMenu: React.FC = () => {
  const { kind } = useContext(MenuContext);
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      <MobileHeader expanded={expanded} setExpand={setExpanded} kind={kind} />
      {expanded && <MobileExpandedMenu />}
    </div>
  );
};

interface Props {
  kind: MenuKind;
}

const PageMenu: React.FC<Props> = ({ kind }) => {
  return (
    <MenuContext.Provider value={{ kind }}>
      <div className="print:hidden">
        <div className="hidden lg:block">
          <DesktopMenu />
        </div>
        <div className="lg:hidden">
          <MobileMenu />
        </div>
      </div>
    </MenuContext.Provider>
  );
};

export default React.memo(PageMenu);
