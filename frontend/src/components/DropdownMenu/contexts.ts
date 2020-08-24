import { createContext } from 'react';

export type ModalCreator = ({
  close,
}: {
  close: () => void;
}) => React.ReactNode;

interface DropdownMenuContextShape {
  close: () => void;
  setModal: (modal: ModalCreator) => void;
}

export const DropdownMenuContext = createContext<DropdownMenuContextShape>({
  close: () => undefined,
  setModal: () => null,
});
