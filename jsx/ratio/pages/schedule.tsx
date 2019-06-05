import React, { useState, useCallback } from 'react';

import styled from 'styled-components';

import { A, Column } from '@kocherga/frontkit';

import { useAPI } from '~/common/hooks';
import { Screen, InitialLoader } from '~/common/types';
import Page from '~/components/Page';

import { ActivityType, Training } from '../types';
import { getTraining, getSchedule, copyScheduleFrom } from '../api';

import SingleColumnSchedule from '../schedule/SingleColumnSchedule';
import MultiColumnSchedule from '../schedule/MultiColumnSchedule';
import CopyScheduleFromPicker from '../schedule/CopyScheduleFromPicker';

const PageHeader = styled.header`
  text-align: center;

  @media print {
    display: none;
  }
`;

const CenteredRow = styled.div`
  vertical-align: center;
  display: inline;
`;

interface Props {
  training: Training;
  schedule: ActivityType[];
  children?: React.ReactNode;
}

const RatioSchedulePage = (props: Props) => {
  const training = props.training; // doesn't change (yet)
  const [schedule, setSchedule] = useState(props.schedule); // need to be reloaded on copy_schedule_from

  const [multiColumn, setMultiColumn] = useState(false);

  const Component = multiColumn ? MultiColumnSchedule : SingleColumnSchedule;
  const api = useAPI();

  const pickSrcForCopy = useCallback(
    async (srcTraining: Training) => {
      await copyScheduleFrom(api, training, srcTraining);
      setSchedule(await getSchedule(api, training.name));
    },
    [training]
  );

  return (
    <Page title={training.name} team>
      <Page.Main>
        <PageHeader>
          <Column centered>
            <h1>
              <A href="../">{training.name}</A>
            </h1>
            <A href={`/admin/ratio/training/${training.name}/change/`}>
              (Редактировать расписание)
            </A>
            <CenteredRow>
              <input
                type="checkbox"
                checked={multiColumn}
                onChange={e => setMultiColumn(e.currentTarget.checked)}
              />
              несколько колонок
            </CenteredRow>
          </Column>
        </PageHeader>

        {schedule.length ? (
          <Component schedule={schedule} long_name={training.long_name} />
        ) : (
          <CopyScheduleFromPicker training={training} pick={pickSrcForCopy} />
        )}
      </Page.Main>
    </Page>
  );
};

const getInitialData: InitialLoader<Props> = async ({ api }, { params }) => {
  const training = await getTraining(api, params.name);
  const schedule = await getSchedule(api, params.name);
  return {
    training: training,
    schedule,
  };
};

const screen: Screen<Props> = {
  component: RatioSchedulePage,
  getInitialData,
};

export default screen;
