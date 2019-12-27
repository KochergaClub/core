import * as React from 'react';

interface EditingContextShape {
  editing: boolean;
}

export const EditingContext = React.createContext<EditingContextShape>({
  editing: false,
});
