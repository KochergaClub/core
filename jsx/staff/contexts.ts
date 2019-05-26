import React from 'react';

import { Member } from './types';

interface StaffContextShape {
  members: Member[];
}

export const StaffContext = React.createContext<StaffContextShape>({
  members: [],
});
