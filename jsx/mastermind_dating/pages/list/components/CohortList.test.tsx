import React from 'react';
import ReactDOM from 'react-dom';
import CohortCollection from './CohortCollection';

it('empty list renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CohortCollection cohorts={[]} />, div);
});
