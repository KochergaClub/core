import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Collection from '~/components/collections/Collection';
import TableView from '~/components/collections/TableView';

import AsyncButtonWithConfirm from '~/components/AsyncButtonWithConfirm';

import { deleteEventFeedback } from '~/events/actions';
import { selectFeedbacks } from '~/events/selectors';

import { Feedback } from '~/events/types';

import { FormShape } from '~/components/forms/types';

import { addEventFeedback } from '~/events/actions';
import { CreateFeedbackParams } from '~/events/types';

import shapes from '~/shapes';

const feedbackShape: FormShape = shapes.events.feedback.filter(
  f => f.name !== 'event_id' && f.name !== 'id'
);

const DeleteFeedback: React.FC<{ feedback: Feedback; event_id: string }> = ({
  feedback,
  event_id,
}) => {
  const dispatch = useDispatch();

  const deleteCb = useCallback(async () => {
    await dispatch(deleteEventFeedback(event_id, feedback.id));
  }, [feedback.id, event_id]);

  return (
    <AsyncButtonWithConfirm confirmText="Точно удалить?" act={deleteCb}>
      Удалить
    </AsyncButtonWithConfirm>
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

  const renderExtraColumn = (feedback: Feedback) => (
    <DeleteFeedback feedback={feedback} event_id={event_id} />
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
      renderItem={() => <div>UNUSED</div>}
      view={props => (
        <TableView
          {...props}
          extraColumns={['Удалить']}
          renderExtraColumn={renderExtraColumn}
        />
      )}
    />
  );
};

export default FeedbackCollection;
