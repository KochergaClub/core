import React, { useState, useCallback, useReducer } from 'react';
import { useSelector } from 'react-redux';

import styled from 'styled-components';

import { A, Column, Row } from '@kocherga/frontkit';

import { useAPI } from '~/common/hooks';

import { TrainingDay, Training } from '~/ratio/types';
import { getSchedule, copyScheduleFrom } from '~/ratio/api';
import { selectViewingTraining } from '~/ratio/selectors';

import Unprintable from './Unprintable';

import CreateDayButton from './CreateDayButton';
import SingleColumnSchedule from './SingleColumnSchedule';
import MultiColumnSchedule from './MultiColumnSchedule';
import CopyScheduleFromPicker from './CopyScheduleFromPicker';
import { reducer, ScheduleContext } from './utils';

const Header = styled.header``;

const HeaderTexts = styled.div`
  @font-face {
    font-family: 'Intro Book';
    src: url('/static/fonts/intro-pack/Intro-book.otf');
  }
  font-family: 'Intro Book';
  letter-spacing: 0.08em;

  a {
    @media print {
      color: black;
    }
  }

  h1 {
    line-height: 1.2;
    margin: 0;
  }
  h2 {
    margin: 0;
    margin-bottom: 16px;
  }
`;

interface Props {
  schedule: TrainingDay[];
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
          schedule: await getSchedule(api, training.slug),
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
      <Column stretch gutter={32}>
        <Header>
          <Row spaced>
            <HeaderTexts>
              <h1>
                <A href={`/team/ratio/training/${training.slug}`}>
                  {training.name}
                </A>
              </h1>
              <h2>Расписание занятий</h2>
            </HeaderTexts>
            <Unprintable>
              <Column centered>
                <CreateDayButton />
                <Row vCentered>
                  <input
                    type="checkbox"
                    checked={multiColumn}
                    onChange={e => setMultiColumn(e.currentTarget.checked)}
                  />
                  несколько колонок
                </Row>
              </Column>
            </Unprintable>
          </Row>
        </Header>

        {schedule.length ? (
          <Component schedule={schedule} long_name={training.long_name} />
        ) : (
          <CopyScheduleFromPicker training={training} pick={pickSrcForCopy} />
        )}
      </Column>
    </ScheduleContext.Provider>
  );
};

export default SchedulePage;
