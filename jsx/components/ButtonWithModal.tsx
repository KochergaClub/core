import React, { useState, useCallback } from 'react';

import { Button } from '@kocherga/frontkit';

interface Props {
  title: string;
  children: ({ close }: { close: () => void }) => React.ReactNode;
  small?: boolean;
}
const ButtonWithModal: React.FC<Props> = ({ children, title, small }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <>
      <Button onClick={openModal} small={small}>
        {title}
      </Button>
      {isOpen && children({ close: closeModal })}
    </>
  );
};

export default ButtonWithModal;
