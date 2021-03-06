import { useCallback, useState } from 'react';
import styled from 'styled-components';

import { useMutation } from '@apollo/client';

import { staticUrl } from '~/common/utils';
import { A, Column, Row } from '~/frontkit';

import {
    RatioTrainingCopyScheduleFromDocument, TrainingForPickerFragment, TrainingWithScheduleFragment
} from '../queries.generated';
import { adminTrainingRoute } from '../routes';
import CopyScheduleFromPicker from './CopyScheduleFromPicker';
import CreateDayButton from './CreateDayButton';
import MultiColumnSchedule from './MultiColumnSchedule';
import SingleColumnSchedule from './SingleColumnSchedule';
import Unprintable from './Unprintable';

const Header = styled.header``;

const HeaderTexts = styled.div`
  @font-face {
    font-family: 'Intro Book';
    src: url('${staticUrl('fonts/intro-pack/Intro-book.otf')}');
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
  training: TrainingWithScheduleFragment;
}

const SchedulePage: React.FC<Props> = ({ training }) => {
  const { schedule } = training;
  const [copyScheduleFromMutation] = useMutation(
    RatioTrainingCopyScheduleFromDocument,
    {
      refetchQueries: ['RatioTrainingWithSchedule'],
      awaitRefetchQueries: true,
    }
  );

  const [multiColumn, setMultiColumn] = useState(true);

  const Component = multiColumn ? MultiColumnSchedule : SingleColumnSchedule;

  const pickSrcForCopy = useCallback(
    async (srcTraining: TrainingForPickerFragment) => {
      await copyScheduleFromMutation({
        variables: {
          params: {
            from_training_slug: srcTraining.slug,
            to_training_slug: training.slug,
          },
        },
      });
    },
    [training.slug, copyScheduleFromMutation]
  );

  return (
    <Column stretch gutter={32}>
      <Header>
        <Row spaced>
          <HeaderTexts>
            <h1>
              <A href={adminTrainingRoute(training.slug)}>{training.name}</A>
            </h1>
            <h2>Расписание занятий</h2>
          </HeaderTexts>
          <Unprintable>
            <Column centered>
              <CreateDayButton training={training} />
              <Row vCentered>
                <input
                  type="checkbox"
                  checked={multiColumn}
                  onChange={(e) => setMultiColumn(e.currentTarget.checked)}
                />
                несколько колонок
              </Row>
            </Column>
          </Unprintable>
        </Row>
      </Header>

      {schedule.length ? (
        <Component schedule={schedule} long_name={training.name} />
      ) : (
        <CopyScheduleFromPicker
          pick={pickSrcForCopy}
          excludeSlug={training.slug}
        />
      )}
    </Column>
  );
};

export default SchedulePage;
