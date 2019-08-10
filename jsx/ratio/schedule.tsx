import React, { useState } from 'react';

import styled from 'styled-components';

import { A } from '@kocherga/frontkit';

import { Screen, InitialLoader } from '~/common/types';
import { selectAPI } from '~/core/selectors';

import Page from '~/components/Page';

import { ActivityType, Training } from './types';

import SingleColumnSchedule from './schedule/SingleColumnSchedule';
import MultiColumnSchedule from './schedule/MultiColumnSchedule';

const PageHeader = styled.header`
  text-align: center;

  @media print {
    display: none;
  }
`;

interface Props {
  name: string;
  long_name: string;
  schedule: ActivityType[];
  children?: React.ReactNode;
}

const RatioSchedulePage = ({ name, long_name, schedule }: Props) => {
  const [multiColumn, setMultiColumn] = useState(false);

  console.log(multiColumn);
  const Component = multiColumn ? MultiColumnSchedule : SingleColumnSchedule;

  return (
    <Page title={name} team>
      <Page.Main>
        <PageHeader>
          <h1>
            <A href="../">{name}</A>
          </h1>
          <A href={`/admin/ratio/training/${name}/change/`}>
            (Редактировать расписание)
          </A>
          <div>
            <input
              type="checkbox"
              checked={multiColumn}
              onChange={e => setMultiColumn(e.currentTarget.checked)}
            />
            несколько колонок
          </div>
        </PageHeader>

        <Component schedule={schedule} long_name={long_name} />
      </Page.Main>
    </Page>
  );
};

const getInitialData: InitialLoader<Props> = async (
  { getState },
  { params }
) => {
  const api = selectAPI(getState());

  const trainingName = params.name;
  const trainingKey = encodeURIComponent(trainingName);
  const training = (await api.call(
    `ratio/training/${trainingKey}`,
    'GET'
  )) as Training;
  const schedule = await api.call(
    `ratio/training/${trainingKey}/schedule`,
    'GET'
  );
  return {
    name: training.name,
    long_name: training.long_name,
    schedule,
  };
};

const screen: Screen<Props> = {
  component: RatioSchedulePage,
  getInitialData,
};

export default screen;
