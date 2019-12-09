import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import { useDispatch } from '~/common/hooks';

import Collection from '~/components/collections/Collection';
import TableView from '~/components/collections/TableView';

import { AsyncButtonWithConfirm } from '~/components';

import { FormShape } from '~/components/forms/types';

import {
  selectEventFeedbacks,
  deleteEventFeedback,
  addEventFeedback,
} from '~/events/features/eventPageFeedbacks';

import { Feedback, CreateFeedbackParams } from '~/events/types';

import shapes from '~/shapes';

const feedbackShape: FormShape = shapes.events.feedback.filter(
  f => f.name !== 'event_id' && f.name !== 'id'
);

const DeleteFeedback: React.FC<{ feedback: Feedback }> = ({ feedback }) => {
  const dispatch = useDispatch();

  const deleteCb = useCallback(async () => {
    await dispatch(deleteEventFeedback(feedback.id));
  }, [feedback.id]);

  return (
    <AsyncButtonWithConfirm confirmText="Точно удалить?" act={deleteCb}>
      Удалить
    </AsyncButtonWithConfirm>
  );
};

const FeedbackCollection: React.FC = () => {
  // FIXME - we store current event's feedbacks globally instead of separating them by event
  const feedbacks = useSelector(selectEventFeedbacks);
  const dispatch = useDispatch();

  const add = useCallback(
    async (values: CreateFeedbackParams) => {
      await dispatch(addEventFeedback(values));
    },
    [dispatch, addEventFeedback]
  );

  const renderExtraColumn = (feedback: Feedback) => (
    <DeleteFeedback feedback={feedback} />
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
