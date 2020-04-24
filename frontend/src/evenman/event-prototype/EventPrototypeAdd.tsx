import { useState, useCallback } from 'react';

import { Button } from '@kocherga/frontkit';

import NewPrototypeModal from './NewPrototypeModal';

const EventPrototypeAdd: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback(() => setIsOpen(true), []);

  const closeModal = useCallback(() => setIsOpen(false), []);

  return (
    <>
      <Button onClick={openModal}>Создать прототип</Button>
      {isOpen && <NewPrototypeModal close={closeModal} />}
    </>
  );
};

export default EventPrototypeAdd;
