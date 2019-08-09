import React from 'react';
import ReactDOM from 'react-dom';

import { Picker } from './Picker';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Picker pickedMember={() => null} members={[]} />, div);
});
