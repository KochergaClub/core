import React from 'react';

import Page from '../components/Page';

export default ({ trainings }) => (
  <Page title="Ratio" team>
    <h1>Воркшопы и тренинги</h1>
    <ul>
      {trainings.map(training => (
        <li key={training.name}>
          <a href={training.url}>{training.name}</a>
        </li>
      ))}
    </ul>
  </Page>
);
