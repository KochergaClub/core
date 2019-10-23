import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import ModalFormButton from '~/components/forms/ModalFormButton';
import { FormShape } from '~/components/forms/types';

import { addEventFeedback } from '~/events/actions';
import { CreateFeedbackParams } from '~/events/types';

const fields: FormShape = [
  { name: 'overall_score', type: 'number' },
  { name: 'recommend_score', type: 'number' },
  { name: 'content_score', type: 'number' },
  { name: 'conductor_score', type: 'number' },
  {
    name: 'source',
    type: 'choice',
    options: ['FRIEND', 'VK', 'FB', 'TIMEPAD', 'EMAIL', 'WEBSITE'],
  },
  { name: 'custom_source', type: 'string' },
  { name: 'comment', type: 'string' },
];

interface Props {
  event_id: string;
}

const CreateFeedback: React.FC<Props> = ({ event_id }) => {
  const dispatch = useDispatch();

  const postCb = useCallback(
    async (values: CreateFeedbackParams) => {
      await dispatch(addEventFeedback(event_id, values));
    },
    [dispatch, addEventFeedback]
  );

  return (
    <ModalFormButton
      post={postCb}
      buttonName="Создать отзыв"
      modalButtonName="Создать"
      modalTitle="Создать отзыв"
      fields={fields}
    />
  );
};

export default CreateFeedback;
