import { createContext } from 'react';

interface EditingContextShape {
  editing: boolean;
}

export const EditingContext = createContext<EditingContextShape>({
  editing: false,
});
