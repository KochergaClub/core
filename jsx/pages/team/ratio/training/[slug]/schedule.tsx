import React, { useState, useCallback, useReducer } from 'react';

import styled from 'styled-components';

import { A, Column } from '@kocherga/frontkit';

import { NextPage } from '~/common/types';
import { useAPI } from '~/common/hooks';
import { selectAPI } from '~/core/selectors';

import Page from '~/components/Page';

import { ActivityType, Training, Trainer } from '~/ratio/types';
import {
  getTraining,
  getSchedule,
  copyScheduleFrom,
  getTrainers,
} from '~/ratio/api';

import SingleColumnSchedule from '~/ratio/schedule/SingleColumnSchedule';
import MultiColumnSchedule from '~/ratio/schedule/MultiColumnSchedule';
import CopyScheduleFromPicker from '~/ratio/schedule/CopyScheduleFromPicker';
import { reducer, ScheduleContext } from '~/ratio/schedule/utils';

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
  trainers: Trainer[];
  schedule: ActivityType[];
  children?: React.ReactNode;
}

const RatioSchedulePage: NextPage<Props> = props => {
  const { training, trainers } = props; // doesn't change (yet), so not in store
  const [store, dispatch] = useReducer(reducer, {
    schedule: props.schedule,
    trainers: [],
  });

  const { schedule } = store;

  const [multiColumn, setMultiColumn] = useState(false);

  const Component = multiColumn ? MultiColumnSchedule : SingleColumnSchedule;
  const api = useAPI();

  const pickSrcForCopy = useCallback(
    async (srcTraining: Training) => {
      await copyScheduleFrom(api, training, srcTraining);
      dispatch({
        type: 'REPLACE_SCHEDULE',
        payload: {
          schedule: await getSchedule(api, training.name),
        },
      });
    },
    [api, training]
  );

  return (
    <ScheduleContext.Provider value={{ dispatch, trainers }}>
      <Page title={training.name} team>
        <Page.Main>
          <PageHeader>
            <Column centered>
              <h1>
                <A href={`/team/ratio/training/${training.slug}`}>
                  {training.name}
                </A>
              </h1>
              <A href={`/admin/ratio/training/${training.id}/change/`}>
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
    </ScheduleContext.Provider>
  );
};

RatioSchedulePage.getInitialProps = async ({ store: { getState }, query }) => {
  const api = selectAPI(getState());
  const slug = query.slug as string;

  const training = await getTraining(api, slug);
  const schedule = await getSchedule(api, slug);
  const trainers = await getTrainers(api);
  return {
    training: training,
    schedule,
    trainers,
  };
};

export default RatioSchedulePage;
