import React from 'react';

import { A, Column, Row } from '@kocherga/frontkit';

import DeleteButton from '~/components/crud/DeleteButton';
import ActionButton from '~/components/ActionButton';

import { Cohort } from '../../../types';

import CohortEventLink from './CohortEventLink';

interface Props {
  cohort: Cohort;
}

const Controls: React.FC<Props> = ({ cohort }) => (
  <Column>
    <A href="/team/mastermind_dating">&larr; к списку когорт</A>
    <Row>
      {cohort.event_id && (
        <ActionButton
          path={`/mastermind_dating/cohort/${cohort.id}/populate_from_event`}
        >
          Загрузить пользователей из события
        </ActionButton>
      )}
      <ActionButton
        path={`/mastermind_dating/cohort/${cohort.id}/send_invite_emails`}
      >
        Разослать приглашения в бота
      </ActionButton>
      <DeleteButton
        endpoint="/mastermind_dating/cohort"
        id={cohort.id}
        redirectOnDelete="/team/mastermind_dating"
      />
    </Row>
    <div style={{ alignSelf: 'stretch' }}>
      <CohortEventLink cohort={cohort} />
    </div>
  </Column>
);

export default Controls;
