import clsx from 'clsx';
import { useCallback } from 'react';

import { Row } from '~/frontkit';

const Item: React.FC<{ active: boolean; action: () => void }> = ({
  active,
  action,
  children,
}) => {
  const cb = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      action();
    },
    [action]
  );
  return (
    <a
      className={clsx(
        'text-primary-link no-underline',
        active && 'border-b border-dashed border-gray-600'
      )}
      href="#"
      onClick={cb}
    >
      {children}
    </a>
  );
};

interface Props {
  value: boolean;
  set: (v: boolean) => void;
}

export const EditingSwitch: React.FC<Props> = ({ value, set }) => {
  return (
    <Row>
      <Item active={!value} action={() => set(false)}>
        смотреть
      </Item>
      <Item active={value} action={() => set(true)}>
        редактировать
      </Item>
    </Row>
  );
};
