import React from 'react';

import Page from '../components/Page';

import TeamMenu from '../components/TeamMenu';

export default ({ trainings }) => (
  <Page title="Ratio">
    <h1>Воркшопы и тренинги</h1>
    <TeamMenu />
    <ul>
      {trainings.map(training => (
        <li key={training.name}>
          <a href={training.url}>{training.name}</a>
        </li>
      ))}
    </ul>
  </Page>
);
