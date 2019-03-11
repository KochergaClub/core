import * as React from 'react';

import Page from '../components/Page';

const Cohorts = ({ cohorts }) => (
  <ul>
    {cohorts.map(
       cohort => (
         <li>
           <a href={`/team/mastermind_dating/cohort/${cohort.id}`}>
             {cohort.id}
           </a>
         </li>
       )
    )}
  </ul>
);

export default ({ cohorts }) => (
  <Page title="Админка мастермайнд-дейтинга" team>
    <h1>Мастермайнд-дейтинг</h1>
    <p>
      <small><a href="/admin/mastermind_dating/cohort/">Редактировать когорты в админке</a></small>
    </p>
    <Cohorts cohorts={cohorts} />
  </Page>
);
