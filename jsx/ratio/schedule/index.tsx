import React, { useState, useCallback, useReducer } from 'react';
import { useSelector } from 'react-redux';

import styled from 'styled-components';

import { A, Column, Row } from '@kocherga/frontkit';

import { useAPI } from '~/common/hooks';

import { ActivityType, Training } from '~/ratio/types';
import { getSchedule, copyScheduleFrom } from '~/ratio/api';
import { selectViewingTraining } from '~/ratio/selectors';

import SingleColumnSchedule from './SingleColumnSchedule';
import MultiColumnSchedule from './MultiColumnSchedule';
import CopyScheduleFromPicker from './CopyScheduleFromPicker';
import { reducer, ScheduleContext } from './utils';

const PageHeader = styled.header`
  text-align: center;

  @media print {
    display: none;
  }
`;

interface Props {
  schedule: ActivityType[];
}

const SchedulePage: React.FC<Props> = props => {
  const training = useSelector(selectViewingTraining);

  const [store, dispatch] = useReducer(reducer, {
    schedule: props.schedule,
  });

  const { schedule } = store;

  const [multiColumn, setMultiColumn] = useState(true);

  const Component = multiColumn ? MultiColumnSchedule : SingleColumnSchedule;
  const api = useAPI();

  const pickSrcForCopy = useCallback(
    async (srcTraining: Training) => {
      if (!training) {
        throw new Error('Training is not in store');
      }
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

  if (!training) {
    throw new Error('No training');
  }

  return (
    <ScheduleContext.Provider value={{ dispatch }}>
      <div>
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
            <Row vCentered>
              <input
                type="checkbox"
                checked={multiColumn}
                onChange={e => setMultiColumn(e.currentTarget.checked)}
              />
              несколько колонок
            </Row>
          </Column>
        </PageHeader>

        {schedule.length ? (
          <Component schedule={schedule} long_name={training.long_name} />
        ) : (
          <CopyScheduleFromPicker training={training} pick={pickSrcForCopy} />
        )}
      </div>
    </ScheduleContext.Provider>
  );
};

export default SchedulePage;
