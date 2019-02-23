import * as React from 'react';

import Page from '../components/Page';
import TeamMenu from '../components/TeamMenu';

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
  <Page title="Админка мастермайнд-дейтинга">
    <TeamMenu />
    <h1>Мастермайнд-дейтинг</h1>
    <p>
    <small><a href="/admin/mastermind_bot/cohort/">Редактировать когорты в админке</a></small>
    </p>
    <Cohorts cohorts={cohorts} />
  </Page>
);
