import React from 'react';

import Page from '../components/Page';

interface Training {
  name: string;
  url: string;
}

interface Props {
  trainings: Training[];
  urls: {
    add_training: string;
  };
}

export default ({ trainings, urls }: Props) => (
  <Page title="Ratio" team>
    <h1>Воркшопы и тренинги</h1>
    <small>
      <a href={urls.add_training}>Добавить тренинг</a>
    </small>
    <hr />
    <ul>
      {trainings.map(training => (
        <li key={training.name}>
          <a href={training.url}>{training.name}</a>
        </li>
      ))}
    </ul>
  </Page>
);
