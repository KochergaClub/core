import '../fonts.css';

import { useCallback, useState } from 'react';

import { useMutation } from '@apollo/client';

import { Column, Row } from '~/frontkit';

import {
    RatioTrainingCopyScheduleFromDocument, TrainingForPickerFragment, TrainingWithScheduleFragment
} from '../queries.generated';
import { adminTrainingRoute } from '../routes';
import CopyScheduleFromPicker from './CopyScheduleFromPicker';
import CreateDayButton from './CreateDayButton';
import MultiColumnSchedule from './MultiColumnSchedule';
import SingleColumnSchedule from './SingleColumnSchedule';
import Unprintable from './Unprintable';

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
      <header>
        <Row spaced>
          <div className="intro-book tracking-wider">
            <h1 className="m-0">
              <a
                className="link print:text-black"
                href={adminTrainingRoute(training.slug)}
              >
                {training.name}
              </a>
            </h1>
            <h2 className="m-0 mb-4">Расписание занятий</h2>
          </div>
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
      </header>

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
