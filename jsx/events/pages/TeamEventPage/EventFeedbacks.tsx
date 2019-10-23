import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Row, Column, Label } from '@kocherga/frontkit';

import Card, { CardList } from '~/components/Card';
import AsyncButtonWithConfirm from '~/components/AsyncButtonWithConfirm';

import { deleteEventFeedback } from '~/events/actions';
import { selectFeedbacks } from '~/events/selectors';

import { Feedback } from '~/events/types';
import CreateFeedback from './CreateFeedback';

const FeedbackCard: React.FC<{ feedback: Feedback; event_id: string }> = ({
  feedback,
  event_id,
}) => {
  const dispatch = useDispatch();

  const deleteCb = useCallback(async () => {
    await dispatch(deleteEventFeedback(event_id, feedback.id));
  }, [feedback.id, event_id]);
  return (
    <Card>
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
    </Card>
  );
};

interface Props {
  event_id: string;
}

const EventFeedbacks: React.FC<Props> = ({ event_id }) => {
  // FIXME - we store current event's feedbacks globally instead of separating them by event
  const feedbacks = useSelector(selectFeedbacks);

  return (
    <section>
      <h2>
        <Row vCentered>
          <div>Отзывы</div>
          <CreateFeedback event_id={event_id} />
        </Row>
      </h2>
      <Column stretch>
        <CardList>
          {feedbacks.map(feedback => (
            <FeedbackCard
              key={feedback.id}
              feedback={feedback}
              event_id={event_id}
            />
          ))}
        </CardList>
      </Column>
    </section>
  );
};

export default EventFeedbacks;
