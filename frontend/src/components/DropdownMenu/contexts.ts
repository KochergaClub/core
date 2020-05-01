import React from 'react';

export type ModalCreator = ({
  close,
}: {
  close: () => void;
}) => React.ReactNode;

interface DropdownMenuContextShape {
  close: () => void;
  setModal: (modal: ModalCreator) => void;
}

export const DropdownMenuContext = React.createContext<
  DropdownMenuContextShape
>({
  close: () => undefined,
  setModal: () => null,
});
