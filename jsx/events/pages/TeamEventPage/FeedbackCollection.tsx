import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Collection from '~/components/collections/Collection';
import CardListView from '~/components/collections/CardListView';

import { Row, Label } from '@kocherga/frontkit';

import AsyncButtonWithConfirm from '~/components/AsyncButtonWithConfirm';

import { deleteEventFeedback } from '~/events/actions';
import { selectFeedbacks } from '~/events/selectors';

import { Feedback } from '~/events/types';

import { FormShape } from '~/components/forms/types';

import { addEventFeedback } from '~/events/actions';
import { CreateFeedbackParams } from '~/events/types';

const feedbackShape: FormShape = [
  { name: 'overall_score', type: 'number', optional: true },
  { name: 'recommend_score', type: 'number', optional: true },
  { name: 'content_score', type: 'number', optional: true },
  { name: 'conductor_score', type: 'number', optional: true },
  {
    name: 'source',
    type: 'choice',
    options: ['FRIEND', 'VK', 'FB', 'TIMEPAD', 'EMAIL', 'WEBSITE'],
    optional: true,
  },
  { name: 'custom_source', type: 'string', optional: true },
  { name: 'comment', type: 'string', optional: true },
];

const FeedbackCard: React.FC<{ feedback: Feedback; event_id: string }> = ({
  feedback,
  event_id,
}) => {
  const dispatch = useDispatch();

  const deleteCb = useCallback(async () => {
    await dispatch(deleteEventFeedback(event_id, feedback.id));
  }, [feedback.id, event_id]);
  return (
    <div>
      <header>{feedback.id}</header>
      <Row vCentered>
        <Label>overall_score:</Label>
        {feedback.overall_score}
      </Row>
      <Row vCentered>
        <Label>conductor_score:</Label>
        {feedback.conductor_score}
      </Row>
      <div>
        <Label>Комментарий:</Label>
        {feedback.comment}
      </div>
      <Row>
        <AsyncButtonWithConfirm confirmText="Точно удалить?" act={deleteCb}>
          Удалить
        </AsyncButtonWithConfirm>
      </Row>
    </div>
  );
};

interface Props {
  event_id: string;
}

const FeedbackCollection: React.FC<Props> = ({ event_id }) => {
  // FIXME - we store current event's feedbacks globally instead of separating them by event
  const feedbacks = useSelector(selectFeedbacks);
  const dispatch = useDispatch();

  const add = useCallback(
    async (values: CreateFeedbackParams) => {
      await dispatch(addEventFeedback(event_id, values));
    },
    [dispatch, addEventFeedback]
  );

  const renderItem = (feedback: Feedback) => (
    <FeedbackCard feedback={feedback} event_id={event_id} />
  );

  return (
    <Collection
      names={{
        plural: 'отзывы',
        genitive: 'отзыв',
      }}
      items={feedbacks}
      add={add}
      shape={feedbackShape}
      renderItem={renderItem}
      view={CardListView}
    />
  );
};

export default FeedbackCollection;
