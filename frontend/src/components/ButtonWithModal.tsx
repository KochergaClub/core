import React, { useCallback, useState } from 'react';

import { Button } from '~/frontkit';

type Props = {
  title: string;
  children: ({ close }: { close: () => void }) => React.ReactNode;
  size?: Parameters<typeof Button>[0]['size'];
};

const ButtonWithModal: React.FC<Props> = ({ children, title, size }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <>
      <Button onClick={openModal} size={size}>
        {title}
      </Button>
      {isOpen && children({ close: closeModal })}
    </>
  );
};

export default ButtonWithModal;
