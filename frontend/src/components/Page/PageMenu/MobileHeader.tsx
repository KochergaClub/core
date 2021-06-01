import clsx from 'clsx';
import React, { useCallback } from 'react';

import { Burger } from '~/frontkit';

import { MenuKind } from '../types';
import { kind2color } from './constants';

interface Props {
  expanded: boolean;
  setExpand: (flag: boolean) => void;
  kind: MenuKind;
}

export const MobileHeader: React.FC<Props> = ({
  expanded,
  setExpand,
  kind,
}) => {
  const switchExpand = useCallback(() => {
    setExpand(!expanded);
  }, [setExpand, expanded]);

  return (
    <div
      className={clsx(
        'h-14 px-5 flex justify-between items-center',
        kind2color[kind]
      )}
      onClick={switchExpand}
    >
      <div className="text-2xl text-white">Кочерга</div>
      <Burger colorClass="bg-white" opened={expanded} flip={switchExpand} />
    </div>
  );
};
