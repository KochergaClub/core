import React from 'react';
import ReactDOM from 'react-dom';
import CohortList from './CohortList';

it('empty list renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CohortList cohorts={[]} />, div);
});
