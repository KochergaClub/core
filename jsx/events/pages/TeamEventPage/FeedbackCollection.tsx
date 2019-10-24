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

import shapes from '~/shapes';

const feedbackShape: FormShape = shapes.events.feedback;

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
      {feedbackShape.map(field => {
        const value = (feedback as any)[field.name];

        if (value === undefined || value === '' || value === null) {
          return null;
        }
        return (
          <Row vCentered key={field.name}>
            <Label>{field.title}:</Label>
            <div>{value}</div>
          </Row>
        );
      })}
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
