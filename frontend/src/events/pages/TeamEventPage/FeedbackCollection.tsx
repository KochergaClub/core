import { useCallback } from 'react';

import { useMutation } from '@apollo/client';

import { AsyncButtonWithConfirm } from '~/components';
import { Collection, ShapedTableView } from '~/components/collections';
import { FormShape } from '~/components/forms/types';
import {
    EventFeedbackCreateDocument, EventFeedbackDeleteDocument, TeamEventDetailsFragment,
    TeamEventFeedbackFragment
} from '~/events/queries.generated';
import shapes from '~/shapes';

const feedbackShape: FormShape = shapes.events.feedback.filter(
  (f) => f.name !== 'event_id' && f.name !== 'id'
);

const DeleteFeedback: React.FC<{ feedback: TeamEventFeedbackFragment }> = ({
  feedback,
}) => {
  const [deleteMutation] = useMutation(EventFeedbackDeleteDocument, {
    refetchQueries: ['TeamEventDetails'],
    awaitRefetchQueries: true,
  });
  const deleteCb = useCallback(async () => {
    await deleteMutation({ variables: { id: feedback.id } });
  }, [deleteMutation, feedback.id]);

  return (
    <AsyncButtonWithConfirm confirmText="Точно удалить?" act={deleteCb}>
      Удалить
    </AsyncButtonWithConfirm>
  );
};

interface Props {
  event: TeamEventDetailsFragment;
}

const FeedbackCollection: React.FC<Props> = ({ event }) => {
  const feedbacks = event.feedbacks;
  const [createMutation] = useMutation(EventFeedbackCreateDocument, {
    refetchQueries: ['TeamEventDetails'],
    awaitRefetchQueries: true,
  });

  const add = useCallback(
    async (values: any) => {
      await createMutation({
        variables: {
          ...values,
          event_id: event.id,
        },
      });
    },
    [createMutation, event.id]
  );

  const renderExtraColumn = (feedback: TeamEventFeedbackFragment) => (
    <DeleteFeedback feedback={feedback} />
  );

  return (
    <Collection
      names={{
        plural: 'отзывы',
        genitive: 'отзыв',
      }}
      items={feedbacks}
      add={{
        cb: add,
        shape: feedbackShape,
      }}
      view={(props) => (
        <ShapedTableView
          {...props}
          shape={feedbackShape}
          extraColumns={['Удалить']}
          renderExtraColumn={renderExtraColumn}
        />
      )}
    />
  );
};

export default FeedbackCollection;
