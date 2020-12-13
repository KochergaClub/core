import React, { useCallback, useState } from 'react';

import { Button } from '~/frontkit';

type Props = {
  title: string;
  children: ({ close }: { close: () => void }) => React.ReactNode;
  size?: Parameters<typeof Button>[0]['size'];
  kind?: Parameters<typeof Button>[0]['kind'];
};

const ButtonWithModal: React.FC<Props> = ({ children, title, size, kind }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <>
      <Button onClick={openModal} size={size} kind={kind}>
        {title}
      </Button>
      {isOpen && children({ close: closeModal })}
    </>
  );
};

export default ButtonWithModal;
