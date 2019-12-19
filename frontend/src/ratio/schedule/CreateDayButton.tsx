import { useCallback, useContext } from 'react';
import { useSelector } from 'react-redux';

import { useAPI } from '~/common/hooks';
import ModalFormButton from '~/components/forms/ModalFormButton';
import { FormShape } from '~/components/forms/types';

import { selectTraining } from '~/ratio/features/trainingItem';
import { getSchedule } from '~/ratio/api';

import { ScheduleContext } from './utils';

interface CreateParams {
  date: string;
}

const shape: FormShape = [
  {
    name: 'date',
    type: 'date',
  },
];

const CreateItemButton: React.FC = () => {
  const { dispatch } = useContext(ScheduleContext);
  const training = useSelector(selectTraining);
  const api = useAPI();

  const create = useCallback(
    async ({ date }: CreateParams) => {
      await api.call(`ratio/training/${training!.slug}/add_day`, 'POST', {
        date,
      });
      dispatch({
        type: 'REPLACE_SCHEDULE',
        payload: {
          schedule: await getSchedule(api, training!.slug),
        },
      });
    },
    [training]
  );
  return (
    <ModalFormButton
      post={create}
      buttonName="Добавить день"
      modalButtonName="Добавить"
      modalTitle="Добавить день"
      fields={shape}
    />
  );
};

export default CreateItemButton;
